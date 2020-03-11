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

namespace App\Factory;

use App\Customer;

class CustomerFactory
{
    public static function create(int $account_id, int $user_id, int $company_id = null): Customer
    {
        $client = new Customer;
        $client->currency_id = 2;
        $client->account_id = $account_id;
        $client->company_id = $company_id;
        $client->user_id = $user_id;
        $client->name = '';
        $client->phone = '';
        $client->balance = 0;
        $client->paid_to_date = 0;
        $client->group_settings_id = null;
        $client->private_notes = '';
        $client->public_notes = '';
        $client->website = '';

        return $client;
    }
}
