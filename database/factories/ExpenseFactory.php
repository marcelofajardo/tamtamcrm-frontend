<?php

use App\DataMapper\CustomerSettings;
use App\DataMapper\CompanySettings;
use Faker\Generator as Faker;

$factory->define(App\Expense::class, function (Faker $faker) {
    $user = factory(\App\User::class)->create();
    return [
        'amount' => $faker->numberBetween(1,10),
        'account_id' => 1,
        'user_id' => $user->id,
        'custom_value1' => $faker->text(10),
        'custom_value2' => $faker->text(10),
        'custom_value3' => $faker->text(10),
        'custom_value4' => $faker->text(10),
        'exchange_rate' => $faker->randomFloat(2,0,1),
        'expense_date' => $faker->date(),
        'is_deleted' => false,
        'public_notes' => $faker->text(50),
        'private_notes' => $faker->text(50),
        'transaction_reference' => $faker->text(5),
    ];
});
