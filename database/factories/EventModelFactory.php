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
use App\Event;
use App\Customer;

$factory->define(Event::class, function (Faker\Generator $faker) {
    $customer = factory(Customer::class)->create();
    $user = factory(\App\User::class)->create();

    return [
        'created_by' => $user->id,
        'account_id' => 1,
        'title' => $faker->word,
        'description' => $faker->sentence,
        'location' => $faker->word,
        'beginDate' => $faker->dateTime()->format('Y-m-d H:i:s'),
        'endDate' => $faker->dateTime()->format('Y-m-d H:i:s'),
        'customer_id' => $customer->id,
        'event_type' => 2
    ];
});
