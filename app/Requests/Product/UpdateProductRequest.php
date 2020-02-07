<?php

namespace App\Requests\Product;

use App\Repositories\Base\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'sku' => 'required',
            'name' => ['required', Rule::unique('products')->ignore($this->segment(3))],
            'price' => 'required|numeric',
            'quantity' => 'numeric',
            'description' => 'required'
        ];
    }

    protected function prepareForValidation()
    {
        $input = $this->all();
        if (!isset($input['quantity']) || $input['quantity'] < 1) {
            $input['quantity'] = 1;
        }
        $this->replace($input);
    }
}
