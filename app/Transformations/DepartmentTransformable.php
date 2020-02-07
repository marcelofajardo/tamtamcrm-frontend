<?php

namespace App\Transformations;

use App\Department;
use App\Repositories\UserRepository;
use App\User;

trait DepartmentTransformable
{

    /**
     * Transform the department
     *
     * @param Department $department
     * @return Department
     */
    protected function transformDepartment(Department $department)
    {
        $prop = new Department;
        $objUser = (new UserRepository(new User))->findUserById($department->department_manager);

        $prop->id = (int)$department->id;
        $prop->parent_id = (int)$department->parent_id;
        $prop->name = $department->name;
        $prop->manager = $objUser->first_name . ' ' . $objUser->last_name;
        $prop->department_manager = $department->department_manager;

        return $prop;
    }

}
