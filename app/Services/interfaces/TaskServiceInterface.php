<?php
namespace App\Services\Interfaces;

use App\Requests\CreateTaskRequest;
use App\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;

interface TaskServiceInterface
{
    /**
     *
     * @param int $task_id
     */
    public function convertLeadToDeal(int $task_id);

    /**
     *
     * @param CreateTaskRequest $request
     */
    public function create(CreateTaskRequest $request);

    /**
     *
     * @param int $task_id
     */
    public function markAsCompleted(int $task_id);

    /**
     *
     * @param type $id
     */
    public function delete($id);

    /**
     *
     * @param UpdateTaskRequest $request
     * @param int $id
     */
    public function update(UpdateTaskRequest $request, int $id);

    /**
     *
     * @param Request $request
     * @param int $id
     */
    public function updateStatus(Request $request, int $id);

    /**
     *
     * @param Request $request
     */
    public function createDeal(Request $request);

    /**
     *
     * @param int $task_id
     * @param Request $request
     */
    public function addProducts(int $task_id, Request $request);
}
