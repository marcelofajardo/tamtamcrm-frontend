<?php

namespace App\Factory;

use App\Product;

class ProductFactory
{
    public static function create(int $user_id, int $account_id): Product
    {
        $product = new Product;
        $product->user_id = $user_id;
        $product->account_id = $account_id;
        $product->company_id = 0;
        $product->sku = '';
        $product->name = '';
        $product->slug = '';
        $product->description = '';
        $product->cost = 0;
        $product->price = 0;
        $product->quantity = 1;
        $product->cover = '';
        $product->custom_value1 = '';
        $product->custom_value2 = '';
        $product->custom_value3 = '';
        $product->custom_value4 = '';
        return $product;
    }
}
