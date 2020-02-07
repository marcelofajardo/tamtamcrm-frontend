<?php

namespace App\Requests\Customer;

use App\Repositories\Base\BaseFormRequest;

class BulkCustomerRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ids' => 'required',
        ];
    }

}
