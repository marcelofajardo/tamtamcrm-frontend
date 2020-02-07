<?php
namespace App\Jobs\Company;

use App\Factory\CompanyLedgerFactory;
use App\CompanyLedger;
use App\Invoice;
use App\Payment;
use Illuminate\Foundation\Bus\Dispatchable;

/**
 * Class for update company ledger with payment.
 */
class UpdateCompanyLedgerWithPayment
{
    use Dispatchable;
    public $adjustment;
    public $payment;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Payment $payment, float $adjustment)
    {
        $this->payment = $payment;
        $this->adjustment = $adjustment;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $balance = 0;

        /* Get the last record for the client and set the current balance*/
        $ledger = CompanyLedger::whereCustomerId($this->payment->customer_id)
            ->whereAccountId($this->payment->customer->company)
            ->orderBy('id', 'DESC')
            ->first();
        if ($ledger) {
            $balance = $ledger->balance;
        }
        $company_ledger = CompanyLedgerFactory::create($this->payment->account_id, $this->payment->user_id);
        $company_ledger->customer_id = $this->payment->customer_id;
        $company_ledger->adjustment = $this->adjustment;
        $company_ledger->balance = $balance + $this->adjustment;
        $company_ledger->save();
        $this->payment->company_ledger()->save($company_ledger); //todo add model directive here
    }
}
