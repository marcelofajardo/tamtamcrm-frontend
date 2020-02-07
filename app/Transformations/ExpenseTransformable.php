<?php

namespace App\Transformations;

use App\Company;
use App\Expense;

trait ExpenseTransformable
{

    /**
     * @param Company $company
     * @return Company
     */
    protected function transformExpense(Expense $expense)
    {
        $prop = new Expense();
        $prop->id = $expense->id;
        $prop->user_id = $expense->user_id;
        $prop->assigned_user_id = $expense->assigned_user_id;
        $prop->company_id = $expense->company_id;
        $prop->invoice_id = $expense->invoice_id;
        $prop->customer_id = $expense->customer_id;
        $prop->bank_id = (string)$expense->bank_id ?: '';
        $prop->invoice_currency_id = (int)$expense->invoice_currency_id ?: '';
        $prop->expense_currency_id = (int)$expense->expense_currency_id ?: '';
        $prop->invoice_category_id = (int)$expense->invoice_category_id ?: '';
        $prop->payment_type_id = (int)$expense->payment_type_id ?: '';
        $prop->recurring_expense_id = (int)$expense->recurring_expense_id ?: '';
        $prop->is_deleted = (bool)$expense->is_deleted;
        $prop->should_be_invoiced = (bool)$expense->should_be_invoiced;
        $prop->invoice_documents = (bool)$expense->invoice_documents;
        $prop->amount = (float)$expense->amount ?: 0;
        $prop->foreign_amount = (float)$expense->foreign_amount ?: 0;
        $prop->exchange_rate = (float)$expense->exchange_rate ?: 0;
        $prop->tax_name1 = $expense->tax_name1 ? $expense->tax_name1 : '';
        $prop->tax_rate1 = (float)$expense->tax_rate1;
        $prop->tax_name2 = $expense->tax_name2 ? $expense->tax_name2 : '';
        $prop->tax_rate2 = (float)$expense->tax_rate2;
        $prop->tax_name3 = $expense->tax_name3 ? $expense->tax_name3 : '';
        $prop->tax_rate3 = (float)$expense->tax_rate3;
        $prop->notes = (string)$expense->notes ?: '';
        $prop->transaction_reference = (string)$expense->transaction_reference ?: '';
        $prop->transaction_id = (string)$expense->transaction_id ?: '';
        $prop->expense_date = $expense->expense_date ?: '';
        $prop->payment_date = $expense->payment_date ?: '';
        $prop->custom_value1 = $expense->custom_value1 ?: '';
        $prop->custom_value2 = $expense->custom_value2 ?: '';
        $prop->custom_value3 = $expense->custom_value3 ?: '';
        $prop->custom_value4 = $expense->custom_value4 ?: '';
        $prop->deleted_at = $expense->deleted_at;
        $prop->updated_at = $expense->updated_at;
        $prop->archived_at = $expense->deleted_at;

        return $prop;
    }

}
