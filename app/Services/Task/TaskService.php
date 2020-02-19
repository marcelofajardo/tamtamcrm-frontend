<?php

namespace App\Services\Task;

use App\Factory\CustomerFactory;
use App\Factory\TaskFactory;
use App\Repositories\CustomerRepository;
use App\Services\Task\ConvertLead;
use Illuminate\Http\Request;
use App\Task;
use App\Repositories\Interfaces\TaskRepositoryInterface;
use App\Repositories\Interfaces\ProjectRepositoryInterface;
use App\Repositories\Interfaces\CustomerRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use App\Transformations\TaskTransformable;
use Illuminate\Support\Facades\Notification;
use App\Notifications\TaskCreated;
use App\Services\EntityManager;

class TaskService
{
    protected $task;

    public function __construct($task)
    {
        $this->task = $task;
    }

    /**
     * Applies the invoice number
     * @return $this InvoiceService object
     */
    public function convertLead()
    {
        $convert_lead = new ConvertLead($this->task);

        $this->task = $convert_lead->run();

        return $this;
    }

    /**
     * Applies the invoice number
     * @return $this InvoiceService object
     */
    public function createDeal(Request $request, $customer_repo, $task_repo, $is_deal = true)
    {
        $create_deal = new CreateDeal($this->task, $request, $customer_repo, $task_repo, $is_deal);

        $this->task = $create_deal->run();

        return $this->task;
    }

    public function setTaskType($task_type)
    {
        $this->task->task_type = $task_type;

        return $this;
    }

    /**
     * Saves the quote
     * @return Quote|null
     */
    public function save() : ?Task
    {
        $this->task->save();
        return $this->task;
    }
}
