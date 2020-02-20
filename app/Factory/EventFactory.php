<?php

namespace App\Factory;

use App\Event;

class EventFactory
{
    public function create(int $user_id, int $account_id): Event
    {
        $event = new Event;
        $event->created_by = $user_id;
        $event->beginDate = null;
        $event->endDate = null;
        $event->customer_id = 0;
        $event->location = '';
        $event->title = '';
        $event->description = '';
        $event->event_type = 1;
        $event->account_id = $account_id;

        return $event;
    }
}
