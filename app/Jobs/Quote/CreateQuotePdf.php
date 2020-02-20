<?php

namespace App\Jobs\Quote;

use App\Designs\Custom;
use App\Designs\Designer;
use App\ClientContact;
use App\Account;
use App\Design;
use App\Traits\Pdf\PdfMaker;
use App\Traits\MakesInvoiceHtml;
use App\Traits\NumberFormatter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;

class CreateQuotePdf implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, NumberFormatter, MakesInvoiceHtml, PdfMaker;

    public $quote;

    public $account;

    public $contact;

    private $disk;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($quote, Account $account, ClientContact $contact = null)
    {

        $this->quote = $quote;

        $this->account = $account;

        $this->contact = $contact;

        $this->disk = $disk ?? config('filesystems.default');

    }

    public function handle()
    {

        if (!$this->contact) {
            $this->contact = $this->quote->customer->primary_contact()->first();
        }

        App::setLocale($this->contact->preferredLocale());

        $path = $this->quote->customer->quote_filepath();

        $file_path = $path . $this->quote->number . '.pdf';

        $design = Design::find($this->quote->customer->getSetting('quote_design_id'));

        if ($design->is_custom) {
            $quote_design = new Custom($design->design);
        } else {
            $class = 'App\Designs\\' . $design->name;
            $quote_design = new $class();
        }

        $designer = new Designer($quote_design, $this->quote->customer->getSetting('pdf_variables'), 'quote');

//get invoice design
        $html = $this->generateInvoiceHtml($designer->build($this->quote)->getHtml(), $this->quote, $this->contact);

//todo - move this to the client creation stage so we don't keep hitting this unnecessarily
        Storage::makeDirectory($path, 0755);

//\Log::error($html);
        $pdf = $this->makePdf(null, null, $html);

        $instance = Storage::disk($this->disk)->put($file_path, $pdf);
        

//$instance= Storage::disk($this->disk)->path($file_path);

        return $file_path;
    }

    /**
     * Returns a PDF stream
     *
     * @param string $header Header to be included in PDF
     * @param string $footer Footer to be included in PDF
     * @param string $html The HTML object to be converted into PDF
     *
     * @return string        The PDF string
     */
//    private function makePdf($header, $footer, $html)
//    {
//        return Browsershot::html($html)
////->showBrowserHeaderAndFooter()
////->headerHtml($header)
////->footerHtml($footer)
//            ->deviceScaleFactor(1)
//            ->showBackground()
//            ->waitUntilNetworkIdle(true)->pdf();
////->margins(10,10,10,10)
////->savePdf('test.pdf');
//    }
}
