<?php

namespace App\Factory;

use App\Quote;
use App\RecurringQuote;

class QuoteToRecurringQuoteFactory
{
    public static function create(Quote $quote): RecurringQuote
    {
        $recurring_invoice = new RecurringQuote;
        $recurring_invoice->status_id = RecurringQuote::STATUS_DRAFT;
        $recurring_invoice->discount_total = $quote->discount_total;
        $recurring_invoice->tax_total = $quote->tax_total;
        $recurring_invoice->number = '';
        $recurring_invoice->is_amount_discount = $quote->is_amount_discount;
        $recurring_invoice->po_number = $quote->po_number;
        $recurring_invoice->footer = $quote->footer;
        $recurring_invoice->terms = $quote->terms;
        $recurring_invoice->notes = $quote->notes;
        $recurring_invoice->date = date_create()->format('Y-m-d');
        $recurring_invoice->due_date = $quote->due_date; //todo calculate based on terms
        $recurring_invoice->is_deleted = $quote->is_deleted;
        $recurring_invoice->line_items = $quote->line_items;
        $recurring_invoice->custom_value1 = $quote->custom_value1;
        $recurring_invoice->custom_value2 = $quote->custom_value2;
        $recurring_invoice->custom_value3 = $quote->custom_value3;
        $recurring_invoice->custom_value4 = $quote->custom_value4;
        $recurring_invoice->total = $quote->total;
        $recurring_invoice->sub_total = $quote->sub_total;
        $recurring_invoice->balance = $quote->balance;
        $recurring_invoice->user_id = $quote->user_id;
        $recurring_invoice->customer_id = $quote->customer_id;
        $recurring_invoice->account_id = $quote->account_id;
        $recurring_invoice->frequency_id = RecurringQuote::FREQUENCY_MONTHLY;
        $recurring_invoice->start_date = null;
        $recurring_invoice->last_sent_date = null;
        $recurring_invoice->next_send_date = null;
        $recurring_invoice->remaining_cycles = 0;
        return $recurring_invoice;
    }
}
