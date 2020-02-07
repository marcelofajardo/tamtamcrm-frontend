<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Interfaces;

use App\Repositories\Base\BaseRepositoryInterface;
use Illuminate\Support\Collection;
use App\Permission;

interface PermissionRepositoryInterface extends BaseRepositoryInterface
{
    /**
     *
     * @param array $data
     */
    public function createPermission(array $data) : Permission;

    /**
     *
     * @param int $id
     */
    public function findPermissionById(int $id) : Permission;

    /**
     *
     * @param array $data
     */
    public function updatePermission(array $data) : bool;

    /**
     *
     */
    public function deletePermissionById() : bool;

    /**
     *
     * @param type $columns
     * @param string $orderBy
     * @param string $sortBy
     */
    public function listPermissions($columns = array('*'), string $orderBy = 'id', string $sortBy = 'asc') : Collection;
}