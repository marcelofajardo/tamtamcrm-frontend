<?php

namespace App\Requests\CompanyGateway;

use App\Repositories\Base\BaseFormRequest;
use App\Rules\ValidCompanyGatewayFeesAndLimitsRule;
use App\Traits\CompanyGatewayFeesAndLimitsSaver;

class StoreCompanyGatewayRequest extends BaseFormRequest
{
    use CompanyGatewayFeesAndLimitsSaver;

    public function rules()
    {

        $rules = [
            'gateway_key' => 'required',
            'fees_and_limits' => new ValidCompanyGatewayFeesAndLimitsRule(),
        ];

        return $rules;
    }

    protected function prepareForValidation()
    {
        $input = $this->all();

        if (isset($input['config'])) {
            $input['config'] = json_decode($input['config']);
        }
        if (isset($input['fees_and_limits'])) {
            $input['fees_and_limits'] = $this->cleanFeesAndLimits($input['fees_and_limits']);
        }
        $this->replace($input);
    }
}
