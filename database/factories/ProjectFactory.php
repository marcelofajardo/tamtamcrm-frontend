<?php
use Faker\Generator as Faker;
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
use App\Project;
$factory->define(Project::class, function (Faker $faker) {
    $user = factory(\App\User::class)->create();
    return [
        'account_id' => 1,
        'assigned_user_id' => null,
        'user_id' => $user->id,
        'customer_id' => null,
        'title' => $faker->text,
        'description' => $faker->text,
        'is_completed' => 0,
        'customer_id' => null,
        'notes' => null,
        'budgeted_hours' => null,
        'due_date' => null,
        'deleted_at' => null,
        'is_deleted' => 0
    ];
});