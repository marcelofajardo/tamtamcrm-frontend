<?php
namespace App\Jobs\Invoice;

use App\Designs\Designer;
use App\Designs\Modern;
use App\Invoice;
use App\Account;
use App\Payment;
use App\Repositories\InvoiceRepository;
use App\Traits\NumberFormatter;
use App\Traits\MakesInvoiceHtml;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Browsershot\Browsershot;
use Symfony\Component\Debug\Exception\FatalThrowableError;

class CreateInvoicePdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, NumberFormatter, MakesInvoiceHtml;
    public $invoice;
    private $account;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice, Account $account)
    {
        $this->invoice = $invoice;
        $this->account = $account;
    }

    public function handle()
    {
        $input_variables = [
            'client_details' => [
                'name',
                'id_number',
                'vat_number',
                'address1',
                'address2',
                'city_state_postal',
                'postal_city_state',
                'country',
                'email',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
            ],
            'company_details' => [
                'company_name',
                'id_number',
                'vat_number',
                'website',
                'email',
                'phone',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
            ],
            'company_address' => [
                'address1',
                'address2',
                'city_state_postal',
                'postal_city_state',
                'country',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
            ],
            'invoice_details' => [
                'invoice_number',
                'po_number',
                'date',
                'due_date',
                'balance_due',
                'invoice_total',
                'partial_due',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
            ],
            'table_columns' => [
                'product_key',
                'notes',
                'cost',
                'quantity',
                'discount',
                'tax_name1',
                'line_total'
            ],
        ];

        $path = 'public/' . $this->invoice->customer->id . '/invoices/';
        $file_path = $path . $this->invoice->number . '.pdf';

        $modern = new Modern();
        $designer = new Designer($modern, $input_variables);

        //get invoice design
        $html = $this->generateInvoiceHtml($designer->build($this->invoice)->getHtml(), $this->invoice);

        //todo - move this to the client creation stage so we don't keep hitting this unnecessarily
        Storage::makeDirectory($path, 0755);
        //create pdf
        $pdf = $this->makePdf(null, null, $html);
        
        $response = Storage::put($file_path, $pdf);

        return $file_path;
    }

    /**
     * Returns a PDF stream
     *
     * @param  string $header Header to be included in PDF
     * @param  string $footer Footer to be included in PDF
     * @param  string $html The HTML object to be converted into PDF
     *
     * @return string        The PDF string
     */
    private function makePdf($header, $footer, $html)
    {

        $pdf = App::make('dompdf.wrapper');
        $pdf->loadHTML($html);
        return $pdf->stream();
    }
}
