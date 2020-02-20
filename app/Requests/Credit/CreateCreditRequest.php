<?php

namespace App\Requests\Credit;

use App\Repositories\Base\BaseFormRequest;
use App\Traits\CleanLineItems;

class CreateCreditRequest extends BaseFormRequest
{
    use CleanLineItems;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'total' => 'required',
        ];
    }

    protected function prepareForValidation()
    {
        $input = $this->all();
        $input['line_items'] = isset($input['line_items']) ? $this->cleanItems($input['line_items']) : [];
        $this->replace($input);
    }
}
