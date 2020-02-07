<?php

namespace App\Transformations;

use App\Payment;

trait PaymentTransformable
{
    /**
     * @param Payment $payment
     * @return Payment
     */
    public function transformPayment(Payment $payment)
    {
        $obj = new Payment;
        $obj->id = (int)$payment->id;
        $obj->user_id = (int)$payment->user_id;
        $obj->assigned_user_id = (int)$payment->assigned_user_id;
        $obj->number = (string)$payment->number ?: '';
        $obj->customer_name = $payment->customer->present()->name;
        $obj->date = $payment->date ?: '';
        $obj->amount = (float)$payment->amount;
        $obj->transaction_reference = $payment->transaction_reference ?: '';
        $obj->invoices = $payment->invoices;
        $obj->paymentables = $payment->paymentables;

        $obj->deleted_at = $payment->deleted_at;
        //$obj->archived_at = $payment->deleted_at;
        //$obj->is_deleted = (bool) $payment->is_deleted;
        $obj->type_id = (string)$payment->type_id;
        $obj->invitation_id = (string)$payment->invitation_id ?: '';
        $obj->customer_id = (int)$payment->customer_id;
        $obj->invoice_id = $payment->invoices->pluck('id')->toArray();

        $obj->refunded = (float)$payment->refunded;
        $obj->status = $payment->payment_status->name;
        $obj->is_manual = (bool)$payment->is_manual;
        $obj->task_id = (int)$payment->task_id;
        $obj->company_id = (int)$payment->company_id;
        $obj->applied = (float)$payment->applied;


        return $obj;
    }

}
