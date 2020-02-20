<?php

namespace App\Repositories\Interfaces;

use App\Quote;
use App\Repositories\Base\BaseRepositoryInterface;
use App\Invoice;
use Illuminate\Support\Collection;

interface QuoteRepositoryInterface extends BaseRepositoryInterface
{

    public function save($data, Quote $quote): ?Quote;
}
