<?php

namespace App\Requests\Customer;

use App\Repositories\Base\BaseFormRequest;

class CreateCustomerRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer_type' => 'required',
//            'address_1' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required', 'email', 'unique:customers'],
            'contacts.*.email' => 'nullable|distinct'
        ];
    }

    protected function prepareForValidation()
    {
        $input = $this->all();
    }

}
