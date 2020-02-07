<?php
namespace App\Repositories\Interfaces;

use App\Invoice;
use App\Task;
use App\User;
use App\Project;
use Illuminate\Support\Collection as Support;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Base\BaseRepositoryInterface;

interface TaskRepositoryInterface extends BaseRepositoryInterface
{
    /**
     *
     * @param int $id
     */
    public function findTaskById(int $id) : Task;

    /**
     *
     * @param array $data
     */
    //public function updateTask(array $data) : bool;

    public function save($data, Task $task) : ?Task;

    /**
     *
     */
    public function deleteTask() : bool;

    /**
     *
     * @param type $columns
     * @param string $orderBy
     * @param string $sortBy
     */
    public function listTasks($columns = array('*'), string $orderBy = 'id', string $sortBy = 'asc') : Support;

    /**
     *
     * @param int $task_type
     * @param type $limit
     */
    public function getLeads($limit = null, User $objUser = null, int $account_id) : Support;

    /**
     *
     * @param int $task_type
     * @param type $limit
     */
    public function getDeals($limit = null, User $objUser = null) : Support;

    /**
     *
     * @param Project $objProject
     */
    public function getTasksForProject(Project $objProject, User $objUser = null) : Support;

    /**
     *
     */
    public function getTasksWithProducts(): Support;


    public function getSubtasks(Task $objTask) : Support;
}
