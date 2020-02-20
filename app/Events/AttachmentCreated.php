<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 31/01/2020
 * Time: 19:45
 */

namespace App\Events;


class AttachmentCreated
{
    private $user;
    private $account;
    private $file;

    public function __construct($user, $account, $file)
    {
        $this->user = $user;
        $this->account = $account;
        $this->file = $file;
    }

}
