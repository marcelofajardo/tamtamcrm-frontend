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

namespace App\Jobs\Customer;

use App\Customer;
use App\Account;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateClientBalance
{
    use Dispatchable;
    protected $amount;
    protected $client;
    protected $account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Customer $client, $amount)
    {
        $this->amount = $amount;
        $this->client = $client;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->client->balance += $this->amount;
        $this->client->save();
    }
}
