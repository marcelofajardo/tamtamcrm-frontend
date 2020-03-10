<?php

namespace App\Providers;

use App\Events\Account\AccountWasDeleted;
use App\Events\Client\ClientWasCreated;
use App\Events\Deal\DealWasCreated;
use App\Events\Invoice\InvoiceWasCreated;
use App\Events\Invoice\InvoiceWasEmailed;
use App\Events\Invoice\InvoiceWasEmailedAndFailed;
use App\Events\Invoice\InvoiceWasMarkedSent;
use App\Events\Invoice\InvoiceWasPaid;
use App\Events\Invoice\InvoiceWasUpdated;
use App\Events\Lead\LeadWasCreated;
use App\Events\Misc\InvitationWasViewed;
use App\Events\Payment\PaymentWasCreated;
use App\Events\Payment\PaymentWasDeleted;
use App\Events\PaymentWasRefunded;
use App\Events\PaymentWasVoided;
use App\Listeners\Activity\CreatedClientActivity;
use App\Listeners\Activity\PaymentCreatedActivity;
use App\Listeners\Activity\PaymentDeletedActivity;
use App\Listeners\Activity\PaymentRefundedActivity;
use App\Listeners\Activity\PaymentVoidedActivity;
use App\Listeners\Deal\DealNotification;
use App\Listeners\Document\DeleteAccountDocuments;
use App\Listeners\Invoice\CreateInvoiceActivity;
use App\Listeners\Invoice\CreateInvoiceHtmlBackup;
use App\Listeners\Invoice\InvoiceEmailActivity;
use App\Listeners\Invoice\InvoiceEmailedNotification;
use App\Listeners\Invoice\InvoiceEmailFailedActivity;
use App\Listeners\Invoice\UpdateInvoiceActivity;
use App\Listeners\Lead\LeadNotification;
use App\Listeners\Misc\InvitationViewedListener;
use App\Listeners\Payment\PaymentNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        // Clients
        ClientWasCreated::class => [
            CreatedClientActivity::class,
            // 'App\Listeners\SubscriptionListener@createdClient',
        ],
        //payments
        PaymentWasCreated::class => [
            PaymentCreatedActivity::class,
            PaymentNotification::class,
        ],
        PaymentWasDeleted::class => [
            PaymentDeletedActivity::class,
        ],
        PaymentWasRefunded::class => [
            PaymentRefundedActivity::class,
        ],
        PaymentWasVoided::class => [
            PaymentVoidedActivity::class,
        ],
        //Invoices
        InvoiceWasMarkedSent::class => [
            CreateInvoiceHtmlBackup::class,
        ],
        InvoiceWasUpdated::class => [
            UpdateInvoiceActivity::class
        ],
        InvoiceWasCreated::class => [
            CreateInvoiceActivity::class
        ],
        InvoiceWasPaid::class => [
            CreateInvoiceHtmlBackup::class,
        ],
        InvoiceWasEmailed::class => [
            InvoiceEmailActivity::class,
            InvoiceEmailedNotification::class,
        ],
        InvoiceWasEmailedAndFailed::class => [
            InvoiceEmailFailedActivity::class,
        ],
        InvitationWasViewed::class => [
            InvitationViewedListener::class
        ],
        LeadWasCreated::class => [
            LeadNotification::class
        ],
        DealWasCreated::class => [
            DealNotification::class
        ],
        AccountWasDeleted::class => [
            DeleteAccountDocuments::class,
        ],
    ];

    /**
     * The subscriber classes to register.
     *
     * @var array
     */
    protected $subscribe = [

    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
