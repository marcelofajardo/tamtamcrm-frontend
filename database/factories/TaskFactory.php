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
use App\Task;
use App\Customer;
use App\User;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    $customer = factory(Customer::class)->create();
    return [
        'account_id' => 1,
        'title' => $faker->text,
        'content' => $faker->text,
        'is_completed' => 0,
        'customer_id' => $customer->id,
        'due_date' => $faker->dateTime(),
        'task_type' => 2,
        'source_type' => 1,
        'task_status' => 1,
        'valued_at' => $faker->randomNumber(3)
    ];
});
