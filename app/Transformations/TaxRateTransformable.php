<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 11/12/2019
 * Time: 20:10
 */

namespace App\Transformations;


use App\TaxRate;

trait TaxRateTransformable
{

    /**
     * Transform the user
     *
     * @param User $user
     * @return User
     */
    protected function transformTaxRate(TaxRate $tax_rate)
    {
        $prop = new TaxRate();

        $prop->id = (int)$tax_rate->id;
        $prop->name = (string)$tax_rate->name;
        $prop->rate = (float)$tax_rate->rate;
        $prop->updated_at = $tax_rate->updated_at;
        $prop->deleted_at = $tax_rate->deleted_at;

        return $prop;
    }
}