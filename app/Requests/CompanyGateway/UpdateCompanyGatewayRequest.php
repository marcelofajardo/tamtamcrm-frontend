<?php

namespace App\Requests\CompanyGateway;

use App\Rules\ValidSettingsRule;
use App\Repositories\Base\BaseFormRequest;
use App\Rules\ValidCompanyGatewayFeesAndLimitsRule;
use App\Traits\CompanyGatewayFeesAndLimitsSaver;

class UpdateCompanyGatewayRequest extends BaseFormRequest
{
    use CompanyGatewayFeesAndLimitsSaver;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'fees_and_limits' => new ValidCompanyGatewayFeesAndLimitsRule(),
        ];

        return $rules;
    }

    protected function prepareForValidation()
    {
        $input = $this->all();

//        echo '<pre>';
//        print_r($input);
//        die;

        $input['config'] = json_decode($input['config']);

        if (isset($input['fees_and_limits'])) {
            $input['fees_and_limits'] = $this->cleanFeesAndLimits($input['fees_and_limits']);
        }
        $this->replace($input);
    }

}
