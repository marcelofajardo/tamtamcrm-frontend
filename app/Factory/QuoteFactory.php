<?php
namespace App\Factory;

use App\Quote;
use Illuminate\Support\Facades\Log;

class QuoteFactory
{
    /**
     * @param int $customer_id
     * @param int $account_id
     * @param int $user_id
     * @param $total
     * @return Quote
     */
    public static function create(int $customer_id, int $account_id, int $user_id, $total) :Quote
    {
        $quote = new Quote();
        $quote->account_id = $account_id;
        $quote->status_id = Quote::STATUS_DRAFT;
        $quote->discount_total = 0;
        $quote->tax_total = 0;
        $quote->footer = '';
        $quote->terms = '';
        $quote->notes = '';
        $quote->number = null;
        $quote->date = null;
        $quote->partial_due_date = null;
        $quote->user_id = $user_id;
        $quote->total = $total;
        $quote->balance = $total;
        $quote->partial = 0;
        $quote->customer_id = $customer_id;
        $quote->custom_value1 = '';
        $quote->custom_value2 = '';
        $quote->custom_value3 = '';
        $quote->custom_value4 = '';

        return $quote;
    }
}
