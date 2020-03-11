<?php
/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

namespace App\Jobs\Quote;

use App\Jobs\Utils\SystemLogger;
use App\Mail\TemplateEmail;
use App\QuoteInvitation;
use App\SystemLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EmailQuote implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $quote_invitation;

    public $email_builder;

    /**
     * EmailQuote constructor.
     * @param BuildEmail $email_builder
     * @param QuoteInvitation $quote_invitation
     */
    public function __construct($email_builder, QuoteInvitation $quote_invitation)
    {
        $this->quote_invitation = $quote_invitation;
        $this->email_builder = $email_builder;
    }

    /**
     * Execute the job.
     *
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->quote_invitation->contact->email, $this->quote_invitation->contact->present()->name())
            ->send(new TemplateEmail($this->email_builder, $this->quote_invitation->contact->user,
                $this->quote_invitation->contact->customer));

        if (count(Mail::failures()) > 0) {
            return $this->logMailError(Mail::failures());
        }
    }

    private function logMailError($errors)
    {
        SystemLogger::dispatch($errors, SystemLog::CATEGORY_MAIL, SystemLog::EVENT_MAIL_SEND, SystemLog::TYPE_FAILURE,
            $this->quote->customer);
    }
}
