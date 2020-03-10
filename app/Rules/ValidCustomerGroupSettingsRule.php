<?php
/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

namespace App\Rules;

use App\User;
use App\Traits\CustomerGroupSettingsSaver;
use Illuminate\Contracts\Validation\Rule;

/**
 * Class ValidCustomerGroupSettingsRule
 * @package App\Http\ValidationRules
 */
class ValidCustomerGroupSettingsRule implements Rule
{
    use CustomerGroupSettingsSaver;
    /**
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */

    public $return_data;

    public function passes($attribute, $value)
    {
        $data = $this->validateSettings($value);
        if (is_array($data)) {
            $this->return_data = $data;
            return false;
        } else {
            return true;
        }
    }

    /**
     * @return string
     */
    public function message()
    {
        return $this->return_data[0] . " is not a valid " . $this->return_data[1];
    }
}
