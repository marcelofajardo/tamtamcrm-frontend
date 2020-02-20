<?php

namespace App\Transformations;

use App\Invoice;
use App\RecurringInvoice;
use App\Repositories\CustomerRepository;
use App\Customer;

trait RecurringInvoiceTransformable
{

    /**
     * Transform the invoice
     *
     * @param Invoice $invoice
     * @return Invoice
     */
    protected function transformInvoice(RecurringInvoice $invoice)
    {
        $prop = new RecurringInvoice;

        $prop->id = (int)$invoice->id;
        $prop->number = $invoice->number;
        $prop->customer_id = $invoice->customer_id;
        $prop->date = $invoice->date;
        $prop->due_date = $invoice->due_date;
        $prop->start_date = $invoice->start_date;
        $prop->total = $invoice->total;
        $prop->sub_total = $invoice->sub_total;
        $prop->tax_total = $invoice->tax_total;
        $prop->discount_total = $invoice->discount_total;
        $prop->deleted_at = $invoice->deleted_at;
        $prop->created_at = $invoice->created_at;
        $prop->status_id = $invoice->status_id;
        $prop->public_notes = $invoice->public_notes ?: '';
        $prop->private_notes = $invoice->private_notes ?: '';
        $prop->terms = $invoice->terms;

        $prop->footer = $invoice->footer;
        $prop->line_items = $invoice->line_items;
        $prop->custom_value1 = $invoice->custom_value1 ?: '';
        $prop->custom_value2 = $invoice->custom_value2 ?: '';
        $prop->custom_value3 = $invoice->custom_value3 ?: '';
        $prop->custom_value4 = $invoice->custom_value4 ?: '';

        return $prop;
    }

}
