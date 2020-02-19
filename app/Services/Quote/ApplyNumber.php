<?php
namespace App\Services\Quote;

use App\Quote;
use App\Services\AbstractService;
use App\Traits\GeneratesCounter;

class ApplyNumber extends AbstractService
{
    use GeneratesCounter;

    private $client;
    private $quote;

    public function __construct($client, $quote)
    {
        $this->client = $client;
        $this->quote = $quote;
    }

    public function run()
    {

        if ($this->quote->number != '')
            return $this->quote;

        switch ($this->client->getSetting('counter_number_applied')) {
            case 'when_saved':
                $this->quote->number = $this->getNextQuoteNumber($this->client);
                break;
            case 'when_sent':
                if ($this->quote->status_id == Quote::STATUS_SENT) {
                    $this->quote->number = $this->getNextQuoteNumber($this->client);
                }
                break;

            default:
                # code...
                break;
        }

        return $this->quote;
    }
}
