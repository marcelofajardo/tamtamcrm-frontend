<?php

namespace App\Factory;

use App\CompanyLedger;

class CompanyLedgerFactory
{
    public static function create(int $account_id, int $user_id): CompanyLedger
    {
        $company_ledger = new CompanyLedger;
        $company_ledger->account_id = $account_id;
        $company_ledger->user_id = $user_id;
        $company_ledger->adjustment = 0;
        $company_ledger->balance = 0;
        $company_ledger->notes = '';
        $company_ledger->hash = '';
        $company_ledger->customer_id = 0;
        return $company_ledger;
    }
}
