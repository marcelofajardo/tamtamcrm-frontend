<?php

namespace App\Console\Commands;

//use App\Models\Account;
use App\Invoice;
use App\Repositories\InvoiceRepository;
use App\Services\InvoiceService;
use DateTime;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Auth;
use Exception;
use App\Libraries\Utils;
use App\Jobs\Cron\RecurringInvoicesCron;

/**
 * Class SendRecurringInvoices.
 */
class SendRecurringInvoices extends Command
{

    /**
     * @var string
     */
    protected $name = 'send-invoices';

    /**
     * @var string
     */
    protected $description = 'Send recurring invoices';


    public function handle()
    {

        dispatch(new RecurringInvoicesCron);
    }
}
