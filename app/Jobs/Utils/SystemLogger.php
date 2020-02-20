<?php

namespace App\Jobs\Utils;

use App\Customer;
use App\SystemLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

class SystemLogger implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $log;

    protected $category_id;

    protected $event_id;

    protected $type_id;

    protected $client;

    public function __construct($log, $category_id, $event_id, $type_id, Customer $client)
    {
        $this->log = $log;
        $this->category_id = $category_id;
        $this->event_id = $event_id;
        $this->type_id = $type_id;
        $this->client = $client;
    }

    public function handle(): void
    {
        $sl = [
            'customer_id' => $this->client->id,
            'account_id' => $this->client->account->id,
            'user_id' => $this->client->user_id,
            'log' => $this->log,
            'category_id' => $this->category_id,
            'event_id' => $this->event_id,
            'type_id' => $this->type_id,
        ];

        SystemLog::create($sl);
    }
}
