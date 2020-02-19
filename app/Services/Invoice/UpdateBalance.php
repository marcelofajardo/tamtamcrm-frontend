<?php
namespace App\Services\Invoice;

 use App\Invoice;
 use App\Services\AbstractService;

 class UpdateBalance extends AbstractService
 {
     private $invoice;
     private $balance_adjustment;

     public function __construct($invoice, $balance_adjustment)
     {
         $this->invoice = $invoice;
         $this->balance_adjustment = $balance_adjustment;
     }


   	public function run()
   	{

         if ($this->invoice->is_deleted) {
             return;
         }

         $balance_adjustment = floatval($this->balance_adjustment);

         $this->invoice->balance += $balance_adjustment;

         if ($this->invoice->balance == 0) {
             $this->invoice->status_id = Invoice::STATUS_PAID;
             // $this->save();
             // event(new InvoiceWasPaid($this, $this->account));

         }

         return $this->invoice;
   	}
 }
