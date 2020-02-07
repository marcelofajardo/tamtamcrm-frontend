<?php

namespace App\Jobs\Invoice;
use App\Events\Payment\PaymentWasCreated;
use App\Factory\PaymentFactory;
use App\Jobs\Customer\UpdateClientBalance;
use App\Jobs\Customer\UpdateClientPaidToDate;
//use App\Jobs\Company\UpdateCompanyLedgerWithPayment;
use App\Jobs\Invoice\ApplyPaymentToInvoice;
use App\Account;
use App\Invoice;
use App\Payment;
use App\Repositories\InvoiceRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
class ApplyInvoicePayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $invoice;
    public $payment;
    public $amount;
    private $account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice, Payment $payment, float $amount, Account $account)
    {
        $this->invoice = $invoice;
        $this->payment = $payment;
        $this->amount = $amount;
        $this->account = $account;
    }

    /**
     * Execute the job.
     *
     *
     * @return void
     */
    public function handle()
    {
        //UpdateCompanyLedgerWithPayment::dispatchNow($this->payment, ($this->amount*-1), $this->account);
        UpdateClientBalance::dispatchNow($this->payment->customer, $this->amount*-1, $this->account);
        //UpdateClientPaidToDate::dispatchNow($this->payment->customer, $this->amount, $this->account);
        /* Update Pivot Record amount */
        $this->payment->invoices->each(function ($inv) {
            if ($inv->id == $this->invoice->id) {
                $inv->pivot->amount = $this->amount;
                $inv->pivot->save();
            }
        });
        if ($this->invoice->hasPartial()) {
        //is partial and amount is exactly the partial amount
            if ($this->invoice->partial == $this->amount) {
                $this->invoice->clearPartial();
                $this->invoice->setDueDate();
                $this->invoice->setStatus(Invoice::STATUS_PARTIAL);
                $this->invoice->updateBalance($this->amount*-1);
            } elseif ($this->invoice->partial > 0 && $this->invoice->partial > $this->amount) { //partial amount exists, but the amount is less than the partial amount
                $this->invoice->partial -= $this->amount;
                $this->invoice->updateBalance($this->amount*-1);
            } elseif ($this->invoice->partial > 0 && $this->invoice->partial < $this->amount) { //partial exists and the amount paid is GREATER than the partial amount
                $this->invoice->clearPartial();
                $this->invoice->setDueDate();
                $this->invoice->setStatus(Invoice::STATUS_PARTIAL);
                $this->invoice->updateBalance($this->amount*-1);
            }
        } elseif ($this->amount == $this->invoice->balance) { //total invoice paid.
            $this->invoice->clearPartial();
            //$this->invoice->setDueDate();
            $this->invoice->setStatus(Invoice::STATUS_PAID);
            $this->invoice->updateBalance($this->amount*-1);
        } elseif($this->amount < $this->invoice->balance) { //partial invoice payment made
            $this->invoice->clearPartial();
            $this->invoice->updateBalance($this->amount*-1);
        }
        
        /* Update Payment Applied Amount*/
        //$this->payment->applied += $this->amount;
        //$this->payment->save();
    }

}

