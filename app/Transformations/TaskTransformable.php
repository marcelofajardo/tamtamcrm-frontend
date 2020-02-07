<?php

namespace App\Transformations;

use App\Task;
use App\User;
use App\Repositories\UserRepository;
use App\Repositories\TaskStatusRepository;
use App\TaskStatus;
use App\Transformations\CustomerTransformable;
use App\Libraries\Utils;

trait TaskTransformable
{

    use CustomerTransformable;

    protected function transformTask(Task $task)
    {

        $prop = new Task;
        $prop->id = (int)$task->id;
        $prop->customer_name = $task->customer->present()->name;
        $prop->title = $task->title;
        $prop->content = $task->content;
        $prop->comments = $task->comments;
        $prop->due_date = $task->due_date;
        $prop->start_date = $task->start_date;
        $prop->is_completed = $task->is_completed;
        $prop->task_status = $task->task_status;
        $prop->status_name = $task->taskStatus->title;
        $prop->task_type = $task->task_type;
        $prop->deleted_at = $task->deleted_at;
        $prop->rating = $task->rating;
        $prop->customer = $this->transformCustomer($task->customer);
        $prop->customer_id = $task->customer_id;
        $prop->valued_at = $task->valued_at;
        $prop->source_type = $task->source_type;
        $prop->users = $task->users;
        $prop->contributors = $task->users()->pluck('user_id')->all();
        $prop->is_active = $task->is_active;
        $prop->start_time = $task->getStartTime();
        $prop->duration = $task->hasPreviousDuration() ? Utils::formatTime($task->getDuration()) : false;
        $prop->custom_value1 = $task->custom_value1 ?: '';
        $prop->custom_value2 = $task->custom_value2 ?: '';
        $prop->project_id = $task->project_id;
        $prop->is_deleted = (bool)$task->is_deleted;
        $prop->time_log = $task->time_log ?: '';
        $prop->is_running = (bool)$task->is_running;
        $prop->custom_value1 = $task->custom_value1 ?: '';
        $prop->custom_value2 = $task->custom_value2 ?: '';
        $prop->custom_value3 = $task->custom_value3 ?: '';
        $prop->custom_value4 = $task->custom_value4 ?: '';
        $prop->task_status_sort_order = (int) $task->task_status_sort_order;

        return $prop;
    }

}
