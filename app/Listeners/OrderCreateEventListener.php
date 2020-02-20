<?php

namespace App\Listeners;

use App\Events\OrderCreateEvent;
use App\Repositories\TaskRepository;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderCreateEventListener
{
    /**
     * Create the event listener.
     *
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param OrderCreateEvent $event
     * @return void
     */
    public function handle(OrderCreateEvent $event)
    {
        // send email to customer
        $orderRepo = new TaskRepository($event->task);
        $orderRepo->sendEmailToCustomer();
        $orderRepo = new TaskRepository($event->task);
        $orderRepo->sendEmailNotificationToAdmin();
    }
}
