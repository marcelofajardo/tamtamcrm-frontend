<?php

namespace App\Events;

use App\Payment;
use Illuminate\Queue\SerializesModels;

/**
 * Class PaymentCompleted.
 */
class PaymentCompleted
{
    use SerializesModels;
    /**
     * @var Payment
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
