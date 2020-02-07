<?php

namespace App\Transformations;

use App\Product;

trait ProductTransformable
{

    /**
     * Transform the product
     *
     * @param Product $product
     * @return Product
     */
    protected function transformProduct(Product $product)
    {
        $prod = new Product;

        $attributes = $product->attributes->first();

        $prod->id = (int)$product->id;
        $prod->name = $product->name;
        $prod->sku = $product->sku;
        $prod->quantity = $product->quantity;
        $prod->deleted_at = $product->deleted_at;
        $prod->slug = $product->slug;
        $prod->description = $product->description;
        $prod->cost = (float)$product->cost ?: 0;
        $prod->user_id = (int)$product->user_id;
        $prod->assigned_user_id = (int)$product->assigned_user_id;
        $prod->notes = $product->notes ?: '';
        $prod->price = (float)$product->price ?: 0;
        $prod->quantity = (float)$product->quantity ?: 1.0;
        $prod->status = $product->status;
        $prod->cover = $product->cover;
        $prod->company_id = (int)$product->company_id;
        $prod->brand = $product->company->name;
        $prod->category_ids = $product->categories()->pluck('category_id')->all();
        $prod->images = $product->images()->get(['src']);
        $prod->custom_value1 = $product->custom_value1 ?: '';
        $prod->custom_value2 = $product->custom_value2 ?: '';
        $prod->custom_value3 = $product->custom_value3 ?: '';
        $prod->custom_value4 = $product->custom_value4 ?: '';

        $range_from = $range_to = $payable_months = $minimum_downpayment = $number_of_years = $interest_rate = 0;

        if ($attributes && $attributes->count() > 0) {
            $range_from = $attributes->range_from;
            $range_to = $attributes->range_to;
            $payable_months = $attributes->payable_months;
            $minimum_downpayment = $attributes->minimum_downpayment;
            $number_of_years = $attributes->number_of_years;
            $interest_rate = $attributes->interest_rate;
        }

        $prod->range_from = $range_from;
        $prod->range_to = $range_to;
        $prod->payable_months = $payable_months;
        $prod->minimum_downpayment = $minimum_downpayment;
        $prod->number_of_years = $number_of_years;
        $prod->interest_rate = $interest_rate;

        return $prod;
    }

}
