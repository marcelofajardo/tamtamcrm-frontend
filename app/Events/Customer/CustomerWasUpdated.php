<?php
namespace App\Events\Customer;

use App\Customer;
use Illuminate\Queue\SerializesModels;

/**
 * Class CustomerWasUpdated.
 */
class CustomerWasUpdated
{
    use SerializesModels;
    /**
     * @var Customer
     */
    public $customer;

    /**
     * Create a new event instance.
     *
     * @param Customer $customer
     */
    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }
}
