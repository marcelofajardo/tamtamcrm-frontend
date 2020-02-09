<?php
namespace App\Repositories;

use App\Customer;
use App\ClientContact;
use App\Repositories\Base\BaseRepository;
use Illuminate\Support\Str;

/**
 * ClientContactRepository
 */
class ClientContactRepository extends BaseRepository
{
    /**
     * ClientContactRepository constructor.
     * @param ClientContact $client_contact
     */
    public function __construct(ClientContact $client_contact)
    {
        parent::__construct($client_contact);
        $this->model = $client_contact;
    }

    public function save($contacts, Customer $customer) : bool
    {

        /* Convert array to collection */
        $contacts = collect($contacts);

        /* Get array of IDs which have been removed from the contacts array and soft delete each contact */
        collect($customer->contacts->pluck('id'))->diff($contacts->pluck('id'))->each(function ($contact) {
            ClientContact::destroy($contact);
        });

        $this->is_primary = true;
        /* Set first record to primary - always */
        $contacts = $contacts->sortByDesc('is_primary')->map(function ($contact) {
            $contact['is_primary'] = $this->is_primary;
            $this->is_primary = false;
            return $contact;
        });

        //loop and update/create contacts
        $contacts->each(function ($contact) use ($customer) {
            $update_contact = null;

            if (isset($contact['id'])) {
                $update_contact = ClientContact::find($contact['id']);
            }

            if (!$update_contact) {
                $update_contact = new ClientContact;
                $update_contact->customer_id = $customer->id;
                $update_contact->account_id = $customer->account_id;
                $update_contact->user_id = $customer->user_id;
                $update_contact->contact_key = Str::random(40);
            }

            $update_contact->fill($contact);

            $update_contact->save();
        });



        //always made sure we have one blank contact to maintain state
        if ($contacts->count() == 0) {
            $new_contact = new ClientContact;
            $new_contact->client_id = $customer->id;
            $new_contact->account_id = $customer->account_id;
            $new_contact->user_id = $customer->user_id;
            $new_contact->contact_key = Str::random(40);
            $new_contact->is_primary = true;
            $new_contact->save();
        }

        return true;
    }
}
