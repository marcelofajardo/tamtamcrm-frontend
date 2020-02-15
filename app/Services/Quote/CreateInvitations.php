<?php
namespace App\Services\Quote;

use App\Factory\QuoteInvitationFactory;
use App\QuoteInvitation;

class CreateInvitations
{

    public function __construct()
    {
    }

    public function __invoke($quote)
    {

        $contacts = $quote->customer->contacts;

        $contacts->each(function ($contact) use($quote){
            $invitation = QuoteInvitation::whereAccountId($quote->account_id)
                ->whereClientContactId($contact->id)
                ->whereQuoteId($quote->id)
                ->first();

            if (!$invitation && $contact->send_invoice) {
                $ii = QuoteInvitationFactory::create($quote->account_id, $quote->user_id);
                $ii->quote_id = $quote->id;
                $ii->client_contact_id = $contact->id;
                $ii->save();
            } elseif ($invitation && !$contact->send_invoice) {
                $invitation->delete();
            }
        });

        return $quote;
    }
}
