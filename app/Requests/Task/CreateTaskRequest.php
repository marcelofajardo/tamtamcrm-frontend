<?php

namespace App\Requests\Task;

use App\Repositories\Base\BaseFormRequest;

class CreateTaskRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'source_type' => 'nullable|numeric',
            'rating' => 'nullable|numeric',
            'customer_id' => 'nullable|numeric',
            'task_type' => 'required',
            'title' => 'required',
            'content' => 'required',
            'contributors' => 'required|array',
            'created_by' => 'required|string',
            'due_date' => 'required',
            'start_date' => 'nullable',
            'task_status' => 'required',
            'project_id' => 'nullable'
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'Title is required!',
            'content.required' => 'Content is required!',
            //'contributors.required' => 'Contributors is required!',
            'due_date.required' => 'Due date is required!',
        ];
    }

}
