<?php

namespace App\Services\Invoice;

use App\Jobs\Invoice\CreateInvoicePdf;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Storage;

class GetInvoicePdf extends AbstractService
{
    private $contact;
    private $invoice;

    public function __construct($invoice, $contact = null)
    {
        $this->contact = $contact;
        $this->invoice = $invoice;
    }

    public function run()
    {
        if (!$this->contact) {
            $this->contact = $this->invoice->customer->primary_contact()->first();
        }

        $path = $this->invoice->customer->invoice_filepath();
        $file_path = $path . $this->invoice->number . '.pdf';
        $disk = config('filesystems.default');
        $file = Storage::disk($disk)->exists($file_path);

        if (!$file) {
            $file_path = CreateInvoicePdf::dispatchNow($this->invoice, $this->invoice->account, $this->contact);
        }

        return Storage::disk($disk)->url($file_path);
    }

}
