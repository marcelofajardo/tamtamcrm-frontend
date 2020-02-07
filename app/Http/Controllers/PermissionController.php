<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\PermissionRepository;
use App\Transformations\PermissionTransformable;
use App\Permission;
use App\Requests\CreatePermissionRequest;
use App\Requests\UpdatePermissionRequest;
use App\Requests\SearchRequest;

class PermissionController extends Controller
{

    use PermissionTransformable;

    /**
     * @var PermissionRepository
     */
    private $permRepo;

    /**
     * PermissionController constructor.
     *
     * @param PermissionRepository $permissionRepository
     */
    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permRepo = $permissionRepository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(SearchRequest $request)
    {

        $orderBy = !$request->column ? 'name' : $request->column;
        $orderDir = !$request->order ? 'asc' : $request->order;
        $recordsPerPage = !$request->per_page ? 0 : $request->per_page;

        if (request()->has('search_term') && !empty($request->search_term)) {
            $list = $this->permRepo->searchPermission(request()->input('search_term'));
        } else {
            $list = $this->permRepo->listPermissions(['*'], $orderBy, $orderDir);
        }

        $permissions = $list->map(function (Permission $permission) {
            return $this->transformPermission($permission);
        })->all();

        if ($recordsPerPage > 0) {
            $paginatedResults = $this->permRepo->paginateArrayResults($permissions, $recordsPerPage);
            return $paginatedResults->toJson();
        }

        return response()->json($permissions);
    }

    /**
     * @param CreateRoleRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreatePermissionRequest $request)
    {
        $permissionObj = $this->permRepo->createPermission($request->all());
        $permission = $this->transformPermission($permissionObj);
        return $permission->toJson();
    }

    /**
     * @param UpdatePermissionRequest $request
     * @param $id
     *
     * @return json
     */
    public function update(UpdatePermissionRequest $request, $id)
    {
        $permission = $this->permRepo->findPermissionById($id);
        $update = new PermissionRepository($permission);
        $update->updatePermission($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(int $id)
    {

        $permission = $this->permRepo->findPermissionById($id);

        $permissionRepo = new PermissionRepository($permission);
        $permissionRepo->deletePermissionById();
        return response()->json('Permission deleted!');
    }

}
