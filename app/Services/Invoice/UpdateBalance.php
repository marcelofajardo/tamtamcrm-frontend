<?php
namespace App\Services\Invoice;

 use App\Invoice;

 class UpdateBalance
 {

     private $invoice;

     public function __construct($invoice)
     {
         $this->invoice = $invoice;
     }


   	public function __invoke($balance_adjustment)
   	{

         if ($this->invoice->is_deleted) {
             return;
         }

         $balance_adjustment = floatval($balance_adjustment);

         $this->invoice->balance += $balance_adjustment;

         if ($this->invoice->balance == 0) {
             $this->status_id = Invoice::STATUS_PAID;
             // $this->save();
             // event(new InvoiceWasPaid($this, $this->account));

         }

         return $this->invoice;
   	}
 } 
