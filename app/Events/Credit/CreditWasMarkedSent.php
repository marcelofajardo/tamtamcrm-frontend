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

namespace App\Events\Credit;

use App\Account;
use App\Credit;
use Illuminate\Queue\SerializesModels;

/**
 * Class CreditWasMarkedSent.
 */
class CreditWasMarkedSent
{
    use SerializesModels;
    /**
     * @var Credit
     */
    public $credit;
    public $account;

    /**
     * CreditWasMarkedSent constructor.
     * @param Credit $credit
     * @param Account $account
     */
    public function __construct(Credit $credit, Account $account)
    {
        $this->credit = $credit;
        $this->account = $account;
    }
}
