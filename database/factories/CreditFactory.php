<?php

use App\DataMapper\ClientSettings;
use App\DataMapper\CompanySettings;
use App\Factory\InvoiceItemFactory;
use Faker\Generator as Faker;

$factory->define(App\Credit::class, function (Faker $faker) {
    $customer = factory(\App\Customer::class)->create();
    $user = factory(\App\User::class)->create();

    return [
        'customer_id' => $customer->id,
        'status_id' => App\Credit::STATUS_DRAFT,
        'number' => $faker->ean13(),
        'account_id' => 1,
        'user_id' => $user->id,
        //'discount' => $faker->numberBetween(1,10),
        //'is_amount_discount' => (bool)random_int(0,1),
        'is_deleted' => false,
        //'po_number' => $faker->text(10),
        'date' => $faker->date(),
        'due_date' => $faker->date(),
        'line_items' => InvoiceItemFactory::generateCredit(5),
        'terms' => $faker->text(500),
    ];
});