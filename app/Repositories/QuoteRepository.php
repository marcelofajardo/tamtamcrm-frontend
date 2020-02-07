<?php

namespace App\Repositories;

use App\Jobs\Quote\ApplyQuoteNumber;
use App\ClientContact;
use App\Repositories\Base\BaseRepository;
use App\Quote;
use Illuminate\Support\Collection;
use App\Repositories\Interfaces\QuoteRepositoryInterface;
use Illuminate\Http\Request;
use App\Task;
use App\Helpers\Invoice\InvoiceSum;
use App\Factory\QuoteInvitationFactory;
use App\Jobs\Quote\CreateQuoteInvitations;
use App\QuoteInvitation;
use App\Customer;

class QuoteRepository extends BaseRepository implements QuoteRepositoryInterface
{

    /**
     * QuoteRepository constructor.
     *
     * @param Quote $quote
     */
    public function __construct(Quote $quote)
    {
        parent::__construct($quote);
        $this->model = $quote;
    }

    /**
     * Sync the tasks
     *
     * @param array $params
     */
    /*public function syncTasks(int $task_id)
    {
        $this->model->tasks()->sync($task_id);
    } */

    /**
     * @param int $id
     *
     * @return Quote
     * @throws \Exception
     */
    public function findQuoteById(int $id): Quote
    {
        return $this->findOneOrFail($id);
    }

    public function getModel()
    {
        return $this->model;
    }

    public function save($data, Quote $quote): ?Quote
    {

        $quote->fill($data);
        $quote->save();

        if (isset($data['client_contacts'])) {
            foreach ($data['client_contacts'] as $contact) {
                if ($contact['send_invoice'] == 1) {
                    $client_contact = ClientContact::find($contact['id']);
                    $client_contact->send_invoice = true;
                    $client_contact->save();
                }
            }
        }

        if (isset($data['invitations'])) {
            $invitations = collect($data['invitations']);
            /* Get array of Keyss which have been removed from the invitations array and soft delete each invitation */
            collect($quote->invitations->pluck('key'))->diff($invitations->pluck('key'))->each(function ($invitation) {
                QuoteInvitation::destroy($invitation);
            });

            foreach ($data['invitations'] as $invitation) {
                $inv = false;
                if (array_key_exists('key', $invitation)) {
                    $inv = QuoteInvitation::whereKey($invitation['key'])->first();
                }

                if(!$inv)
                {
                    $invitation['client_contact_id'] = $invitation['client_contact_id'];
                    $new_invitation = QuoteInvitationFactory::create($quote->account_id, $quote->user_id);
                    $new_invitation->fill($invitation);
                    $new_invitation->quote_id = $quote->id;
                    //$new_invitation->customer_id = $quote->customer_id;
                    $new_invitation->save();
                }
            }
        }

        /* If no invitations have been created, this is our fail safe to maintain state*/
        if ($quote->invitations->count() == 0) {
            CreateQuoteInvitations::dispatchNow($quote, $quote->account);
        }

        $quote = $quote->calc()->getInvoice();
        $quote->save();
        $finished_amount = $quote->total;
        //todo need answers on this

        $quote = ApplyQuoteNumber::dispatchNow($quote, $quote->customer->getMergedSettings(), $quote->account);
        return $quote->fresh();
    }

    /**
     * List all the invoices
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     * @return \Illuminate\Support\Collection
     */
    public
    function listQuotes(
        string $order = 'id',
        string $sort = 'desc',
        array $columns = ['*']
    ): Collection {
        return $this->all($columns, $order, $sort);
    }

    /**
     *
     * @param int $customerId
     * @return type
     */
    public
    function getQuoteForTask(
        Task $objTask
    ): Quote {
        return $this->model->where('task_id', $objTask->id)->first();
    }

}
