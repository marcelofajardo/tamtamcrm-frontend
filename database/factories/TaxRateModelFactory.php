
<?php
use App\TaxRate;

$factory->define(TaxRate::class, function (Faker\Generator $faker) {
    
    return [
        'account_id' => 1,
        'name' => $faker->word,
        'rate' => $faker->randomFloat()
    ];
});
