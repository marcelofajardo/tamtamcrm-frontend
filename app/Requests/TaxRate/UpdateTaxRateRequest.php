<?php

namespace App\Requests\TaxRate;

use App\Repositories\Base\BaseFormRequest;

class UpdateTaxRateRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'rate' => ['required']
        ];
    }
}
