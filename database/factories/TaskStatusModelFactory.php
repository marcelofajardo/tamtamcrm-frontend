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
use App\TaskStatus;
$factory->define(TaskStatus::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->word,
        'column_color' => $faker->hexColor,
        'task_type' => 1,
        'description' => $faker->sentence,
        'icon' => $faker->word
    ];
});