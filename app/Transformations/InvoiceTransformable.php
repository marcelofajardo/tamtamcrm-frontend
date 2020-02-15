<?php

namespace App\Transformations;

use App\Invoice;
use App\InvoiceInvitation;
use App\Repositories\CustomerRepository;
use App\Customer;

trait InvoiceTransformable
{

    /**
     * Transform the invoice
     *
     * @param Invoice $invoice
     * @return Invoice
     */
    protected function transformInvoice(Invoice $invoice)
    {
        $prop = new Invoice;

        $prop->id = (int)$invoice->id;
        $customer = $invoice->customer;
        $prop->user_id = (int)$invoice->user_id;
        $prop->company_id = (int)$invoice->company_id ?: null;
        $prop->number = $invoice->number ?: '';
        $prop->customer_id = (int)$invoice->customer_id;
        $prop->date = $invoice->date ?: '';
        $prop->due_date = $invoice->due_date ?: '';
        $prop->next_send_date = $invoice->date ?: '';
        $prop->invitations = $this->transformInvitations($invoice->invitations);


        $prop->total = $invoice->total;
        $prop->balance = (float)$invoice->balance;
        $prop->sub_total = (float)$invoice->sub_total;
        $prop->tax_total = (float)$invoice->tax_total;
        $prop->status_id = (int)$invoice->status_id;
        $prop->discount_total = (float)$invoice->discount_total;
        $prop->deleted_at = $invoice->deleted_at;
        $prop->notes = (string)$invoice->notes ?: '';
        $prop->terms = (string)$invoice->terms ?: '';
        $prop->footer = (string)$invoice->footer;
        $prop->line_items = $invoice->line_items ?: (array)[];
        $prop->custom_value1 = $invoice->custom_value1 ?: '';
        $prop->custom_value2 = $invoice->custom_value2 ?: '';
        $prop->custom_value3 = $invoice->custom_value3 ?: '';
        $prop->custom_value4 = $invoice->custom_value4 ?: '';
        $prop->last_sent_date = $invoice->last_sent_date ?: '';

        return $prop;
    }

    /**
     * @param $invitations
     * @return array
     */
    private function transformInvitations($invitations)
    {
        if (empty($invitations)) {
            return [];
        }

        return $invitations->map(function (InvoiceInvitation $invitation) {
            return (new InvoiceInvitationTransformable())->transformInvoiceInvitation($invitation);
        })->all();
    }
}
