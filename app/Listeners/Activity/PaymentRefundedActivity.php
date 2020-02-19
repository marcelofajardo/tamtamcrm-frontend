<?php


namespace App\Listeners\Activity;

class PaymentRefundedActivity implements ShouldQueue
{
    protected $activity_repo;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(ActivityRepository $activity_repo)
    {
        $this->activity_repo = $activity_repo;
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $fields = new \stdClass;

        $fields->customer_id = $event->payment->id;
        $fields->user_id = $event->payment->user_id;
        $fields->account_id = $event->payment->account_id;
        //$fields->activity_type_id = Activity::REFUNDED_PAYMENT;
        $fields->payment_id = $event->payment->id;

        //$this->activity_repo->save($fields, $event->client);
    }
}
