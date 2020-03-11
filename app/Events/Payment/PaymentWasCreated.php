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

namespace App\Events\Payment;

use App\Account;
use App\Payment;
use Illuminate\Queue\SerializesModels;

/**
 * Class PaymentWasCreated.
 */
class PaymentWasCreated
{
    use SerializesModels;
    /**
     * @var array $payment
     */
    public $payment;
    public $account;

    /**
     * Create a new event instance.
     *
     * @param Payment $payment
     */
    public function __construct(Payment $payment, Account $account)
    {
        $this->payment = $payment;
        $this->account = $account;
    }
}
