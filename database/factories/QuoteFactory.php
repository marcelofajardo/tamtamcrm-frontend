<?php

use App\Quote;
use App\Customer;
use App\User;

$factory->define(Quote::class, function (Faker\Generator $faker) {

    $customer = factory(Customer::class)->create();
    $user = factory(User::class)->create();

    return [
        'account_id' => 1,
        'status_id' => Quote::STATUS_DRAFT,
        'number' => '',
        'total' => $faker->randomFloat(),
        'tax_total' => $faker->randomFloat(),
        'discount_total' => $faker->randomFloat(),
        'customer_id' => $customer->id,
        'user_id' => $user->id,
        'date' => $faker->date(),
        'due_date' => $faker->date(),
        'custom_value1' => $faker->numberBetween(1,4),
        'custom_value2' => $faker->numberBetween(1,4),
        'custom_value3' => $faker->numberBetween(1,4),
        'custom_value4' => $faker->numberBetween(1,4),
        'is_deleted' => false,
        'po_number' => $faker->text(10),
    ];
});
