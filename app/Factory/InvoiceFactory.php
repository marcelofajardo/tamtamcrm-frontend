<?php
namespace App\Factory;

use App\Invoice;
use Illuminate\Support\Facades\Log;

class InvoiceFactory
{
    public static function create(int $customer_id, $user_id, $account_id, $total = 0) :Invoice
    {
        $quote = new Invoice();
        $quote->account_id = $account_id;
        $quote->balance = $total;
        $quote->status_id = Invoice::STATUS_DRAFT;
        $quote->discount_total = 0;
        $quote->tax_total = 0;
        $quote->footer = '';
        $quote->terms = '';
        $quote->notes = '';
        $quote->date = null;
        $quote->partial_due_date = null;
        $quote->total = $total;
        $quote->user_id = $user_id;
        $quote->partial = 0;
        $quote->customer_id = $customer_id;
        $quote->custom_value1 = '';
        $quote->custom_value2 = '';
        $quote->custom_value3 = '';
        $quote->custom_value4 = '';

        return $quote;
    }
}