<?php

namespace App\Services\Credit;

use App\Jobs\Invoice\CreateInvoicePdf;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Storage;
use App\Credit;
use App\ClientContact;

class GetCreditPdf extends AbstractService
{

    private $credit;
    private $contact;

    public function __construct(Credit $credit, ClientContact $contact = null)
    {
        $this->credit = $credit;
        $this->contact = $contact;
    }

    public function run()
    {
        if (!$this->contact) {
            $this->contact = $this->credit->customer->primary_contact()->first();
        }

        $path = 'public/' . $this->credit->customer->id . '/credits/';
        $file_path = $path . $this->credit->number . '.pdf';
        $disk = config('filesystems.default');
        $file = Storage::disk($disk)->exists($file_path);

        if (!$file) {
            $file_path = CreateInvoicePdf::dispatchNow($this, $this->credit->account, $this->contact);
        }

        return Storage::disk($disk)->url($file_path);
    }

}
