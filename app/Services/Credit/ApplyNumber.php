<?php

namespace App\Services\Credit;

use App\Credit;
use App\Customer;
use App\Events\Payment\PaymentWasCreated;
use App\Factory\PaymentFactory;
use App\Jobs\Customer\UpdateCustomerBalance;
use App\Jobs\Customer\UpdateCustomerPaidToDate;
use App\Jobs\Company\UpdateCompanyLedgerWithPayment;
use App\Models\Invoice;
use App\Models\Payment;
use App\Services\AbstractService;
use App\Services\Customer\CustomerService;
use App\Services\Payment\PaymentService;
use App\Traits\GeneratesCounter;

class ApplyNumber extends AbstractService
{
    use GeneratesCounter;

    private $customer;
    private $credit;

    public function __construct(Customer $customer, Credit $credit)
    {
        $this->customer = $customer;
        $this->credit = $credit;
    }

    public function run()
    {
        if ($this->credit->number != '') {
            return $this->credit;
        }

        $this->credit->number = $this->getNextCreditNumber($this->customer);


        return $this->credit;
    }
}
