<?php

namespace App\Services\Invoice;

use App\Events\Payment\PaymentWasCreated;
use App\Factory\PaymentFactory;
use App\Jobs\Customer\UpdateCustomerBalance;
use App\Jobs\Customer\UpdateCustomerPaidToDate;
use App\Jobs\Company\UpdateCompanyLedgerWithPayment;
use App\Invoice;
use App\Payment;
use App\Services\Customer\CustomerService;
use App\Services\Payment\PaymentService;

class MarkPaid
{
    private $customer_service;

    public function __construct($customer_service)
    {
        $this->customer_service = $customer_service;
    }

    public function __invoke($invoice)
    {

        if ($invoice->status_id == Invoice::STATUS_DRAFT) {
            $invoice->service()->markSent();
        }

        /* Create Payment */
        $payment = PaymentFactory::create($invoice->customer_id, $invoice->user_id, $invoice->account_id);

        $payment->amount = $invoice->balance;
        $payment->status_id = Payment::STATUS_COMPLETED;
        $payment->customer_id = $invoice->customer_id;
        $payment->transaction_reference = 'manual entry';
        /* Create a payment relationship to the invoice entity */
        $payment->save();

        $payment->invoices()->attach($invoice->id, [
            'amount' => $payment->amount
        ]);

        $invoice->service()
            ->updateBalance($payment->amount * -1)
            ->setStatus(Invoice::STATUS_PAID)
            ->save();

        /* Update Invoice balance */
        event(new PaymentWasCreated($payment, $payment->account));

        UpdateCompanyLedgerWithPayment::dispatchNow($payment, ($payment->amount * -1), $payment->account);

        $this->customer_service
            ->updateBalance($payment->amount * -1)
            ->updatePaidToDate($payment->amount)
            ->save();

        return $invoice;
    }

}
