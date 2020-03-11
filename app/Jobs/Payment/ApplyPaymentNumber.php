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

namespace App\Jobs\Payment;

use App\Invoice;
use App\Account;
use App\Payment;
use App\Customer;
//use App\PaymentTerm;
use App\Repositories\InvoiceRepository;
//use App\Utils\Traits\GeneratesCounter;
use App\Traits\NumberFormatter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use App\Traits\GeneratesCounter;

class ApplyPaymentNumber implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, NumberFormatter, GeneratesCounter;
    public $payment;
    public $settings;
    private $account;

    /**
     * ApplyPaymentNumber constructor.
     * @param Payment $payment
     * @param $settings
     * @param Account $account
     */
    public function __construct(Payment $payment, $settings, Account $account)
    {
        $this->payment = $payment;
        $this->settings = $settings;
        $this->account = $account;
    }

    /**
     * @return Payment
     */
    public function handle(): Payment
    {
        //return early
        if ($this->payment->number != '' || empty($this->settings)) {
            return $this->payment;
        }

        $this->payment->number = $this->getNextPaymentNumber($this->payment->customer);

//        switch ($this->settings->counter_number_applied) {
//            case 'when_saved':
//                $this->payment->number = $this->getNextPaymentNumber($this->payment->customer);
//                break;
//            case 'when_sent':
//                if ($this->payment->status_id == Invoice::STATUS_SENT) {
//                    $this->invoice->number = $this->getNextInvoiceNumber($this->invoice->customer);
//                }
//                break;
//
//            default:
//                # code...
//                break;
//        }

        $this->payment->save();

        return $this->payment;
    }
}
