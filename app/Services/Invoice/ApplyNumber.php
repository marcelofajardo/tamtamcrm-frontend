<?php
namespace App\Services\Invoice;

 use App\Events\Payment\PaymentWasCreated;
 use App\Factory\PaymentFactory;
 use App\Jobs\Customer\UpdateCustomerBalance;
 use App\Jobs\Customer\UpdateCustomerPaidToDate;
 use App\Jobs\Company\UpdateCompanyLedgerWithPayment;
 use App\Models\Invoice;
 use App\Models\Payment;
 use App\Services\Customer\CustomerService;
 use App\Services\Payment\PaymentService;
 use App\Traits\GeneratesCounter;

 class ApplyNumber
 {
 	use GeneratesCounter;

     private $customer;

     public function __construct($customer)
     {
         $this->customer = $customer;
     }

   	public function run($invoice)
   	{

         if ($invoice->number != '') 
             return $invoice;

         switch ($this->customer->getSetting('counter_number_applied')) {
             case 'when_saved':
                 $invoice->number = $this->getNextInvoiceNumber($this->customer);
                 break;
             case 'when_sent':
                 if ($invoice->status_id == Invoice::STATUS_SENT) {
                     $invoice->number = $this->getNextInvoiceNumber($this->customer);
                 }
                 break;

             default:
                 # code...
                 break;
         }

         return $invoice;
   	}
 } 
