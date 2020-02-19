<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 15/02/2020
 * Time: 18:26
 */

namespace App\Services\Order;


class OrderService
{

    protected $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function sendEmail()
    {
        $send_email = new SendEmail($this->order);

        $this->order = $send_email->run();

        return $this;
    }

}