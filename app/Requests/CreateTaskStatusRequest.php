<?php

namespace App\Requests;

use App\Repositories\Base\BaseFormRequest;

class CreateTaskStatusRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required', 'unique:task_statuses'],
            'task_type' => ['required'],
            'description' => ['required']
        ];
    }
}
