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

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Invoice;
use App\Customer;
use App\Payment;

$factory->define(Payment::class, function (Faker\Generator $faker) {
    $customer = factory(Customer::class)->create();
    $invoice = factory(Invoice::class)->create();
    return [
        'account_id' => 1,
        'type_id' => 1,
        'customer_id' => $customer->id,
        'amount' => $faker->randomFloat()
    ];
});
