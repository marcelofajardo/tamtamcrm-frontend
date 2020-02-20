<?php

namespace App\Factory;

use App\GroupSetting;

class GroupSettingFactory
{
    public static function create(int $account_id, int $user_id): GroupSetting
    {
        $gs = new GroupSetting;
        $gs->name = '';
        $gs->account_id = $account_id;
        $gs->user_id = $user_id;
        $gs->settings = '{}';

        return $gs;
    }
}
