<?php
namespace App\Jobs\Invoice;

use App\Jobs\Customer\UpdateClientBalance;
use App\Jobs\Customer\UpdateClientPaidToDate;
use App\Invoice;
use App\Payment;
use App\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ReverseInvoicePayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $payment;
    private $account;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Payment $payment, Account $account)
    {
        $this->payment = $payment;
        $this->account = $account;
    }

    /**
     * Handle the event.
     *
     * @param  object $event
     * @return void
     */
    public function handle()
    {
        $invoices = $this->payment->invoices()->get();
        $client = $this->payment->customer;
        $invoices->each(function ($invoice) {

            if ($invoice->pivot->amount > 0) {
                $invoice->status_id = Invoice::STATUS_SENT;
                $invoice->balance = $invoice->pivot->amount;
                $invoice->save();
            }
        });

        // UpdateCompanyLedgerWithPayment::dispatchNow($this->payment, ($this->payment->amount));
        $client->service()
            ->updateBalance($this->payment->amount)
             ->updatePaidToDate($this->payment->amount*-1)
             ->save();
    }
}
