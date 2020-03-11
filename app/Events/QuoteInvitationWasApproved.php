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

namespace App\Events;

use App\InvoiceInvitation;
use App\Invoice;
use Illuminate\Queue\SerializesModels;

class QuoteInvitationWasApproved
{
    use SerializesModels;
    public $quote;
    /**
     * @var Invitation
     */
    public $invitation;

    /**
     * Create a new event instance.
     * QuoteInvitationWasApproved constructor.
     * @param Invoice $quote
     * @param InvoiceInvitation|null $invitation
     */
    public function __construct(Invoice $quote, InvoiceInvitation $invitation = null)
    {
        $this->quote = $quote;
        $this->invitation = $invitation;
    }
}
