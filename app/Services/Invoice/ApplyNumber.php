<?php

namespace App\Services\Invoice;

use App\Invoice;
use App\Services\AbstractService;
use App\Traits\GeneratesCounter;

class ApplyNumber extends AbstractService
{
    use GeneratesCounter;

    private $customer;
    private $invoice;

    public function __construct($customer, $invoice)
    {
        $this->customer = $customer;
        $this->invoice = $invoice;
    }

    public function run()
    {
        if ($this->invoice->number != '') {
            return $this->invoice;
        }

        switch ($this->customer->getSetting('counter_number_applied')) {
            case 'when_saved':
                $this->invoice->number = $this->getNextInvoiceNumber($this->customer);
                break;
            case 'when_sent':
                if ($this->invoice->status_id == Invoice::STATUS_SENT) {
                    $this->invoice->number = $this->getNextInvoiceNumber($this->customer);
                }
                break;

            default:
                # code...
                break;
        }

        return $this->invoice;
    }
}
