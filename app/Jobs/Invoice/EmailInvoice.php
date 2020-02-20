<?php

namespace App\Jobs\Invoice;

use App\Events\Invoice\InvoiceWasEmailed;
use App\Events\Invoice\InvoiceWasEmailedAndFailed;
use App\Helpers\Email\InvoiceEmail;
use App\InvoiceInvitation;
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
use Symfony\Component\Mime\Test\Constraint\EmailTextBodyContains;

class EmailInvoice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $invoice_invitation;

    private $email_builder;

    private $account;

    /**
     * EmailQuote constructor.
     * @param BuildEmail $email_builder
     * @param QuoteInvitation $quote_invitation
     */
    public function __construct(InvoiceEmail $email_builder, InvoiceInvitation $invoice_invitation, Account $account)
    {
        $this->invoice_invitation = $invoice_invitation;
        $this->email_builder = $email_builder;
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

        Mail::to($this->invoice_invitation->contact->email, $this->invoice_invitation->contact->present()->name())
            ->send(new TemplateEmail($this->email_builder, $this->invoice_invitation->contact->user,
                $this->invoice_invitation->contact->customer));

        if (count(Mail::failures()) > 0) {
            return $this->logMailError(Mail::failures());
        }
    }

    private function logMailError($errors)
    {
        SystemLogger::dispatch($errors, SystemLog::CATEGORY_MAIL, SystemLog::EVENT_MAIL_SEND, SystemLog::TYPE_FAILURE,
            $this->invoice->customer);
    }
}
