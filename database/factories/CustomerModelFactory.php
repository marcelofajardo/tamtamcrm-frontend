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
use App\Customer;
use App\Company;
use App\Account;
use App\User;

$factory->define(Customer::class, function (Faker\Generator $faker) {

    $company = factory(Company::class)->create();
    $user = factory(User::class)->create();
    //$account = factory(Account::class)->create();

    return [
        'settings' => \App\DataMapper\CustomerSettings::defaults(),
        'account_id' => 1,
        'customer_type' => 1,
        'user_id' => $user->id,
        'phone' => $faker->phoneNumber,
        'company_id' => $company->id,
        'job_title' => $faker->jobTitle,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'status' => 1
    ];
});
