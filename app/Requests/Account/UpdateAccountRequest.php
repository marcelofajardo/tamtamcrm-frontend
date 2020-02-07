<?php
namespace App\Requests\Account;

use App\Rules\ValidSettingsRule;
use App\Repositories\Base\BaseFormRequest;

class UpdateAccountRequest extends BaseFormRequest
{
    public function rules()
    {
        $rules = [];
        //$rules['company_logo'] = 'mimes:jpeg,jpg,png,gif|max:10000'; // max 10000kb
        $rules['settings'] = new ValidSettingsRule();
        $rules['industry_id'] = 'integer|nullable';
        $rules['size_id'] = 'integer|nullable';
        $rules['country_id'] = 'integer|nullable';
        $rules['work_email'] = 'email|nullable';
        if (isset($rules['portal_mode']) && ($rules['portal_mode'] == 'domain' || $rules['portal_mode'] == 'iframe')) {
            $rules['portal_domain'] = 'sometimes|url';
        } else {
            $rules['portal_domain'] = 'nullable|alpha_num';
        }
        return $rules;
    }

    protected function prepareForValidation()
    {
        $input = $this->all();

        if(isset($input['settings'])) {
            $input['settings'] = json_decode($input['settings'], true);
        }

        $this->replace($input);
    }

}
