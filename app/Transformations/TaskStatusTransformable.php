<?php

namespace App\Transformations;

use App\Shop\Cities\Exceptions\CityNotFoundException;
use App\Shop\Countries\Exceptions\CountryNotFoundException;
use App\Shop\Customers\Exceptions\CustomerNotFoundException;
use App\TaskStatus;
use App\Customer;
use App\Repositories\TaskStatusRepository;

trait TaskStatusTransformable
{

    /**
     * Transform the address
     *
     * @param Address $address
     *
     * @return Address
     * @throws CityNotFoundException
     * @throws CountryNotFoundException
     * @throws CustomerNotFoundException
     */
    public function transformTaskStatus(TaskStatus $taskStatus)
    {

        $obj = new TaskStatus;
        $obj->id = $taskStatus->id;
        $obj->title = $taskStatus->title;
        $obj->description = $taskStatus->description;
        $obj->icon = $taskStatus->icon;
        $obj->task_type_id = $taskStatus->task_type;
        $obj->task_type = $taskStatus->taskType->name;
        $obj->column_color = $taskStatus->column_color;

        return $obj;
    }

}
