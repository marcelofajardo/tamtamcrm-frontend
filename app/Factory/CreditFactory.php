<?php

namespace App\Factory;

use App\Credit;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class CreditFactory
{
    public static function create(int $customer_id, int $account_id, int $user_id, $total): Credit
    {
        $credit = new Credit;
        $credit->status_id = Credit::STATUS_DRAFT;
        $credit->balance = $total;
        $credit->customer_id = $customer_id;
        $credit->account_id = $account_id;
        $credit->total = $total;
        $credit->user_id = $user_id;
        $credit->public_notes = '';
        $credit->private_notes = '';
        return $credit;
    }
}
