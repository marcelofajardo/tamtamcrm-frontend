<?php

namespace App\Transformations;

use App\Customer;

trait CustomerTransformable
{

    protected function transformCustomer(Customer $customer)
    {

        $company = !empty($customer->company_id) ? $customer->company->toArray() : '';
        $customer_type = $customer->customerType()->count() > 0 ? $customer->customerType->name : '';
        $credit = $customer->credits()->count() > 0 ? $customer->credits->first()->amount : 0;

        $addresses = $customer->addresses;

        $billing = null;
        $shipping = null;

        foreach ($addresses as $address) {

            if ($address->address_type === 1) {
                $billing = $address;
            } elseif ($address->address_type === 2) {
                $shipping = $address;
            }
        }

        $prop = new Customer;
        $prop->id = (int)$customer->id;
        $prop->name = $customer->first_name . " " . $customer->last_name;
        $prop->first_name = $customer->first_name;
        $prop->last_name = $customer->last_name;
        $prop->email = $customer->email;
        $prop->phone = $customer->phone;
        $prop->company_id = $customer->company_id;
        $prop->job_title = $customer->job_title;
        $prop->deleted_at = $customer->deleted_at;
        $prop->company = $company;
        $prop->credit = $credit;
        $prop->contacts = $customer->contacts->count() > 0 ? $customer->contacts : [];
        $prop->customerType = $customer_type;
        $prop->customer_type = $customer->customer_type;
        $prop->default_payment_method = $customer->default_payment_method;
        $prop->group_settings_id = $customer->group_settings_id;
        $prop->shipping = $shipping;
        $prop->billing = $billing;
        $prop->currency_id = $customer->currency_id;
        $prop->paid_to_date = (float)$customer->paid_to_date;
        $prop->credit_balance = (float)$customer->credit_balance;
        $prop->balance = (float)$customer->balance;
        $prop->assigned_user = $customer->assigned_user_id;
        $prop->settings = [
            'payment_terms' => $customer->getSetting('payment_terms')
        ];
        $prop->custom_value1 = $customer->custom_value1 ?: '';
        $prop->custom_value2 = $customer->custom_value2 ?: '';
        $prop->custom_value3 = $customer->custom_value3 ?: '';
        $prop->custom_value4 = $customer->custom_value4 ?: '';

        return $prop;
    }

}