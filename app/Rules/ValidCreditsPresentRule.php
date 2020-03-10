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

use App\Credit;
use App\User;
use Illuminate\Contracts\Validation\Rule;

/**
 * Class ValidCreditsPresentRule
 * @package App\Http\ValidationRules
 */
class ValidCreditsPresentRule implements Rule
{
    /**
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->validCreditsPresent();
    }

    /**
     * @return string
     */
    public function message()
    {
        return 'Insufficient balance on credit.';
    }

    private function validCreditsPresent(): bool
    {
        //todo need to ensure the clients credits are here not random ones!

        if (request()->input('credits') && is_array(request()->input('credits'))) {
            foreach (request()->input('credits') as $credit) {
                $cred = Credit::find($credit['credit_id']);

                if ($cred->balance == 0) {
                    return false;
                }
            }
        }

        return true;
    }
}
