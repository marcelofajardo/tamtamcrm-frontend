<?php

namespace App\Services\Notification;

use App\Models\Account;
use App\Services\AbstractService;
use Illuminate\Notifications\Notification as Notifiable;
use Illuminate\Support\Facades\Notification;

class NotificationService extends AbstractService
{

    const ALL = 'all_notifications';

    const ALL_USER = 'all_user_notifications';

    const PAYMENT_SUCCESS = 'payment_success';

    const LEAD_SUCCESS = 'lead_success';

    const DEAL_SUCCESS = 'deal_success';

    const PAYMENT_FAILURE = 'payment_failure';

    const INVOICE_SENT = 'invoice_sent';

    const QUOTE_SENT = 'quote_sent';

    const CREDIT_SENT = 'credit_sent';

    const QUOTE_VIEWED = 'quote_viewed';

    const INVOICE_VIEWED = 'invoice_viewed';

    const CREDIT_VIEWED = 'credit_viewed';

    const QUOTE_APPROVED = 'quote_approved';

    public $account;

    public $notification;

    public function __construct(Account $account, Notifiable $notification)
    {

        $this->account = $account;

        $this->notification = $notification;

    }

    public function run($is_system = false)
    {

        $this->account->owner()->notify($this->notification);

        if ($is_system) {
            $this->notification->is_system = true;

            Notification::route('slack', $this->account->slack_webhook_url)->notify($this->notification);
        }

    }

    /**
     * Hosted notifications
     * @return void
     */
    public function ninja()
    {

        Notification::route('slack', config('ninja.notification.slack'))
                    ->route('mail', config('ninja.notification.mail'))->notify($this->notification);

    }
}
