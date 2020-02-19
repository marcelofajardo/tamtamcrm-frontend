<?php

namespace App\Transformations;

use App\Project;

trait ProjectTransformable
{

    protected function transformProject(Project $project)
    {

        $prop = new Project();
        $prop->id = (int)$project->id;
        $prop->customer_name = $project->customer->present()->name;
        $prop->title = $project->title;
        $prop->description = $project->description;
        $prop->is_completed = $project->is_completed;
        $prop->due_date = $project->due_date;
        $prop->customer_id = $project->customer_id;
        $prop->updated_at = (int)$project->updated_at;
        $prop->deleted_at = $project->deleted_at;
        $prop->created_at = $project->created_at;
        $prop->is_deleted = (bool)$project->is_deleted;
        $prop->task_rate = (float)$project->task_rate;
        $prop->budgeted_hours = (float)$project->budgeted_hours;
        $prop->account_id = $project->account_id;
        $prop->user_id = $project->user_id;
        $prop->assigned_user_id = $project->assigned_user_id;
        $prop->notes = $project->notes;
        $prop->custom_value1 = $project->custom_value1 ?: '';
        $prop->custom_value2 = $project->custom_value2 ?: '';
        $prop->custom_value3 = $project->custom_value3 ?: '';
        $prop->custom_value4 = $project->custom_value4 ?: '';

        return $prop;
    }

}
