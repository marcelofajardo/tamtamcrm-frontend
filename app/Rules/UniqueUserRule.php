<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\User;

class UniqueUserRule implements Rule
{
    public $user;
    public $new_email;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($user, $new_email)
    {
        $this->user = $user;

        $this->new_email = $new_email;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        /* If the input has not changed, return early! */
        if ($this->user->email == $this->new_email) {
            return true;
        } else {
            return !$this->checkIfEmailExists($value);
        } //if it exists, return false!
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

    /**
     * @param $email
     * @return bool
     */
    private function checkIfEmailExists($email): bool
    {
        return User::whereEmail($email)->count() > 0;
    }

}
