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
use App\Message;
use App\Customer;
use App\User;

$factory->define(Message::class, function (Faker\Generator $faker) {
    $customer = factory(Customer::class)->create();
    $user = factory(User::class)->create();
    
    return [
        'customer_id' => $customer->id,
        'user_id' => $user->id,
        'message' => $faker->sentence,
        'has_seen' => 1,
        'direction' => 1
    ];
});
