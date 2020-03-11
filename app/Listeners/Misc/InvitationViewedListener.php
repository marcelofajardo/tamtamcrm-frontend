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

namespace App\Listeners\Misc;

use App\Notification;
use App\Notifications\Admin\EntityViewedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InvitationViewedListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
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
        $entity_name = $event->entity;
        $invitation = $event->invitation;

        $notification = new EntityViewedNotification($invitation, $entity_name);

        foreach ($invitation->account->account_users as $company_user) {
            $notifiable_methods = [];

            $notifications = json_decode(json_encode($company_user->notifications->email), true);

            if (empty($notifications)) {
                continue;
            }

            $found = array_filter($notifications, function ($v, $k) {
                return $v['isChecked'] == 1;
            }, ARRAY_FILTER_USE_BOTH);

            $keys = array_column($found, 'value');

            $entity_viewed = "{$entity_name}_viewed";

            /*** Check for Mail notifications***/
            $all_user_notifications = '';

            if($invitation->{$entity_name}->user_id == $company_user->user_id || $invitation->{$entity_name}->assigned_user_id == $company_user->user_id)
                $all_user_notifications = "all_user_notifications";
            }

            $possible_permissions = [$entity_viewed, "all_notifications", $all_user_notifications];

            $permission_count = array_intersect($possible_permissions, $keys);

            if (count($permission_count) >= 1) {
                array_push($notifiable_methods, 'mail');
            }
            /*** Check for Mail notifications***/


            /*** Check for Slack notifications***/ //@TODO when hillel implements this we can uncomment this.
            // $permission_count = array_intersect($possible_permissions, $notifications->slack);
            // if(count($permission_count) >=1)
            //     array_push($notifiable_methods, 'slack');

            /*** Check for Slack notifications***/

            $notification->method = $notifiable_methods;

            $company_user->user->notify($notification);
        }

        if (isset($invitation->account->slack_webhook_url)) {
            $notification->method = ['slack'];

            Notification::route('slack', $invitation->account->slack_webhook_url)->notify($notification);

        }
    }

    private function userNotificationArray($notifications)
    {
        $via_array = [];

        if (stripos($this->company_user->permissions, ) !== false) {
            ;
        }

    }
}
