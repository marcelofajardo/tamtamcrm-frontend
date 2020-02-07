<?php

namespace App\Repositories;

use App\Project;
use App\Repositories\Interfaces\ProjectRepositoryInterface;
use App\Repositories\Base\BaseRepository;
use App\Exceptions\CreateProjectErrorException;
use Illuminate\Support\Collection as Support;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface
{

    /**
     * ProjectRepository constructor.
     *
     * @param Project $project
     */
    public function __construct(Project $project)
    {
        parent::__construct($project);
        $this->model = $project;
    }

    public function getModel()
    {
        return $this->model;
    }

    /**
     * @param int $id
     *
     * @return Project
     * @throws \Exception
     */
    public function findProjectById(int $id): Project
    {
        return $this->findOneOrFail($id);
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function deleteProject(): bool
    {
        return $this->delete();
    }

    /**
     * @param array $columns
     * @param string $orderBy
     * @param string $sortBy
     *
     * @return Collection
     */
    public function listProjects($columns = array('*'), string $orderBy = 'id', string $sortBy = 'asc'): Support
    {
        return $this->all($columns, $orderBy, $sortBy);
    }

    /**
     * @param string $text
     * @return mixed
     */
    public function searchProject(string $text = null): Collection
    {
        if (is_null($text)) {
            return $this->all();
        }
        return $this->model->searchProject($text)->get();
    }

    public function save($data, Project $project): ?Project
    {
        $project->fill($data);
        $project->save();

        return $project;
    }
}
