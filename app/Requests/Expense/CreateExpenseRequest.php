<?php

namespace App\Requests\Expense;

use App\Repositories\Base\BaseFormRequest;

class CreateExpenseRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'amount' => 'required'
        ];

        return $rules;
    }

}
