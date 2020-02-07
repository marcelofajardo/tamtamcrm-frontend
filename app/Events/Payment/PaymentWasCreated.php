<?php
namespace App\Events\Payment;

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

    /**
     * Create a new event instance.
     *
     * @param Payment $payment
     */
    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }
}