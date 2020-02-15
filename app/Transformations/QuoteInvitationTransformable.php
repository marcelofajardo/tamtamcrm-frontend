<?php

namespace App\Transformations;

use App\Quote;
use App\QuoteInvitation;

class QuoteInvitationTransformable
{

    /**
     * @param QuoteInvitation $invitation
     * @return QuoteInvitation
     */
    public function transformQuoteInvitations(QuoteInvitation $invitation)
    {
        $prop = new QuoteInvitation;
        $prop->id = (int)$invitation->id;
        $prop->client_contact_id = (int)$invitation->client_contact_id;
        $prop->key = $invitation->key;
        //$prop->link = $invitation->getLink() ?: '';
        $prop->sent_date = $invitation->sent_date ?: '';
        $prop->viewed_date = $invitation->viewed_date ?: '';
        $prop->opened_date = $invitation->opened_date ?: '';
        $prop->updated_at = $invitation->updated_at;
        $prop->archived_at = $invitation->deleted_at;

        return $prop;
    }

}
