<?php
namespace App\Requests\Credit;

use App\Repositories\Base\BaseFormRequest;

class UpdateCreditRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer_id' => 'required',
            'total' => 'required|numeric',
        ];
    }
}
