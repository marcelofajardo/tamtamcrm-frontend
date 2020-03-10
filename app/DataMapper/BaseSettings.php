<?php
/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

namespace App\DataMapper;

class BaseSettings
{
    public function __construct($obj)
    {
        $this->buildObject($obj);
    }

    private function buildObject($obj)
    {
        foreach ($obj as $key => $value) {
            $obj->{$key} = $value;
        }
    }

    public static function setCasts($obj, $casts)
    {
        foreach ($casts as $key => $value) {
            $obj->{$key} = self::castAttribute($key, $obj->{$key});
        }
        return $obj;
    }

    public static function castAttribute($key, $value)
    {
        switch ($key) {
            case 'int':
            case 'integer':
                return (int)$value;
            case 'real':
            case 'float':
            case 'double':
                return (float)$value;
            case 'string':
                return is_null($value) ? '' : (string)$value;
            case 'bool':
            case 'boolean':
                return (bool)($value);
            case 'object':
                return json_decode($value);
            case 'array':
            case 'json':
                return json_decode($value, true);
            default:
                return $value;
        }
    }
}
