<?php
namespace App\Services\Invoice;

use App\Jobs\Company\UpdateCompanyLedgerWithPayment;
use App\Invoice;
use App\Payment;
use App\Services\Customer\CustomerService;

class ApplyPayment
{

    private $invoice;

    public function __construct($invoice)
    {
        $this->invoice = $invoice;
    }

  	public function __invoke($payment, $payment_amount)
  	{

        UpdateCompanyLedgerWithPayment::dispatchNow($payment, ($payment_amount*-1), $payment->account);

        $payment->customer->service()->updateBalance($payment_amount*-1)->save();

        /* Update Pivot Record amount */
        $payment->invoices->each(function ($inv) use($payment_amount){
            if ($inv->id == $this->invoice->id) {
                $inv->pivot->amount = $payment_amount;
                $inv->pivot->save();
            }
        });

        if ($this->invoice->hasPartial()) {
        //is partial and amount is exactly the partial amount
            if ($this->invoice->partial == $payment_amount) {
                $this->invoice->service()->clearPartial()->setDueDate()->setStatus(Invoice::STATUS_PARTIAL)->updateBalance($payment_amount*-1);
            } elseif ($this->invoice->partial > 0 && $this->invoice->partial > $payment_amount) { //partial amount exists, but the amount is less than the partial amount
                $this->invoice->service()->updatePartial($payment_amount*-1)->updateBalance($payment_amount*-1);
            } elseif ($this->invoice->partial > 0 && $this->invoice->partial < $payment_amount) { //partial exists and the amount paid is GREATER than the partial amount
                $this->invoice->service()->clearPartial()->setDueDate()->setStatus(Invoice::STATUS_PARTIAL)->updateBalance($payment_amount*-1);
            }
        } elseif ($payment_amount == $this->invoice->balance) { //total invoice paid.
            $this->invoice->service()->clearPartial()->setStatus(Invoice::STATUS_PAID)->updateBalance($payment_amount*-1);
        } elseif($payment_amount < $this->invoice->balance) { //partial invoice payment made
            $this->invoice->service()->clearPartial()->updateBalance($payment_amount*-1);
        }
        
        return $this->invoice;
  	}
}
