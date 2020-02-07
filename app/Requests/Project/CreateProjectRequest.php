<?php

namespace App\Requests\Project;

use App\Repositories\Base\BaseFormRequest;

class CreateProjectRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'string|required',
            'description' => 'string|required',
            'customer_id' => 'numeric|required',
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
            'description.required' => 'Description is required!',
            'customer_id.required' => 'Customer is required!'
        ];
    }

}
