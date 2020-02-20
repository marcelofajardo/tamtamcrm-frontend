<?php

namespace App\Factory;

use App\Payment;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class PaymentFactory
{
    /**
     * @param int $customer_id
     * @param int $user_id
     * @param int $account_id
     * @return Payment
     */
    public static function create(int $customer_id, int $user_id, int $account_id): Payment
    {
        $payment = new Payment;

        $payment->user_id = $user_id;
        $payment->private_notes = '';
        $payment->customer_id = $customer_id;
        $payment->account_id = $account_id;
        $payment->date = Carbon::now()->format('Y-m-d');
        $payment->is_deleted = false;
        $payment->amount = 0;
        $payment->type_id = null;
        $payment->transaction_reference = null;
        $payment->status_id = Payment::STATUS_PENDING;

        return $payment;
    }
}
