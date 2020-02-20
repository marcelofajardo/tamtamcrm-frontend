<?php

namespace App\DataMapper;

use App\Customer;
use App\User;
use stdClass;

/**
 * Class DefaultSettings
 * @package App\DataMapper
 */
class DefaultSettings extends BaseSettings
{
    /**
     * @var int
     */
    public static $per_page = 25;

    /**
     * @return stdClass
     *
     * //todo user specific settings / preferences.
     */
    public static function userSettings(): stdClass
    {
        return (object)[//class_basename(User::class) => self::userSettingsObject(),
        ];
    }

    /**
     * @return stdClass
     */
    private static function userSettingsObject(): stdClass
    {

        return (object)[//'per_page' => self::$per_page,
        ];
    }
}
