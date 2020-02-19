<?php

namespace App\Services\Order;

use App\Helpers\Email\OrderEmail;
use App\Jobs\Order\EmailOrder;

class SendEmail
{

    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Builds the correct template to send
     * @param string $reminder_template The template name ie reminder1
     * @return array
     */
    public function run(): array
    {
        $task = $this->order->task;
        $customer = $task->customer;
        $email_builder = (new OrderEmail())->build($this->order, $customer);

            if ($customer->send_invoice && $customer->email) {
                EmailOrder::dispatchNow($this->order, $email_builder, $customer);
            }
    }
}
