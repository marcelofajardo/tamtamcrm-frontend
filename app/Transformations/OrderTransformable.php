<?php

namespace App\Transformations;

use App\Order;

trait OrderTransformable
{
    protected function transformOrder(Order $order)
    {
        $prop = new Order;
        $prop->order_id = (int)$order->id;
        $prop->price = $order->price;
        $prop->task_id = (int)$order->task_id;
        $prop->product_id = (int)$order->product_id;
        $prop->name = $order->name;
        $prop->slug = $order->slug;
        $prop->attributes = $order->attributes ?: [];
        $prop->status = $order->status;
        $prop->quantity = (int)$order->quantity;

        return $prop;
    }
}
