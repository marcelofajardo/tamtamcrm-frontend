<?php
namespace App\Repositories\Interfaces;

use App\TaskType;

interface TaskTypeRepositoryInterface
{
    public function getAll();

    /**
     *
     * @param int $id
     */
    public function findTaskTypeById(int $id): TaskType;
}
