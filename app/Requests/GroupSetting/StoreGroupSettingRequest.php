<?php
namespace App\Requests\GroupSetting;

use App\DataMapper\CustomerSettings;
use App\Repositories\Base\BaseFormRequest;
use App\Rules\ValidCustomerGroupSettingsRule;

class StoreGroupSettingRequest extends BaseFormRequest
{

    public function rules()
    {
        $rules['name'] = 'required';
        $rules['settings'] = new ValidCustomerGroupSettingsRule();
        return $rules;
    }

    protected function prepareForValidation()
    {
        $input = $this->all();

        $input['settings'] = CustomerSettings::defaults();

        $this->replace($input);
    }

    public function messages()
    {
        return [
            'settings' => 'settings must be a valid json structure'
        ];
    }
}
