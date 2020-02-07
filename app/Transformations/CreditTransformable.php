<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 02/12/2019
 * Time: 15:58
 */

namespace App\Transformations;

use App\Credit;


trait CreditTransformable
{

    /**
     * Transform the credit
     *
     * @param Credit $credit
     * @return Credit
     */
    protected function transformCredit(Credit $credit)
    {
        $prop = new Credit();

        $prop->id = (int)$credit->id;
        $prop->customer_id = (int)$credit->customer_id;
        //$prop->customer = $credit->customer;
        $prop->customer_name = $credit->customer->present()->name;
        $prop->deleted_at = $credit->deleted_at;
        $prop->user_id = $credit->user_id;
        $prop->total = (float)$credit->total;
        $prop->balance = (float) $credit->balance;
        $prop->number = $credit->number ?: '';
        $prop->status_id = (int) ($credit->status_id ?: 1);
        $prop->terms = $credit->terms ?: '';
        $prop->footer = $credit->footer ?: '';
        $prop->notes = $credit->notes ?: '';

        return $prop;
    }
}
