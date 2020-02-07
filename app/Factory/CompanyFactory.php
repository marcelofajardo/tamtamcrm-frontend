<?php
namespace App\Factory;

use App\Company;

class CompanyFactory
{
    /**
     * @param int $user_id
     * @return Company
     */
    public function create(int $user_id, int $account_id) :Company
    {
        $company = new Company;
        $company->name = '';
        $company->user_id = $user_id;
        $company->account_id = $account_id;
        $company->website = '';
        $company->phone_number = '';
        $company->notes = '';
        $company->email = '';
        $company->balance = 0;
        $company->paid_to_date = 0;
        $company->address_1 = '';
        $company->address_2 = '';
        $company->town = '';
        $company->city = '';
        $company->postcode = '';
        $company->country_id = 225;
        $company->currency_id = null;
        $company->industry_id = null;
        $company->is_deleted = 0;

        //$company_contact = CompanyContactFactory::create($account_id, $user_id);
        //$company->contacts->add($company_contact);

        return $company;
    }
}
