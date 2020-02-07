<?php


namespace App\Factory;


use App\Notification;

class NotificationFactory
{
    /**
     * @param int $account_id
     * @param int $user_id
     * @return Notification
     */
    public static function create(int $account_id, int $user_id) :Notification
    {
        $notification = new Notification();
        $notification->type = '';
        $notification->notifiable_type = 'App\User';
        $notification->notifiable_id = $user_id;
        $notification->account_id = $account_id;
        $notification->data = [];
        return $notification;
    }
}
