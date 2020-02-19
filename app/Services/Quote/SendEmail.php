<?php

namespace App\Services\Quote;

use App\Helpers\Email\QuoteEmail;
use App\Jobs\Quote\EmailQuote;
use App\Quote;
use App\Services\AbstractService;

class SendEmail extends AbstractService
{

    private $quote;
    private $reminder_template;
    private $contact;

    public function __construct($quote, $reminder_template = null, $contact = null)
    {
        $this->quote = $quote;
        $this->reminder_template = $reminder_template;
        $this->contact = $contact;
    }

    /**
     * Builds the correct template to send
     * @param string $reminder_template The template name ie reminder1
     * @return array
     */
    public function run()
    {
        if (!$this->reminder_template) {
            $this->reminder_template = $this->quote->status_id == Quote::STATUS_DRAFT || Carbon::parse($this->quote->due_date) > now() ? 'invoice' : $this->quote->calculateTemplate();
        }

        $this->quote->invitations->each(function ($invitation) {
            if ($invitation->contact->send && $invitation->contact->email) {
                $email_builder = (new QuoteEmail())->build($invitation, $this->reminder_template);
                EmailQuote::dispatchNow($email_builder, $invitation);
            }
        });
    }
}
