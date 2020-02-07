<?php

use App\User;

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
use App\Company;

$factory->define(Company::class, function (Faker\Generator $faker) {
    $user = factory(User::class)->create();


    return [
        'user_id' => $user->id,
        'account_id' => 1,
        'settings' => null,
        'notes' => null,
        'is_deleted' => false,
        'assigned_user_id' => null,
        'industry_id' => 1,
        'currency_id' => 1,
        'country_id' => 225,
        'custom_value1' => $faker->text(20),
        'custom_value2' => $faker->text(20),
        'custom_value3' => $faker->text(20),
        'custom_value4' => $faker->text(20),
        'name' => $faker->company,
        'website' => $faker->url,
        'phone_number' => $faker->phoneNumber,
        'email' => $faker->email,
        'address_1' => $faker->streetName,
        'address_2' => $faker->streetAddress,
        'town' => $faker->word,
        'city' => $faker->city,
        'postcode' => $faker->postcode,
        'custom_value1' => null,
        'custom_value2' => null,
        'custom_value3' => null,
        'custom_value4' => null,
        'deleted_at' => null,
        'vat_number' => null,
        'transaction_name' => null,
        'balance' => null,
        'paid_to_date' => null,
        'id_number' => null
    ];
});
