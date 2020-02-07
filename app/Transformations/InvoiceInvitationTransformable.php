<?php
namespace App\Transformations;

use App\Invoice;
use App\InvoiceInvitation;

trait InvoiceInvitationTransformable
{
    /**
     * @param Quote $quote
     * @return Quote
     */
    protected function transformInvoiceInvitation(InvoiceInvitation $invitation)
    {
        $prop = new InvoiceInvitation;

         $prop->id = $invitation->id;
         $prop->customer_id = $invitation->customer_id;
         $prop->key = $invitation->key;
         $prop->link = $invitation->getLink() ?: '';
         $prop->sent_date = $invitation->sent_date ?: '';
         $prop->viewed_date = $invitation->viewed_date ?: '';
         $prop->opened_date = $invitation->opened_date ?: '';
       
        return $prop;
    }
}
