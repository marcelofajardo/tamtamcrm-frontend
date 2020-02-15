<?php

namespace App\Services\Quote;

use App\Jobs\Invoice\CreateInvoicePdf;
use Illuminate\Support\Facades\Storage;

class GetQuotePdf
{

    public function __construct()
    {
    }

    public function __invoke($quote, $contact = null)
    {
        if (!$contact) {
            $contact = $quote->customer->primary_contact()->first();
        }

        $path = 'public/' . $quote->customer->id . '/quotes/';
        $file_path = $path . $quote->number . '.pdf';
        $disk = config('filesystems.default');
        $file = Storage::disk($disk)->exists($file_path);

        if (!$file) {
            $file_path = CreateInvoicePdf::dispatchNow($this, $quote->account, $contact);
        }

        return Storage::disk($disk)->url($file_path);
    }

}
