<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\DepartmentRepository;
use App\Repositories\Interfaces\DepartmentRepositoryInterface;
use App\Requests\CreateDepartmentRequest;
use App\Requests\UpdateDepartmentRequest;
use App\Department;
use App\Transformations\DepartmentTransformable;
use App\Requests\SearchRequest;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\View\View;

class DepartmentController extends Controller
{

    use DepartmentTransformable;

    /**
     * @var DepartmentRepositoryInterface
     */
    private $departmentRepo;

    /**
     * DepartmentController constructor.
     *
     * @param DepartmentRepositoryInterface $departmentRepository
     */
    public function __construct(DepartmentRepositoryInterface $departmentRepository)
    {
        $this->departmentRepo = $departmentRepository;
    }

    /**
     * @return Factory|View
     */
    public function index(SearchRequest $request)
    {
        $orderBy = !$request->column ? 'name' : $request->column;
        $orderDir = !$request->order ? 'asc' : $request->order;
        $recordsPerPage = !$request->per_page ? 0 : $request->per_page;

        if (request()->has('search_term') && !empty($request->search_term)) {
            $list = $this->departmentRepo->searchDepartment(request()->input('search_term'));
        } else {
            $list = $this->departmentRepo->listDepartments($orderBy, $orderDir);
        }

        $departments = $list->map(function (Department $department) {
            return $this->transformDepartment($department);
        })->all();

        if ($recordsPerPage > 0) {
            $paginatedResults = $this->departmentRepo->paginateArrayResults($departments, $recordsPerPage);
            return $paginatedResults->toJson();
        }

        return collect($departments)->toJson();
    }

    /**
     * @param CreateDepartmentRequest $request
     *
     * @return RedirectResponse
     */
    public function store(CreateDepartmentRequest $request)
    {
        $departmentObj = $this->departmentRepo->createDepartment($request->except('_method', '_token'));
        $department = $this->transformDepartment($departmentObj);
        return $department->toJson();
    }

    /**
     * @param UpdateDepartmentRequest $request
     * @param $id
     *
     * @return Factory|View
     */
    public function update(UpdateDepartmentRequest $request, $id)
    {
        $department = $this->departmentRepo->findDepartmentById($id);

        if ($request->has('permissions')) {
            $departmentRepo = new DepartmentRepository($department);
            $departmentRepo->syncPermissions($request->input('permissions'));
        }

        $update = new DepartmentRepository($department);
        $data = $request->except('_method', '_token', 'permissions');
        $update->updateDepartment($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return Response
     * @throws Exception
     */
    public function destroy($id)
    {

        $department = $this->departmentRepo->findDepartmentById($id);

        $departmentRepo = new DepartmentRepository($department);
        $departmentRepo->deleteDepartment();
        return response()->json('Customer deleted!');
    }

}
