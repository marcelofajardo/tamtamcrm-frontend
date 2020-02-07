<?php
namespace App\Factory;

use App\User;

class UserFactory
{
    public function create() :User
    {
        $user = new User;
        $user->first_name = '';
        $user->last_name = '';
        $user->phone_number = '';
        $user->username = '';
        $user->email = '';
        $user->gender = '';
        $user->dob = null;
        $user->job_description = '';
        $user->is_active = 1;

        return $user;
    }
}