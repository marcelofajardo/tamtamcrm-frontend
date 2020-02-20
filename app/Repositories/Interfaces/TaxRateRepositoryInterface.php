<?php

namespace App\Repositories\Interfaces;

use App\Invoice;
use App\Repositories\Base\BaseRepositoryInterface;
use App\TaxRate;
use Illuminate\Support\Collection;

interface TaxRateRepositoryInterface extends BaseRepositoryInterface
{
    public function save($data, TaxRate $taxRate): ?TaxRate;

    public function findTaxRateById(int $id): TaxRate;

    public function listTaxRates($columns = ['*'], string $order = 'id', string $sort = 'desc'): Collection;

    public function deleteTaxRate();
}
