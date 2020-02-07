<?php

namespace App\Transformations;

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
     * @throws \App\Shop\Cities\Exceptions\CityNotFoundException
     * @throws \App\Shop\Countries\Exceptions\CountryNotFoundException
     * @throws \App\Shop\Customers\Exceptions\CustomerNotFoundException
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
