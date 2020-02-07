<?php

namespace App\Repositories\Interfaces;

use App\Project;
use Illuminate\Support\Collection;
use App\Repositories\Base\BaseRepositoryInterface;

interface ProjectRepositoryInterface extends BaseRepositoryInterface
{
    public function findProjectById(int $id): Project;

    public function save($data, Project $invoice) : ?Project;

    public function deleteProject(): bool;

    public function listProjects($columns = array('*'), string $orderBy = 'id', string $sortBy = 'asc'): Collection;
}
