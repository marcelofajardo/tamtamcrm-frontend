<?php

namespace App\Services\Quote;

use App\ClientContact;
use App\Jobs\Quote\CreateQuotePdf;
use App\Quote;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Storage;

class GetQuotePdf extends AbstractService
{
    private $contact;
    private $quote;

    public function __construct(Quote $quote, ClientContact $contact = null)
    {
        $this->contact = $contact;
        $this->quote = $quote;
    }

    public function run()
    {
        if (!$this->contact) {
            $this->contact = $this->quote->customer->primary_contact()->first();
        }

        $path = $this->quote->customer->quote_filepath();
        $file_path = $path . $this->quote->number . '.pdf';
        $disk = config('filesystems.default');
        $file = Storage::disk($disk)->exists($file_path);

        if (!$file) {
            $file_path = CreateQuotePdf::dispatchNow($this->quote, $this->quote->account, $this->contact);
        }

        return $file_path;
    }

}
