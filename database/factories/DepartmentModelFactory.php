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

use App\Department;
use App\User;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Department::class, function (Faker\Generator $faker) {
    $user = factory(User::class)->create();
    return [
        'name' => $faker->unique()->word,
        'department_manager' => $user->id
    ];
});
