<?php

use Illuminate\Database\Seeder;

class SourceTypeSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('source_type')->insert([
            'name' => 'Personal Contact',
        ]);
        
        DB::table('source_type')->insert([
            'name' => 'Call',
        ]);
        
        DB::table('source_type')->insert([
            'name' => 'Email',
        ]);
        
        DB::table('source_type')->insert([
            'name' => 'Other',
        ]);
    }

}
