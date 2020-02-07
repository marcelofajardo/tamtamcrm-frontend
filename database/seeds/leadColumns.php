<?php

use Illuminate\Database\Seeder;

class leadColumns extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('task_statuses')->insert([
            'title' => 'Unassigned',
            'description' => 'Description 1',
            'icon' => 'fa-bars',
            'is_active' => 1,
             'task_type' => 2,
                ]
        );

        DB::table('task_statuses')->insert([
            'title' => 'Partner Leads',
            'description' => 'Description 2',
            'icon' => 'fa-lightbulb',
            'is_active' => 1,
             'task_type' => 2,
                ]
        );

        DB::table('task_statuses')->insert([
            'title' => 'Responsible Assigned',
            'description' => 'Description 3',
            'icon' => 'fa-spinner',
            'is_active' => 1,
            'task_type' => 2,
                ]
        );

        DB::table('task_statuses')->insert([
            'title' => 'Waiting For Details',
            'description' => 'Description 4',
            'icon' => 'fa-check',
            'is_active' => 1,
             'task_type' => 2,
                ]
        );
    }

}
