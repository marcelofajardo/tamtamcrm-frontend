<?php

use Illuminate\Database\Seeder;
use App\Permission;
use App\Role;

class RoleTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $dev_permission = Permission::where('name', 'create-tasks')->first();
        $manager_permission = Permission::where('name', 'edit-users')->first();

//RoleTableSeeder.php
        $dev_role = new Role();
        $dev_role->name = 'Manager';
        $dev_role->description = 'Front-end Developer';
        $dev_role->save();
        $dev_role->permissions()->attach($manager_permission);

        $manager_role = new Role();
        $manager_role->name = 'Admin';
        $manager_role->description = 'Assistant Manager';
        $manager_role->save();
        $manager_role->permissions()->attach($dev_permission);
    }

}
