<?php

namespace App\Listeners\Invoice;

use App\Notifications\Admin\InvoiceSentNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class InvoiceEmailedNotification implements ShouldQueue
{

    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param object $event
     * @return void
     */
    public function handle($event)
    {
        $invitation = $event->invitation;

        foreach ($invitation->company->company_users as $company_user) {
            $notification = new EntitySentNotification($invitation, 'invoice');
            $notification->method = ['mail'];

            $company_user->user->notify($notification);

        }

        // if(isset($invitation->company->slack_webhook_url)){

        //     Notification::route('slack', $invitation->company->slack_webhook_url)
        //         ->notify(new EntitySentNotification($invitation, $invitation->company, true));

        // }
    }
}
