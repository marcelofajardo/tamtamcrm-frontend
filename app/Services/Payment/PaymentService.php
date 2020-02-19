<?php
namespace App\Services\Payment;

use App\Factory\PaymentFactory;
use App\Payment;


class PaymentService
{
    private $payment;

    public function __construct($payment)
    {
        $this->payment = $payment;
    }

    public function manualPayment($invoice) :?Payment
    {
        /* Create Payment */
        $payment = PaymentFactory::create($invoice->customer_id, $invoice->user_id, $invoice->account_id);

        $payment->amount = $invoice->balance;
        $payment->status_id = Payment::STATUS_COMPLETED;
        $payment->customer_id = $invoice->customer_id;
        $payment->transaction_reference = 'manual_entry';
        /* Create a payment relationship to the invoice entity */
        $payment->save();

        $payment->invoices()->attach($invoice->id, [
            'amount' => $payment->amount
        ]);

        return $payment;
    }

public
function sendEmail($contact = null)
{
    $send_email = new SendEmail($this->payment, $contact);

    return $send_email->run();
}
}
