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
use App\Address;
use App\Customer;

$factory->define (\App\Account::class, function (Faker\Generator $faker) {
    $customer = factory (Customer::class)->create ();
    return [
      
    ];
});
