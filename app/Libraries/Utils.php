<?php

namespace App\Libraries;

use DateTime;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Utilities
 *
 * @author michael.hampton
 */
class Utils
{

    public static function logError($error, $context = 'PHP', $info = false)
    {
        if ($error instanceof Exception) {
            $error = self::getErrorString($error);
        }

        $data = static::prepareErrorData($context);
        if ($info) {
            Log::info($error . "\n", $data);
        } else {
            Log::error($error . "\n", $data);
        }
    }

    public static function prepareErrorData($context)
    {
        $data = [
            'context' => $context,
            'user_id' => Auth::check() ? Auth::user()->id : 0,
            'account_id' => Auth::check() ? Auth::user()->account_id : 0,
            'user_name' => Auth::check() ? Auth::user()->getDisplayName() : '',
            'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '',
            'db_server' => config('database.default'),
        ];

        $data['url'] = request()->path();

        return $data;
    }

    public static function calculateTaxes($amount, $taxRate1, $taxRate2)
    {
        $tax1 = round($amount * $taxRate1 / 100, 2);
        $tax2 = round($amount * $taxRate2 / 100, 2);
        return round($tax1 + $tax2, 2);
    }

    public static function toSqlDate($date, $formatResult = true)
    {
        if (!$date) {
            return;
        }
        $format = "Y-m-d";
        $dateTime = DateTime::createFromFormat($format, $date);
        if (!$dateTime) {
            return $date;
        } else {
            return $formatResult ? $dateTime->format('Y-m-d') : $dateTime;
        }
    }

    public static function roundSignificant($value, $precision = 2)
    {
        if (round($value, 3) != $value) {
            $precision = 4;
        } elseif (round($value, 2) != $value) {
            $precision = 3;
        } elseif (round($value, 1) != $value) {
            $precision = 2;
        }
        return number_format($value, $precision, '.', '');
    }

    public static function truncateString($string, $length)
    {
        return strlen($string) > $length ? rtrim(substr($string, 0, $length)) . '...' : $string;
    }

    // http://stackoverflow.com/a/14238078/497368
    public static function isInterlaced($filename)
    {
        $handle = fopen($filename, 'r');
        $contents = fread($handle, 32);
        fclose($handle);
        return (ord($contents[28]) != 0);
    }

    //Source: https://stackoverflow.com/questions/3302857/algorithm-to-get-the-excel-like-column-name-of-a-number
    public static function num2alpha($n)
    {
        for ($r = ""; $n >= 0; $n = intval($n / 26) - 1) {
            $r = chr($n % 26 + 0x41) . $r;
        }
        return $r;
    }

    public static function parseFloat($value)
    {
        // check for comma as decimal separator
        if (preg_match('/,[\d]{1,2}$/', $value)) {
            $value = str_replace(',', '.', $value);
        }
        $value = preg_replace('/[^0-9\.\-]/', '', $value);
        return floatval($value);
    }

    public static function toArray($data)
    {
        return json_decode(json_encode((array)$data), true);
    }

    public static function toSpaceCase($string)
    {
        return preg_replace('/([a-z])([A-Z])/s', '$1 $2', $string);
    }

    public static function toSnakeCase($string)
    {
        return preg_replace('/([a-z])([A-Z])/s', '$1_$2', $string);
    }

    public static function toCamelCase($string)
    {
        return lcfirst(static::toClassCase($string));
    }

    public static function toClassCase($string)
    {
        return str_replace(' ', '', ucwords(str_replace('_', ' ', $string)));
    }

    public static function timestampToDateTimeString($timestamp)
    {
        return self::timestampToString($timestamp, 'Europe/London', 'Y-m-d H:i:s');
    }

    public static function timestampToDateString($timestamp)
    {
        $timezone = Session::get(SESSION_TIMEZONE, DEFAULT_TIMEZONE);
        $format = Session::get(SESSION_DATE_FORMAT, DEFAULT_DATE_FORMAT);
        return self::timestampToString($timestamp, $timezone, $format);
    }

    public static function dateToString($date)
    {
        if (!$date) {
            return false;
        }
        if ($date instanceof DateTime) {
            $dateTime = $date;
        } else {
            $dateTime = new DateTime($date);
        }
        $timestamp = $dateTime->getTimestamp();
        $format = Session::get(SESSION_DATE_FORMAT, DEFAULT_DATE_FORMAT);
        return self::timestampToString($timestamp, false, $format);
    }

    public static function timestampToString($timestamp, $timezone, $format)
    {
        if (!$timestamp) {
            return '';
        }
        $date = Carbon::createFromTimeStamp($timestamp);
        if ($timezone) {
            $date->tz = $timezone;
        }
        if ($date->year < 1900) {
            return '';
        }

        return $date->format($format);
    }

    public static function fromSqlDate($date, $formatResult = true)
    {
        if (!$date || $date == '0000-00-00') {
            return '';
        }
        $format = Session::get(SESSION_DATE_FORMAT, DEFAULT_DATE_FORMAT);
        $dateTime = DateTime::createFromFormat('Y-m-d', $date);
        if (!$dateTime) {
            return $date;
        } else {
            return $formatResult ? $dateTime->format($format) : $dateTime;
        }
    }

    public static function fromSqlDateTime($date, $formatResult = true)
    {
        if (!$date || $date == '0000-00-00 00:00:00') {
            return '';
        }
        $timezone = Session::get(SESSION_TIMEZONE, DEFAULT_TIMEZONE);
        $format = Session::get(SESSION_DATETIME_FORMAT, DEFAULT_DATETIME_FORMAT);
        $dateTime = DateTime::createFromFormat('Y-m-d H:i:s', $date);
        $dateTime->setTimeZone(new DateTimeZone($timezone));
        return $formatResult ? $dateTime->format($format) : $dateTime;
    }

    public static function formatTime($t)
    {
        // http://stackoverflow.com/a/3172665
        $f = ':';
        return sprintf('%02d%s%02d%s%02d', floor($t / 3600), $f, ($t / 60) % 60, $f, $t % 60);
    }

    public static function today($formatResult = true)
    {
        $timezone = Session::get(SESSION_TIMEZONE, DEFAULT_TIMEZONE);
        $format = Session::get(SESSION_DATE_FORMAT, DEFAULT_DATE_FORMAT);
        $date = date_create(null, new DateTimeZone($timezone));
        if ($formatResult) {
            return $date->format($format);
        } else {
            return $date;
        }
    }

    private static function getQuarter($offset)
    {
        $month = intval(date('n')) - 1;
        $quarter = floor(($month + 3) / 3);
        $quarter += $offset;
        $quarter = $quarter % 4;
        if ($quarter == 0) {
            $quarter = 4;
        }
        return 'Q' . $quarter;
    }

    private static function getYear($offset)
    {
        $year = intval(date('Y'));
        return $year + $offset;
    }

}
