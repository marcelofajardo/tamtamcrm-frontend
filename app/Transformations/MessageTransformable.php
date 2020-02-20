<?php

namespace App\Transformations;

use App\Customer;
use App\User;
use App\Message;

trait MessageTransformable
{

    /**
     *
     * @param \App\Transformations\Message $message
     * @param User $currentUser
     * @return \App\Transformations\Message
     */
    protected function transformMessage(Message $message, User $currentUser, Customer $customer)
    {

        $prop = new Message;
        $author = $message->direction === 1 ? $currentUser->first_name . ' ' .
            $currentUser->last_name : $customer->first_name . ' ' . $customer->last_name;

        $prop->author = $author;
        $prop->avatar = '';
        $prop->message = $message->message;
        $prop->when = $message->created_at;

        return $prop;
    }

}
