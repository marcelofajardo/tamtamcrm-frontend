<?php

namespace App\Jobs\Utils;

use App\Traits\BulkOptions;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UnlinkFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $file_path;

    protected $disk;

    public function __construct(string $disk, string $file_path)
    {
        $this->file_path = $file_path;
        $this->disk = $disk;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        Storage::disk($this->disk)->delete($this->file_path);

    }
}
