<?php

namespace App\Presenters;

/**
 * Class CompanyPresenter
 * @package App\Models\Presenters
 */
class CompanyPresenter extends EntityPresenter
{
    /**
     * @return string
     */
    public function name()
    {
        return $this->entity->name ?: ctrans('texts.untitled_account');
    }

    public function logo()
    {
        return iconv_strlen($this->entity->company_logo >
            0) ? $this->entity->company_logo : 'https://www.invoiceninja.com/wp-content/uploads/2019/01/InvoiceNinja-Logo-Round-300x300.png';
    }

    public function address()
    {
        $str = '';
        $company = $this->entity;
        if ($address1 = $company->address_1) {
            $str .= e($address1) . '<br/>';
        }
        if ($address2 = $company->address_2) {
            $str .= e($address2) . '<br/>';
        }
        if ($cityState = $company->city) {
            $str .= e($company->city) . '<br/>';
        }
//        if ($country = $company->country()) {
//            $str .= e($country->name) . '<br/>';
//        }
        if ($company->phone_number) {
            $str .= "Phone " . ": " . e($company->phone_number) . '<br/>';
        }
        if ($company->email) {
            $str .= "Email " . ": " . e($company->email) . '<br/>';
        }
        return $str;
    }

    public function getCompanyCityState()
    {
        $company = $this->entity;
        $swap = $company->country() && $company->country()->swap_postal_code;
        $city = e($company->settings->city);
        $state = e($company->settings->state);
        $postalCode = e($company->settings->postal_code);
        if ($city || $state || $postalCode) {
            return $this->cityStateZip($city, $state, $postalCode, $swap);
        } else {
            return false;
        }
    }
}
