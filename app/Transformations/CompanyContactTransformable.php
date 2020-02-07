<?php
namespace App\Transformations;

use App\CompanyContact;
use App\Company;
use App\Repositories\UserRepository;
use App\User;

trait CompanyContactTransformable
{
    /**
     * Transform the department
     *
     * @param Department $department
     * @return Department
     */
    protected function transformGroupSetting(CompanyContact $company)
    {
        $prop = new CompanyContact;

        $prop->id => $company->id;
        $prop->first_name = $company->first_name ?: '';
        $prop->last_name = $company->last_name ?: '';
        $prop->email = $company->email ?: '';
        $prop->updated_at = $company->updated_at;
        $prop->archived_at = $company->deleted_at;
        $prop->is_primary = (bool) $company->is_primary;
        $prop->phone = $company->phone ?: '';
        $prop->custom_value1 = $company->custom_value1 ?: '';
        $prop->custom_value2 = $company->custom_value2 ?: '';
        $prop->custom_value3 = $company->custom_value3 ?: '';
        $prop->custom_value4 = $company->custom_value4 ?: '';

        return $prop;
    }
}
