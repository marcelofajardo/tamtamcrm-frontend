<?php

namespace App\Services\Task;

use App\Customer;
use App\Events\Invoice\QuoteWasMarkedSent;
use App\Factory\CloneCustomerToContactFactory;
use App\Services\AbstractService;
use App\Task;

/**
 * Class ConvertLead
 * @package App\Services\Task
 */
class ConvertLead extends AbstractService
{
    private $task;

    /**
     * ConvertLead constructor.
     * @param Task $task
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function run()
    {
        $customer = $this->task->customer;
        $this->task->service()->setTaskType(Task::TASK_TYPE_DEAL)->save();
        $customer->service()->setCustomerType(Customer::CUSTOMER_TYPE_WON)->save();

        $client_contact = CloneCustomerToContactFactory::create($customer, $customer->user_id, $customer->account_id);
        $client_contact->save();

        return $this->task;
    }
}
