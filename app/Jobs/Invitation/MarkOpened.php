<?php

namespace App\Jobs\Invitation;

use App\Invoice;
use App\Payment;
use App\Repositories\InvoiceRepository;
use App\Traits\NumberFormatter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

//todo - ensure we are MultiDB Aware in dispatched jobs
class MarkOpened implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, NumberFormatter;
    public $message_id;
    public $entity;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $message_id, string $entity)
    {
        $this->message_id = $message_id;
        $this->entity = $entity;
    }

    /**
     * Execute the job.
     *
     *
     * @return void
     */
    public function handle()
    {
        $invitation = $this->entity::with('user', 'customer')->whereMessageId($this->message_id)->first();
        if (!$invitation) {
            return false;
        }
        $invitation->opened_date = now();
        $invitation->save();
    }
}
