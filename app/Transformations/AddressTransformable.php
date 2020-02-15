<?php

namespace App\Transformations;

use App\Address;
use App\ClientContact;
use App\Customer;
use App\Repositories\ClientContactRepository;
use App\Repositories\CustomerRepository;

class AddressTransformable
{

    /**
     * @param Address $address
     * @return Address
     */
    public function transformAddress(Address $address)
    {
        $obj = new Address;
        $obj->id = $address->id;
        $obj->alias = $address->alias;
        $obj->address_1 = $address->address_1;
        $obj->address_2 = $address->address_2;
        $obj->zip = $address->zip;
        $obj->city = $address->city;
        $obj->country_id = $address->country_id;
        $obj->address_type = $address->address_type;
        $customerRepo = new CustomerRepository(new Customer, new ClientContactRepository(new ClientContact));
        $customer = $customerRepo->findCustomerById($address->customer_id);
        $obj->customer = $customer->name;
        $obj->status = $address->status;
        return $obj;
    }

}
