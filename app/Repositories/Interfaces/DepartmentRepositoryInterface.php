<?php

namespace App\Repositories\Interfaces;

use App\Repositories\Base\BaseRepositoryInterface;
use App\Department;
use Illuminate\Support\Collection;

interface DepartmentRepositoryInterface extends BaseRepositoryInterface
{

    /**
     *
     * @param array $data
     */
    public function createDepartment(array $data): Department;

    /**
     *
     * @param string $order
     * @param string $sort
     */
    public function listDepartments(string $order = 'id', string $sort = 'desc'): Collection;

    /**
     *
     * @param int $id
     */
    public function findDepartmentById(int $id);

    /**
     *
     * @param array $data
     */
    public function updateDepartment(array $data): Department;

    /**
     *
     */
    public function deleteDepartment(): bool;
}
