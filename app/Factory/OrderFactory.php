<?php

namespace App\Factory;

use App\Order;

/**
 * Class OrderFactory
 * @package App\Factory
 */
class OrderFactory
{
    /**
     * @param int $user_id
     * @param int $account_id
     * @return Order
     */
    public function create(int $user_id, int $account_id, int $task_id, int $quantity): Order
    {
        $order = new Order;
        $order->name = '';
        $order->task_id = $task_id;
        $order->user_id = $user_id;
        $order->account_id = $account_id;
        $order->sku = '';
        $order->quantity = $quantity;

        return $order;
    }
}
