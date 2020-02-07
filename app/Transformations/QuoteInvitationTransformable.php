<?php

namespace App\Transformations;

use App\Quote;
use App\QuoteInvitation;

trait QuoteInvitationTransformable
{

    /**
     * @param QuoteInvitation $invitation
     * @return QuoteInvitation
     */
    protected function transformQuote(QuoteInvitation $invitation)
    {
        $prop = new QuoteInvitation;
        $prop->id = $invitation->id;
        $prop->customer_id = $invitation->customer_id;
        $prop->key = $invitation->key;
        $prop->link = $invitation->getLink() ?: '';
        $prop->sent_date = $invitation->sent_date ?: '';
        $prop->viewed_date = $invitation->viewed_date ?: '';
        $prop->opened_date = $invitation->opened_date ?: '';


        return $prop;
    }

}
