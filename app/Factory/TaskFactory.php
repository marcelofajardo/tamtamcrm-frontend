<?php
namespace App\Factory;

use App\Task;

class TaskFactory
{
    public static function create(int $user_id, int $account_id) :Task
    {
        $task = new Task;
        $task->title = '';
        $task->content = '';
        $task->task_color = '';
        $task->due_date = null;
        $task->is_completed = 0;
        $task->is_active = 1;
        $task->task_status = null;
        $task->task_type = null;
        $task->customer_id = null;
        $task->rating = null;
        $task->parent_id = 0;
        $task->start_date = null;
        $task->is_running = 0;
        $task->source_type = 1;
        $task->user_id = $user_id;
        $task->created_by = $user_id;
        $task->account_id = $account_id;
        $task->custom_value1 = '';
        $task->custom_value2 = '';

        return $task;
    }
}
