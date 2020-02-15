<?php

namespace App\Services\Quote;

use App\Events\Invoice\QuoteWasMarkedSent;
use App\Events\Quote\QuoteWasMarkedApproved;
use App\Jobs\Company\UpdateCompanyLedgerWithInvoice;
use App\Invoice;
use App\Quote;

class MarkApproved
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function __invoke($quote)
    {
        /* Return immediately if status is not draft */
        if ($quote->status_id != Quote::STATUS_SENT) {
            return $quote;
        }

        $quote->service()->setStatus(Quote::STATUS_APPROVED)->applyNumber()->save();

        event(new QuoteWasMarkedApproved($quote));

        return $quote;
    }
}
