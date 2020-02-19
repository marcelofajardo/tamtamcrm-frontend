<?php
namespace App\Services\Ledger;

use App\CompanyLedger;
use App\Factory\CompanyLedgerFactory;

class LedgerService
{

    private $entity;

    public function __construct($entity)
    {
        $this->entity = $entity;
    }

    public function updateInvoiceBalance($adjustment)
    {
        $balance = 0;

        if ($this->ledger()) {
            $balance = $this->ledger->balance;
        }

        $adjustment = $balance + $adjustment;

        $company_ledger = CompanyLedgerFactory::create($this->entity->company_id, $this->entity->user_id);
        $company_ledger->customer_id = $this->entity->customer_id;
        $company_ledger->adjustment = $adjustment;
        $company_ledger->balance = $balance + $adjustment;
        $company_ledger->save();

        $this->entity->company_ledger()->save($company_ledger);

        return $this;
    }

    private function ledger() :CompanyLedger
    {
        return CompanyLedger::whereCustomerId($this->entity->customer_id)
            ->whereAccountId($this->entity->account_id)
            ->orderBy('id', 'DESC')
            ->first();
    }

    public function save()
    {
        $this->entity->save();

        return $this->entity;
    }

}