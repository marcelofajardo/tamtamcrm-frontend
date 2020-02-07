<?php
namespace App\Jobs\Quote;

 use App\Quote;
use App\Account;
 use App\Payment;
 use App\PaymentMethod;
 use App\Repositories\QuoteRepository;
 use App\Traits\GeneratesCounter;
 use App\Traits\NumberFormatter;
 use Illuminate\Bus\Queueable;
 use Illuminate\Contracts\Queue\ShouldQueue;
 use Illuminate\Foundation\Bus\Dispatchable;
 use Illuminate\Queue\InteractsWithQueue;
 use Illuminate\Queue\SerializesModels;
 use Illuminate\Support\Carbon;

 class ApplyQuoteNumber implements ShouldQueue
 {
     use Dispatchable,
         InteractsWithQueue, 
         Queueable,
         SerializesModels,
         NumberFormatter, 
         GeneratesCounter;

     private $quote;

     private $account;

     private $settings;

     /**
      * Create a new job instance.
      *
      * @return void
      */
     public function __construct(Quote $quote, $settings, Account $account)
     {

         $this->quote = $quote;
         $this->settings = $settings;
         $this->account = $account;
     }

     /**
      * Execute the job.
      *
      * 
      * @return void
      */
     public function handle()
     {
         //return early
         if($this->quote->number != '' || empty($this->settings)) {
             return $this->quote;
         }


         switch ($this->settings->quote_number_applied) {
             case 'when_saved':
                 $this->quote->number = $this->getNextQuoteNumber($this->quote->customer);
                 break;
             case 'when_sent':
                 if($this->quote->status_id == Quote::STATUS_SENT)
                     $this->quote->number = $this->getNextQuoteNumber($this->quote->customer);
                 break;
             
             default:
                 # code...
                 break;
         }
    
         $this->quote->save();
             
         return $this->quote;

     }
 }
