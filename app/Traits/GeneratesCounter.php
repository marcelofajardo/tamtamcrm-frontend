<?php
namespace App\Traits;

use App\Customer;
use App\Credit;
use App\Invoice;
use App\Quote;
use App\Payment;
use App\RecurringInvoice;
use App\RecurringQuote;
use Illuminate\Support\Carbon;

/**
 * Class GeneratesCounter
 * @package App\Utils\Traits
 */
trait GeneratesCounter
{
//todo in the form validation, we need to ensure that if a prefix and pattern is set we throw a validation error,
//only one type is allow else this will cause confusion to the end user
    /**
     * Gets the next invoice number.
     * @param Customer $customer
     * @return string
     * @throws \Exception
     */
    public function getNextInvoiceNumber(Customer $customer) : string
    {
        //Reset counters if enabled
        $this->resetCounters($customer);

        //todo handle if we have specific client patterns in the future
        $pattern = trim($customer->getSetting('invoice_number_pattern'));

        //Determine if we are using client_counters
        if (strpos($pattern, 'clientCounter')) {
            $counter = $customer->getSetting('invoice_number_counter');
            $counter_entity = $customer;
        } elseif (strpos($pattern, 'groupCounter')) {
            $counter = $customer->group_settings->invoice_number_counter;
            $counter_entity = $customer->group_settings;
        } else {
            $counter = $customer->account->settings->invoice_number_counter;
            $counter_entity = $customer->account;
        }

        //Return a valid counter
        $pattern = $customer->getSetting('invoice_number_pattern');
        $padding = $customer->getSetting('counter_padding');

        $invoice_number = $this->checkEntityNumber(Invoice::class, $customer, $counter, $padding, $pattern);
        $this->incrementCounter($counter_entity, 'invoice_number_counter');
        return $invoice_number;
    }

    /**
     *  Gets the next invoice number.
     * @param Customer $customer
     * @return string
     * @throws \Exception
     */
    public function getNextQuoteNumber(Customer $customer) : string
    {
        //Reset counters if enabled
        $this->resetCounters($customer);

        $used_counter = 'quote_number_counter';

        if ($this->hasSharedCounter($customer)) {
            $used_counter = 'invoice_number_counter';
        }

        //todo handle if we have specific client patterns in the future
        $pattern = trim($customer->getSetting('quote_number_pattern'));

        //Determine if we are using client_counters
        if (strpos($pattern, 'clientCounter')) {
            $counter = $customer->getSetting($used_counter);
            $counter_entity = $customer;
        } elseif (strpos($pattern, 'groupCounter')) {
            $counter = $customer->group_settings->{$used_counter};
            $counter_entity = $customer->group_settings;
        } else {
            $counter = $customer->account->settings->{$used_counter};
            $counter_entity = $customer->account;
        }

        //Return a valid counter
        $pattern = $customer->getSetting('quote_number_pattern');
        $padding = $customer->getSetting('counter_padding');
        $quote_number = $this->checkEntityNumber(Quote::class, $customer, $counter, $padding, $pattern);

        $this->incrementCounter($counter_entity, $used_counter);

        return $quote_number;

    }


    /**
     * Gets the next credit number.
     * @param Customer $customer
     * @return string
     * @throws \Exception
     */
    public function getNextCreditNumber(Customer $customer) :string
    {
        //Reset counters if enabled
        $this->resetCounters($customer);

        //todo handle if we have specific client patterns in the future
        $pattern = $customer->getSetting('credit_number_pattern');
        //Determine if we are using client_counters
        if (strpos($pattern, 'clientCounter')) {
            $counter = $customer->settings->credit_number_counter;
            $counter_entity = $customer;
        } elseif (strpos($pattern, 'groupCounter')) {
            $counter = $customer->group_settings->credit_number_counter;
            $counter_entity = $customer->group_settings;
        } else {
            $counter = $customer->account->settings->credit_number_counter;
            $counter_entity = $customer->account;
        }

        //Return a valid counter
        $pattern = $customer->getSetting('credit_number_pattern');
        $padding = $customer->getSetting('counter_padding');

        $credit_number = $this->checkEntityNumber(Credit::class, $customer, $counter, $padding, $pattern);

        $this->incrementCounter($customer->account, 'credit_number_counter');

        return $credit_number;
    }

    /**
     * @param Customer $client
     * @return int|string
     * @throws \Exception
     */
    public function getNextRecurringInvoiceNumber(Customer $customer)
    {
        //Reset counters if enabled
        $this->resetCounters($customer);
        $is_client_counter = false;
        //todo handle if we have specific client patterns in the future
        $pattern = $customer->account->settings->invoice_number_pattern;
        //Determine if we are using client_counters
        if (strpos($pattern, 'client_counter') === false) {
            $counter = $customer->account->settings->recurring_invoice_number_counter;
        } else {
            $counter = $customer->settings->recurring_invoice_number_counter;
            $is_client_counter = true;
        }
        //Return a valid counter
        $pattern = '';
        $padding = $customer->getSetting('counter_padding');
        $invoice_number = $this->checkEntityNumber(RecurringInvoice::class, $customer, $counter, $padding, $pattern);
        $invoice_number = $this->prefixCounter($invoice_number, $customer->getSetting('recurring_number_prefix'));
        //increment the correct invoice_number Counter (company vs client)
        if ($is_client_counter) {
            $this->incrementCounter($customer, 'recurring_invoice_number_counter');
        } else {
            $this->incrementCounter($customer->account, 'recurring_invoice_number_counter');
        }
        return $invoice_number;
    }

    /**
     * Gets the next quote number.
     * @param Customer $customer
     * @return string
     * @throws \Exception
     */
    public function getNextRecurringQuoteNumber(Customer $customer) : string
    {
        //Reset counters if enabled
        $this->resetCounters($customer);

        $used_counter = 'recurring_quote_number_counter';

        if ($this->hasSharedCounter($customer)) {
            $used_counter = 'recurring_quote_number_counter';
        }

        //todo handle if we have specific client patterns in the future
        $pattern = trim($customer->getSetting('quote_number_pattern'));

        //Determine if we are using client_counters
        if (strpos($pattern, 'clientCounter')) {
            $counter = $customer->getSetting($used_counter);
            $counter_entity = $customer;
        } elseif (strpos($pattern, 'groupCounter')) {
            $counter = $customer->group_settings->{$used_counter};
            $counter_entity = $customer->group_settings;
        } else {
            $counter = $customer->account->settings->{$used_counter};
            $counter_entity = $customer->account;
        }

        //Return a valid counter
        $pattern = $customer->getSetting('quote_number_pattern');
        $padding = $customer->getSetting('counter_padding');
        $quote_number = $this->checkEntityNumber(RecurringQuote::class, $customer, $counter, $padding, $pattern);

        $this->incrementCounter($counter_entity, $used_counter);

        return $quote_number;

    }

    /**
     * @param Customer $customer
     * @return string
     * @throws \Exception
     */
    public function getNextPaymentNumber(Customer $customer) :string
    {
        //Reset counters if enabled
        $this->resetCounters($customer);
        $is_client_counter = false;
        //todo handle if we have specific client patterns in the future
        $pattern = $customer->account->settings->payment_number_pattern;
        //Determine if we are using client_counters
        if (strpos($pattern, 'client_counter') === false) {
            $counter = $customer->account->settings->payment_number_counter;
        } else {
            $counter = $customer->settings->payment_number_counter;
            $is_client_counter = true;
        }
        //Return a valid counter
        $pattern = '';
        $padding = $customer->getSetting('counter_padding');
        $payment_number = $this->checkEntityNumber(Payment::class, $customer, $counter, $padding, $pattern);
        //increment the correct invoice_number Counter (company vs client)
        if ($is_client_counter) {
            $this->incrementCounter($customer, 'payment_number_counter');
        } else {
            $this->incrementCounter($customer->account, 'payment_number_counter');
        }
        return (string)$payment_number;
    }

    /**
     * Gets the next client number.
     *
     * @param      \App\Models\Client  $client  The client
     *
     * @return     string              The next client number.
     */
    public function getNextClientNumber(Customer $client) :string
    {
        //Reset counters if enabled
        $this->resetCounters($client);

        $counter = $client->getSetting('client_number_counter');
        $setting_entity = $client->getSettingEntity('client_number_counter');

        $client_number = $this->checkEntityNumber(Customer::class, $client, $counter, $client->getSetting('counter_padding'), $client->getSetting('client_number_pattern'));

        $this->incrementCounter($setting_entity, 'client_number_counter');

        return $client_number;
    }

    /**
     * Checks that the number has not already been used
     * @param $class
     * @param $customer
     * @param $counter
     * @param $padding
     * @param $pattern
     * @return int|string
     */
    private function checkEntityNumber($class, $customer, $counter, $padding, $pattern)
    {
        $check = false;
        do {
            $number = $this->padCounter($counter, $padding);
            $number = $this->applyNumberPattern($customer, $number, $pattern);

            if ($class == Invoice::class || $class == RecurringInvoice::class) {
                $check = $class::whereAccountId($customer->account_id)->whereNumber($number)->withTrashed()->first();
            } elseif ($class == Customer::class) {
                $check = $class::whereAccountId($customer->account_id)->whereIdNumber($number)->withTrashed()->first();
            } elseif ($class == Credit::class) {
                $check = $class::whereAccountId($customer->account_id)->whereNumber($number)->withTrashed()->first();
            } elseif ($class == Quote::class) {
                $check = $class::whereAccountId($customer->account_id)->whereNumber($number)->withTrashed()->first();
            } elseif ($class == Payment::class) {
                $check = $class::whereAccountId($customer->account_id)->whereNumber($number)->withTrashed()->first();
            } elseif ($class == RecurringInvoice::class) {
                $check = $class::whereAccountId($customer->account_id)->whereNumber($number)->withTrashed()->first();
            } elseif ($class == RecurringQuote::class) {
                $check = $class::whereAccountId($customer->account_id)->whereNumber($number)->withTrashed()->first();
            }
            $counter++;
        } while ($check);
        return $number;
    }


    /**
     *  Saves counters at both the account and customer level
     * @param $entity
     * @param string $counter_name
     */
    private function incrementCounter($entity, string $counter_name) :void
    {
        $settings = $entity->settings;
        $settings->{$counter_name} = $settings->{$counter_name} + 1;
        $entity->settings = $settings;
        $entity->save();
    }

    private function prefixCounter($counter, $prefix) : string
    {
        if (strlen($prefix) == 0) {
            return $counter;
        }
        return $prefix . $counter;
    }

    /**
     * Pads a number with leading 000000's
     *
     * @param      int $counter The counter
     * @param      int $padding The padding
     *
     * @return     int  the padded counter
     */
    private function padCounter($counter, $padding) :string
    {
        return str_pad($counter, $padding, '0', STR_PAD_LEFT);
    }

    /**
     * If we are using counter reset,
     * check if we need to reset here
     * @param Customer $client
     * @return bool
     * @throws \Exception
     */
    private function resetCounters(Customer $client)
    {
        $reset_date = Carbon::parse($client->getSetting('reset_counter_date'));
        if (!$reset_date->isToday() || !$client->getSetting('reset_counter_date')) {
            return false;
        }
        switch ($client->company->reset_counter_frequency_id) {
            case RecurringInvoice::FREQUENCY_WEEKLY:
                $reset_date->addWeek();
                break;
            case RecurringInvoice::FREQUENCY_TWO_WEEKS:
                $reset_date->addWeeks(2);
                break;
            case RecurringInvoice::FREQUENCY_FOUR_WEEKS:
                $reset_date->addWeeks(4);
                break;
            case RecurringInvoice::FREQUENCY_MONTHLY:
                $reset_date->addMonth();
                break;
            case RecurringInvoice::FREQUENCY_TWO_MONTHS:
                $reset_date->addMonths(2);
                break;
            case RecurringInvoice::FREQUENCY_THREE_MONTHS:
                $reset_date->addMonths(3);
                break;
            case RecurringInvoice::FREQUENCY_FOUR_MONTHS:
                $reset_date->addMonths(4);
                break;
            case RecurringInvoice::FREQUENCY_SIX_MONTHS:
                $reset_date->addMonths(6);
                break;
            case RecurringInvoice::FREQUENCY_ANNUALLY:
                $reset_date->addYear();
                break;
            case RecurringInvoice::FREQUENCY_TWO_YEARS:
                $reset_date->addYears(2);
                break;
        }
        $settings = $client->company->settings;
        $settings->reset_counter_date = $reset_date->format($client->date_format());
        $settings->invoice_number_counter = 1;
        $settings->quote_number_counter = 1;
        $settings->credit_number_counter = 1;
        $client->company->settings = $settings;
        $client->company->save();
    }

    /**
     * { function_description }
     *
     * @param      \App\Models\Client $client The client
     * @param      string $counter The counter
     * @param      null|string $pattern The pattern
     *
     * @return     string              ( description_of_the_return_value )
     */
    private function applyNumberPattern(Customer $customer, string $counter, $pattern) :string
    {

        if (!$pattern) {
            return $counter;
        }
        $search = ['{$year}'];
        $replace = [date('Y')];
        $search[] = '{$counter}';
        $replace[] = $counter;
        $search[] = '{$clientCounter}';
        $replace[] = $counter;
        $search[] = '{$groupCounter}';
        $replace[] = $counter;
        if (strstr($pattern, '{$user_id}')) {
            $user_id = $customer->user_id ? $customer->user_id : 0;
            $search[] = '{$user_id}';
            $replace[] = str_pad(($user_id), 2, '0', STR_PAD_LEFT);
        }
        $matches = false;
        preg_match('/{\$date:(.*?)}/', $pattern, $matches);
        if (count($matches) > 1) {
            $format = $matches[1];
            $search[] = $matches[0];
            /* The following adjusts for the company timezone - may bork tests depending on the time of day the tests are run!!!!!!*/
            $date = Carbon::now($customer->account->timezone()->name)->format($format);
            $replace[] = str_replace($format, $date, $matches[1]);
        }
        $search[] = '{$custom1}';
        $replace[] = $customer->custom_value1;
        $search[] = '{$custom2}';
        $replace[] = $customer->custom_value2;
        $search[] = '{$custom3}';
        $replace[] = $customer->custom_value3;
        $search[] = '{$custom4}';
        $replace[] = $customer->custom_value4;
        $search[] = '{$id_number}';
        $replace[] = $customer->id_number;

        return str_replace($search, $replace, $pattern);
    }

    /**
     *  Determines if it has shared counter.
     * @param Customer $customer
     * @return bool
     * @throws \Exception
     */
    public function hasSharedCounter(Customer $customer) : bool
    {
        return (bool)$customer->getSetting('shared_invoice_quote_counter');
    }
}
