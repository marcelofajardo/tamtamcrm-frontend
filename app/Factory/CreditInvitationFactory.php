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

namespace App\Factory;

use App\CreditInvitation;
use Illuminate\Support\Str;

class CreditInvitationFactory
{
    public static function create(int $account_id, int $user_id): CreditInvitation
    {
        $ci = new CreditInvitation;
        $ci->account_id = $account_id;
        $ci->user_id = $user_id;
        $ci->client_contact_id = null;
        $ci->credit_id = null;
        $ci->key = Str::random(40);
        $ci->transaction_reference = null;
        $ci->message_id = null;
        $ci->email_error = '';
        $ci->signature_base64 = '';
        $ci->signature_date = null;
        $ci->sent_date = null;
        $ci->viewed_date = null;
        $ci->opened_date = null;

        return $ci;
    }
}
