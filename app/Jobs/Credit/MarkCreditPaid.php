<?php
/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

namespace App\Jobs\Invoice;

use App\Factory\CreditFactory;
use App\Factory\PaymentFactory;
use App\Jobs\Customer\UpdateClientBalance;
use App\Jobs\Customer\UpdateClientPaidToDate;
use App\Jobs\Company\UpdateCompanyLedgerWithPayment;

;

use App\Account;
use App\Credit;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MarkCreditPaid implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $credit;

    private $account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Credit $credit, Account $account)
    {
        $this->credit = $credit;
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

        if ($this->credit->status_id == Credit::STATUS_DRAFT) {
            $this->credit->markSent();
        }

        /* Create Payment */
        $payment =
            PaymentFactory::create($this->credit->customer_id, $this->credit->user_id, $this->credit->account_id);

        $payment->amount = $this->credit->balance;
        $payment->status_id = Credit::STATUS_COMPLETED;
        $payment->customer_id = $this->credit->customer_id;
        $payment->transaction_reference = 'MANUAL';
        /* Create a payment relationship to the invoice entity */
        $payment->save();

        $payment->credits()->attach($this->credit->id, [
            'amount' => $payment->amount
        ]);

        $this->credit->updateBalance($payment->amount * -1);

        /* Update Credit balance */ //event(new PaymentWasCreated($payment, $payment->company));

        // UpdateCompanyLedgerWithPayment::dispatchNow($payment, ($payment->amount*-1), $this->company);
        // UpdateClientBalance::dispatchNow($payment->client, $payment->amount*-1, $this->company);
        // UpdateClientPaidToDate::dispatchNow($payment->client, $payment->amount, $this->company);

        return $this->credit;
    }
}
