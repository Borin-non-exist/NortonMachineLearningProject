<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PriorillnessSeeder extends Seeder
{
    public function run()
    {
        DB::table('priorillnesses')->insert([
            ['priorillness_name' => 'Blood pressure'],
            ['priorillness_name' => 'Diabetes'],
            ['priorillness_name' => 'Asthma'],
        ]);
    }
}