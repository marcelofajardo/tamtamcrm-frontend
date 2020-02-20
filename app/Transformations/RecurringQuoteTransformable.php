<?php

namespace App\Transformations;

use App\Quote;
use App\RecurringQuote;
use App\Repositories\CustomerRepository;
use App\Customer;

trait RecurringQuoteTransformable
{

    /**
     * @param RecurringQuote $invoice
     * @return RecurringQuote
     */
    protected function transformQuote(RecurringQuote $quote)
    {
        $prop = new RecurringQuote;

        $prop->id = (int)$quote->id;
        $prop->number = $quote->number ?: '';
        $prop->customer_id = $quote->customer_id;
        $prop->date = $quote->date;
        $prop->due_date = $quote->due_date;
        $prop->start_date = $quote->start_date;
        $prop->deleted_at = $quote->deleted_at;
        $prop->created_at = $quote->created_at;

        $prop->total = $quote->total;
        $prop->sub_total = $quote->sub_total;
        $prop->tax_total = $quote->tax_total;
        $prop->discount_total = $quote->discount_total;
        $prop->public_notes = $quote->public_notes ?: '';
        $prop->private_notes = $quote->private_notes ?: '';
        $prop->status_id = $quote->status_id;
        $prop->terms = $quote->terms;
        $prop->footer = $quote->footer;
        $prop->line_items = $quote->line_items;
        $prop->custom_value1 = $quote->custom_value1 ?: '';
        $prop->custom_value2 = $quote->custom_value2 ?: '';
        $prop->custom_value3 = $quote->custom_value3 ?: '';
        $prop->custom_value4 = $quote->custom_value4 ?: '';

        return $prop;
    }

}
