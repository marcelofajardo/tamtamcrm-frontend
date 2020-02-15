<?php
namespace App\Services\Invoice;


use App\Factory\InvoiceInvitationFactory;
use App\Invoice;
use App\InvoiceInvitation;

class CreateInvitations
{

    public function __construct()
    {
    }

    public function run($invoice)
    {

        $contacts = $invoice->customer->contacts;

        $contacts->each(function ($contact) use($invoice){
            $invitation = InvoiceInvitation::whereAccountId($invoice->account_id)
                ->whereClientContactId($contact->id)
                ->whereInvoiceId($invoice->id)
                ->first();

            if (!$invitation && $contact->send_invoice) {
                $ii = InvoiceInvitationFactory::create($invoice->account_id, $invoice->user_id);
                $ii->invoice_id = $invoice->id;
                $ii->client_contact_id = $contact->id;
                $ii->save();
            } elseif ($invitation && !$contact->send_invoice) {
                $invitation->delete();
            }
        });

        return $invoice;
    }
}
