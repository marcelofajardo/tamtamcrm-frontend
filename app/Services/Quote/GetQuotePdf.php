<?php

namespace App\Services\Quote;

use App\Jobs\Invoice\CreateInvoicePdf;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Storage;

class GetQuotePdf extends AbstractService
{
    private $quote;
    private $contact;

    public function __construct($quote, $contact = null)
    {
        $this->quote = $quote;
        $this->contact = $contact;
    }

    public function run()
    {
        if (!$this->contact) {
            $this->contact = $this->quote->customer->primary_contact()->first();
        }

        $path = 'public/' . $this->quote->customer->id . '/quotes/';
        $file_path = $path . $this->quote->number . '.pdf';
        $disk = config('filesystems.default');
        $file = Storage::disk($disk)->exists($file_path);

        if (!$file) {
            $file_path = CreateInvoicePdf::dispatchNow($this, $this->quote->account, $this->contact);
        }

        return Storage::disk($disk)->url($file_path);
    }

}
