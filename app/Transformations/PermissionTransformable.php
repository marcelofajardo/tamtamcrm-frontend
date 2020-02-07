<?php

namespace App\Transformations;

use App\Permission;
use App\Repositories\PermissionRepository;

trait PermissionTransformable
{

    /**
     * Transform the address
     *
     * @param Address $address
     *
     * @return Address
     * @throws \App\Shop\Cities\Exceptions\CityNotFoundException
     * @throws \App\Shop\Countries\Exceptions\CountryNotFoundException
     * @throws \App\Shop\Customers\Exceptions\CustomerNotFoundException
     */
    public function transformPermission(Permission $permission)
    {
        $obj = new Permission;
        $obj->id = $permission->id;
        $obj->name = $permission->name;
        $obj->description = $permission->description;

        return $obj;
    }

}
