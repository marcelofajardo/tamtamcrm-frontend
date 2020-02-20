<?php

namespace App\Transformations;

use App\CompanyContact;
use App\Company;
use App\Repositories\UserRepository;
use App\User;

class CompanyContactTransformable
{
    /**
     * Transform the department
     *
     * @param Department $department
     * @return Department
     */
    public function transformCompanyContact(CompanyContact $contact)
    {
        $prop = new CompanyContact;

        $prop->id = $contact->id;
        $prop->first_name = $contact->first_name ?: '';
        $prop->last_name = $contact->last_name ?: '';
        $prop->email = $contact->email ?: '';
        $prop->is_primary = (bool)$contact->is_primary;
        $prop->phone = $contact->phone ?: '';
        $prop->custom_value1 = $contact->custom_value1 ?: '';
        $prop->custom_value2 = $contact->custom_value2 ?: '';
        $prop->custom_value3 = $contact->custom_value3 ?: '';
        $prop->custom_value4 = $contact->custom_value4 ?: '';

        return $prop;
    }
}
