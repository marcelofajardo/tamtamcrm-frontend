<?php

namespace App\Services\Quote;

use App\Events\Quote\QuoteWasMarkedSent;
use App\Quote;
use App\Services\AbstractService;

class MarkSent extends AbstractService
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
        if ($this->quote->status_id != Quote::STATUS_DRAFT) {
            return $this->quote;
        }

        $this->quote->markInvitationsSent();

        event(new QuoteWasMarkedSent($this->quote));

        $this->quote->service()->setStatus(Quote::STATUS_SENT)->applyNumber()->save();

        return $this->quote;

    }
}
