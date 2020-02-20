<?php

namespace App\DataMapper;

use Parsedown;

class EmailTemplateDefaults
{
    public static function emailInvoiceSubject()
    {
        return trans('texts.invoice_subject', ['number' => '$number', 'account' => '$company.name']);
    }

    public static function emailInvoiceTemplate()
    {
        return Parsedown::instance()->line(self::transformText('invoice_message'));
    }

    public static function emailQuoteSubject()
    {
        return trans('texts.quote_subject', ['number' => '$number', 'account' => '$company.name']);
    }

    public static function emailQuoteTemplate()
    {
        return Parsedown::instance()->line(self::transformText('To view your invoice for $amount'));
    }

    public static function emailPaymentSubject()
    {
        return trans('texts.payment_subject');
    }

    public static function emailPaymentTemplate()
    {
        return Parsedown::instance()->line(self::transformText('payment_message'));
    }

    public static function emailReminder1Subject()
    {
        return Parsedown::instance()->line(self::transformText('Reminder Invoice $invoice from $account'));
    }

    public static function emailReminder1Template()
    {
        return Parsedown::instance()->line('First Email Reminder Text');
    }

    public static function emailReminder2Subject()
    {
        return trans('texts.reminder_subject', ['invoice' => '$invoice.number', 'account' => '$company.name']);
    }

    public static function emailReminder2Template()
    {
        return Parsedown::instance()->line('Reminder Text');
    }

    public static function emailReminder3Subject()
    {
        return Parsedown::instance()->line(self::transformText('Reminder Invoice $invoice from $account'));
    }

    public static function emailReminder3Template()
    {
        return Parsedown::instance()->line('Third Email Reminder Text');
    }

    public static function emailReminderEndlessSubject()
    {
        return Parsedown::instance()->line(self::transformText('reminder_subject'));
    }

    public static function emailReminderEndlessTemplate()
    {
        return Parsedown::instance()->line('Endless Email Reminder Text');
    }

    public static function emailStatementSubject()
    {
        return Parsedown::instance()->line('Statement Subject needs texts record!');
    }

    public static function emailStatementTemplate()
    {
        return Parsedown::instance()->line('Statement Templates needs texts record!');
    }

    private static function transformText($string)
    {
        return str_replace(":", "$", $string);
    }
}
