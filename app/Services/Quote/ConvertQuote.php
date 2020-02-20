<?php

namespace App\Services\Quote;

use App\Factory\CloneQuoteToInvoiceFactory;
use App\Quote;
use App\Repositories\InvoiceRepository;
use App\Services\AbstractService;

class ConvertQuote extends AbstractService
{
    private $client;
    private $invoice_repo;
    private $quote;

    public function __construct($client, InvoiceRepository $invoice_repo, $quote)
    {
        $this->client = $client;
        $this->invoice_repo = $invoice_repo;
        $this->quote = $quote;
    }

    /**
     * @param $quote
     * @return mixed
     */
    public function run()
    {
        $invoice = CloneQuoteToInvoiceFactory::create($this->quote, $this->quote->user_id, $this->quote->account_id);
        $this->invoice_repo->save([], $invoice);

        // maybe should return invoice here
        return $this->quote;
    }
}
