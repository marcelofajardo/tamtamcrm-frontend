<?php

namespace App\Factory;

use App\Expense;
use Illuminate\Support\Facades\Log;

class ExpenseFactory
{
    /**
     * @param int $account_id
     * @param int $user_id
     * @return Expense
     */
    public static function create(int $account_id, int $user_id): Expense
    {
        $expense = new Expense();
        $expense->user_id = $user_id;
        $expense->account_id = $account_id;
        $expense->is_deleted = false;
        $expense->should_be_invoiced = false;
        $expense->tax_name1 = '';
        $expense->tax_rate1 = 0;
        $expense->tax_name2 = '';
        $expense->tax_rate2 = 0;
        $expense->tax_name3 = '';
        $expense->tax_rate3 = 0;
        $expense->expense_date = null;
        $expense->payment_date = null;
        $expense->public_notes = '';
        $expense->private_notes = '';

        return $expense;
    }
}
