<?php

namespace App\Services;

use App\Factory\CustomerFactory;
use App\Factory\TaskFactory;
use App\Repositories\CustomerRepository;
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

    use TaskTransformable;

    private $entityManager;

    /**
     * @var TaskRepositoryInterface
     */
    private $taskRepository;

    /**
     * @var ProjectRepositoryInterface
     */
    private $projectRepository;

    /**
     * @var CustomerRepositoryInterface
     */
    private $customerRepository;

    /**
     *
     * @param TaskRepositoryInterface $taskRepository
     * @param ProjectRepositoryInterface $projectRepository
     */
    public function __construct(
        TaskRepositoryInterface $taskRepository,
        ProjectRepositoryInterface $projectRepository,
        CustomerRepositoryInterface $customerRepository
    ) {
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
        $this->customerRepository = $customerRepository;
        $this->entityManager = new EntityManager();
    }

    /**
     *
     * @param CreateDealRequest $request
     * @return type
     */
    public function createDeal(Request $request)
    {
        $currentUser = Auth::user();
        $userId = !$currentUser ? 9874 : $currentUser->id;
        $request->customer_type = 2;
        $account_id = 1;
        $factory = (new CustomerFactory())->create($account_id, $userId);

        $date = new \DateTime(); // Y-m-d
        $date->add(new \DateInterval('P30D'));
        $due_date = $date->format('Y-m-d');

        $customer = $this->customerRepository->save($request->except('_token', '_method', 'valued_at',
            'title', 'description'), $factory);
        if ($request->has('address_1') && !empty($request->address_1)) {
            $customer->addresses()->create([
                'company_id' => $request->company_id,
                'job_title' => $request->job_title,
                'address_1' => $request->address_1,
                'address_2' => $request->address_2,
                'zip' => $request->zip,
                'city' => $request->city,
                'country_id' => 225,
                'status' => 1
            ]);
        }

        $taskFactory = (new TaskFactory())->create($userId, $account_id);

        $task = $this->taskRepository->save(
            [
                'due_date' => $due_date,
                'created_by' => $userId,
                'source_type' => $request->source_type,
                'title' => $request->title,
                'description' => $request->description,
                'customer_id' => $customer->id,
                'valued_at' => $request->valued_at,
                'task_type' => $request->task_type,
                'task_status' => $request->task_status
            ], $taskFactory
        );

        if ($request->has('contributors')) {

            $this->taskRepository->syncUsers($task, $request->input('contributors'));
        }

        return $task;
    }

    public function createLead(Request $request)
    {
        $currentUser = Auth::user();
        $userId = !$currentUser ? 9874 : $currentUser->id;
        $request->customer_type = 2;
        $account_id = 1;
        $factory = (new CustomerFactory())->create($account_id, $userId);

        $date = new \DateTime(); // Y-m-d
        $date->add(new \DateInterval('P30D'));
        $due_date = $date->format('Y-m-d');

        $customer = $this->customerRepository->save($request->except('_token', '_method', 'valued_at',
            'title', 'description'), $factory);

        $taskFactory = (new TaskFactory())->create($userId, $account_id);

        $task = $this->taskRepository->save(
            [
                'content' => $request->notes,
                'due_date' => $due_date,
                'created_by' => $userId,
                'source_type' => $request->source_type,
                'title' => $request->title,
                'description' => $request->description,
                'customer_id' => $customer->id,
                'task_type' => $request->task_type,
                'task_status' => $request->task_status
            ], $taskFactory
        );

        if ($request->has('contributors')) {

            $this->taskRepository->syncUsers($task, $request->input('contributors'));
        }

        return $task;
    }

    /**
     *
     * @param int $task_id
     */
    public function convertLeadToDeal(int $task_id)
    {
        $task = $this->taskRepository->findTaskById($task_id);
        $customer = $task->customer;

        $taskRepo = $this->entityManager::getRepository($task);
        $taskRepo->updateTask(['task_type' => 3]);

        $response = (new CustomerRepository($customer))->update(['customer_type' => 1]);

        return $response;
    }
}
