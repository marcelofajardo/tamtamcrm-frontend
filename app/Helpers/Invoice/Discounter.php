<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 08/02/2020
 * Time: 13:50
 */

namespace App\Helpers\Invoice;


trait Discounter
{
    public function discount($amount)
    {
        return $this->invoice->discount_total;

    }
}