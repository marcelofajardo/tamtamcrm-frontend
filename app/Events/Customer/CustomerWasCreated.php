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

namespace App\Events\Customer;

use App\Customer;
use Illuminate\Queue\SerializesModels;

/**
 * Class CustomerWasCreated.
 */
class CustomerWasCreated
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
