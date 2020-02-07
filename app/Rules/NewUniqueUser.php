<?php

namespace App\Rules;

use App\User;
use Illuminate\Contracts\Validation\Rule;

class NewUniqueUser implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string $attribute
     * @param  mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return !$this->checkIfEmailExists($value); //if it exists, return false!
    }

    /**
     * @param $email
     * @return bool
     */
    private function checkIfEmailExists($email) : bool
    {

        return User::whereEmail($email)->count() > 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The email address already exists.';
    }
}
