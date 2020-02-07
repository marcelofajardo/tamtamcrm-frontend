<?php

namespace App\Requests\Customer;

use App\Repositories\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends BaseFormRequest
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
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required', 'email', Rule::unique('customers')->ignore($this->segment(3))]
        ];
    }

    protected function prepareForValidation()
    {
        $input = $this->all();
    }

}
