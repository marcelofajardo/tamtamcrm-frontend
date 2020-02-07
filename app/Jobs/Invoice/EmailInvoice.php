<?php
namespace App\Jobs\Invoice;

use App\Events\Invoice\InvoiceWasEmailed;
use App\Events\Invoice\InvoiceWasEmailedAndFailed;
use App\Jobs\Utils\SystemLogger;
use App\Mail\TemplateEmail;
use App\Invoice;
use App\Account;
use App\SystemLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EmailInvoice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $invoice;
    private $account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice, Account $account)
    {
        $this->invoice = $invoice;
        $this->account = $account;
    }

    /**
     * Execute the job.
     *
     *
     * @return void
     */
    public function handle()
    {
        $message_array = $this->invoice->getEmailData();
        $message_array['title'] = &$message_array['subject'];
        $message_array['footer'] = 'The Footer';
        //
        $variables = array_merge($this->invoice->makeLabels(), $this->invoice->makeValues());
        $template_style = $this->invoice->customer->getSetting('email_style');

        $this->invoice->invitations->each(function ($invitation) use ($template_style) {
            if ($invitation->contact->send_invoice && $invitation->contact->email) {
                $message_array = $this->invoice->getEmailData('', $invitation->contact);
                $message_array['title'] = &$message_array['subject'];
                $message_array['footer'] = "Sent to ".$invitation->contact->present()->name();

                //change the runtime config of the mail provider here:

                //send message
                Mail::to($invitation->contact->email, $invitation->contact->present()->name())
                    ->send(new TemplateEmail($message_array, $template_style, $invitation->contact->user, $invitation->contact->customer));

                if (count(Mail::failures()) > 0) {
                    event(new InvoiceWasEmailedAndFailed($this->invoice, Mail::failures()));

                    return $this->logMailError($errors);
                }

                //fire any events
                event(new InvoiceWasEmailed($this->invoice));

                //sleep(5);
            }
        });
    }

    private function logMailError($errors)
    {
        SystemLogger::dispatch(
            $errors,
            SystemLog::CATEGORY_MAIL,
            SystemLog::EVENT_MAIL_SEND,
            SystemLog::TYPE_FAILURE,
            $this->invoice->customer
        );
    }
}
