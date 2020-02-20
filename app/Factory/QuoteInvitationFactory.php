<?php

namespace App\Factory;

use App\QuoteInvitation;
use Illuminate\Support\Str;

class QuoteInvitationFactory
{
    public static function create(int $account_id, int $user_id): QuoteInvitation
    {
        $qi = new QuoteInvitation;
        $qi->account_id = $account_id;
        $qi->user_id = $user_id;
        $qi->client_contact_id = null;
        $qi->quote_id = null;
        $qi->key = Str::random(20);
        $qi->transaction_reference = null;
        $qi->message_id = null;
        $qi->email_error = '';
        $qi->signature_base64 = '';
        $qi->signature_date = null;
        $qi->sent_date = null;
        $qi->viewed_date = null;
        $qi->opened_date = null;
        return $qi;
    }

}
