<?php

namespace App\Services\Quote;

use App\Events\Invoice\QuoteWasMarkedSent;
use App\Events\Quote\QuoteWasMarkedApproved;
use App\Jobs\Company\UpdateCompanyLedgerWithInvoice;
use App\Invoice;
use App\Quote;
use App\Services\AbstractService;

class MarkApproved extends AbstractService
{
    private $client;
    private $quote;

    public function __construct($client, $quote)
    {
        $this->client = $client;
        $this->quote = $quote;
    }

    public function run()
    {
        /* Return immediately if status is not draft */
        if ($this->quote->status_id != Quote::STATUS_SENT) {
            return $this->quote;
        }

        $this->quote->service()->setStatus(Quote::STATUS_APPROVED)->applyNumber()->save();

        event(new QuoteWasMarkedApproved($this->quote));

        return $this->quote;
    }
}
