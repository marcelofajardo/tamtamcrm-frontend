<?php

namespace App\Repositories;

use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\DepartmentRepositoryInterface;
use App\Department;
use Illuminate\Support\Collection;

class DepartmentRepository extends BaseRepository implements DepartmentRepositoryInterface
{

    /**
     * @var Department
     */
    protected $model;

    /**
     * DepartmentRepository constructor.
     * @param Department $department
     */
    public function __construct(Department $department)
    {
        parent::__construct($department);
        $this->model = $department;
    }

    /**
     * List all Departments
     *
     * @param string $order
     * @param string $sort
     * @return Collection
     */
    public function listDepartments(string $order = 'id', string $sort = 'desc'): Collection
    {
        return $this->all(['*'], $order, $sort);
    }

    /**
     * @param array $data
     * @return Department
     * @throws CreateDepartmentErrorException
     */
    public function createDepartment(array $data): Department
    {
        $department = new Department($data);

        if (isset($data['parent']) && !empty($data['parent'])) {
            $parent = $this->findDepartmentById($data['parent']);
            $department->parent()->associate($parent);
        }

        $department->save();
        return $department;
    }

    /**
     * @param int $id
     *
     * @return Department
     * @throws DepartmentNotFoundErrorException
     */
    public function findDepartmentById(int $id): Department
    {
        return $this->findOneOrFail($id);
    }

    /**
     * @param array $data
     *
     * @return bool
     * @throws UpdateDepartmentErrorException
     */
    public function updateDepartment(array $data): Department
    {

        $department = $this->findDepartmentById($this->model->id);
        // set parent attribute default value if not set
        $data['parent'] = $data['parent'] ?? 0;

        if ((int)$data['parent'] == 0) {
            $department->saveAsRoot();
        } else {
            $parent = $this->findDepartmentById($data['parent']);
            $department->parent()->associate($parent);
        }
        $department->update($data);

        return $department;
    }

    /**
     * @return bool
     * @throws DeleteDepartmentErrorException
     */
    public function deleteDepartment(): bool
    {
        return $this->delete();
    }

    /**
     * @param string $text
     * @return mixed
     */
    public function searchDepartment(string $text = null): Collection
    {
        if (is_null($text)) {
            return $this->all();
        }
        return $this->model->searchDepartment($text)->get();
    }

}
