<?php
namespace App\Jobs\Customer;

use App\Customer;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateClientPaidToDate
{
    use Dispatchable;
    protected $amount;
    protected $client;

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
        $this->client->paid_to_date += $this->amount;
        $this->client->save();
    }
}