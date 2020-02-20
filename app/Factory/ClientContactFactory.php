<?php

namespace App\Factory;

use App\ClientContact;
use Illuminate\Support\Str;

class ClientContactFactory
{
    /**
     * @param int $account_id
     * @param int $user_id
     * @return ClientContact
     */
    public static function create(int $account_id, int $user_id): ClientContact
    {
        $client_contact = new ClientContact;
        $client_contact->first_name = "";
        $client_contact->user_id = $user_id;
        $client_contact->account_id = $account_id;
        $client_contact->contact_key = Str::random(40);
        $client_contact->id = 0;

        return $client_contact;
    }
}
