<?php

/*
  |--------------------------------------------------------------------------
  | Model Factories
  |--------------------------------------------------------------------------
  |
  | Here you may define all of your model factories. Model factories give
  | you a convenient way to create models for testing and seeding your
  | database. Just tell the factory how a default model should look.
  |
 */

use App\ProductAttribute;
use App\Product;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(ProductAttribute::class, function (Faker\Generator $faker) {

    $product = factory(Product::class)->create();

    return [
        'range_from' => $faker->randomFloat(2),
        'range_to' => $faker->randomFloat(2),
        'payable_months' => 12,
        'interest_rate' => $faker->randomFloat(2),
        'product_id' => $product->id
    ];
});
