<?php

namespace App\Requests\Task;

use App\Repositories\Base\BaseFormRequest;

class UpdateTaskRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'valued_at' => 'nullable|string',
            'rating' => 'nullable|numeric',
            'customer_id' => 'nullable|numeric',
            'title' => 'required',
            'content' => 'required',
            'contributors' => 'required|array',
            'due_date' => 'required',
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
            'contributors.required' => 'Contributors is required!',
            'due_date.required' => 'Due date is required!',
        ];
    }

}
