<?php

namespace App\Requests\RecurringInvoice;

use App\Repositories\Base\BaseFormRequest;

class StoreRecurringInvoiceRequest extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer_id' => 'required|exists:customers,id',
        ];
    }

}
