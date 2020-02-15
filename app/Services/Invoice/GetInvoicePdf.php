<?php

namespace App\Services\Invoice;

use App\Jobs\Invoice\CreateInvoicePdf;
use Illuminate\Support\Facades\Storage;

class GetInvoicePdf
{

    public function __construct()
    {
    }

    public function __invoke($invoice, $contact = null)
    {
        if (!$contact) {
            $contact = $invoice->customer->primary_contact()->first();
        }

        $path      = $invoice->customer->invoice_filepath();
        $file_path = $path . $invoice->number . '.pdf';
        $disk = config('filesystems.default');
        $file = Storage::disk($disk)->exists($file_path);

        if (!$file) {
            $file_path = CreateInvoicePdf::dispatchNow($invoice, $invoice->account, $contact);
        }

        return Storage::disk($disk)->url($file_path);
    }

}
