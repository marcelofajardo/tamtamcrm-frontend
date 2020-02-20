<?php

namespace App\Jobs\Order;

use App\Order;
use App\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class InvoiceOrders implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $invoice;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    public function handle()
    {
        if (empty($this->invoice->task_id)) {
            return false;
        }

        $line_items = $this->invoice->line_items;

        foreach ($line_items as $item) {

            $order = Order::whereId($item->order_id)->first();

            if ($order) {
                $order->status = Order::STATUS_INVOICED;
                $order->save();
            }
        }
    }
}
