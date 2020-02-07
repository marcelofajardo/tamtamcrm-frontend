<?php

 namespace App\Jobs\Product;

 use App\Account;
 use App\Payment;
 use App\Product;
 use App\Repositories\InvoiceRepository;
 use Illuminate\Bus\Queueable;
 use Illuminate\Contracts\Queue\ShouldQueue;
 use Illuminate\Database\Capsule\Eloquent;
 use Illuminate\Foundation\Bus\Dispatchable;
 use Illuminate\Queue\InteractsWithQueue;
 use Illuminate\Queue\SerializesModels;

 class UpdateOrCreateProduct implements ShouldQueue
 {
     use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

     private $products;

     private $invoice;

     /**
      * Create a new job instance.
      *
      * @return void
      */
     public function __construct($products, $invoice)
     {

         $this->products = $products;
         $this->invoice = $invoice;

     }

     /**
      * Execute the job.
      *
      * 
      * @return void
      */
     public function handle()
     {

         foreach($this->products as $item)
         {

             $product = Product::firstOrNew(['id' => $item->product_id, 'account_id' => $this->invoice->account->id]);

             //$product->product_key = $item->product_key;
             $product->notes = isset($item->notes) ? $item->notes : '';
             $product->cost = isset($item->unit_price) ? $item->unit_price : 0;
             $product->price = isset($item->unit_price) ? $item->unit_price : 0;
             $product->quantity = isset($item->quantity) ? $item->quantity : 0;
             $product->custom_value1 = isset($item->custom_value1) ? $item->custom_value1 : '';
             $product->custom_value2 = isset($item->custom_value2) ? $item->custom_value2 : '';
             $product->custom_value3 = isset($item->custom_value3) ? $item->custom_value3 : '';
             $product->custom_value4 = isset($item->custom_value4) ? $item->custom_value4 : '';  
             $product->user_id = $this->invoice->user_id;
             $product->account_id = $this->invoice->account_id;
             //$product->task_id = $this->invoice->task_id;
             $product->account_id = $this->invoice->account_id;
             $product->save();
                 
         }

     }

 }
