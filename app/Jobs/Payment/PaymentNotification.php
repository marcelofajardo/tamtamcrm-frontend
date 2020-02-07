<?php
namespace App\Jobs\Payment;

use App\Account;
use App\Payment;
use App\Repositories\InvoiceRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PaymentNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $payment;
    private $account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Payment $payment, Account $account)
    {
        $this->payment = $payment;
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
        //MultiDB::setDB($this->company->db);
        //notification for the payment.
        //
        //could mean a email, sms, slack, push
    }
}
