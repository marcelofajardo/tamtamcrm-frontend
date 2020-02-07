<?php

namespace App\Requests\Task;

use App\Repositories\Base\BaseFormRequest;

class CreateDealRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            'valued_at' => ['required'],
            'address_1' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required', 'email', 'unique:customers'],
        ];
    }

}
