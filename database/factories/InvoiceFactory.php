<?php

use App\Invoice;
use App\Customer;
use App\User;

$factory->define(Invoice::class, function (Faker\Generator $faker) {

    $customer = factory(Customer::class)->create();
    $user = factory(User::class)->create();

    return [
        'account_id' => 1,
        'status_id' => 1,
        'total' => $faker->randomFloat(),
        'tax_total' => $faker->randomFloat(),
        'discount_total' => $faker->randomFloat(),
        'customer_id' => $customer->id,
        'user_id' => $user->id
    ];
});
