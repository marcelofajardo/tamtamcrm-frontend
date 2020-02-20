<?php

namespace App\Repositories;

use App\SourceType;
use App\Repositories\Interfaces\SourceTypeRepositoryInterface;
use App\Repositories\Base\BaseRepository;
use Exception;

class SourceTypeRepository extends BaseRepository implements SourceTypeRepositoryInterface
{

    /**
     * SourceTypeRepository constructor.
     *
     * @param SourceType $sourceType
     */
    public function __construct(SourceType $sourceType)
    {
        parent::__construct($sourceType);
        $this->model = $sourceType;
    }

    public function getAll()
    {
        return $this->model->orderBy('name', 'asc')->get();
    }

    /**
     * @param int $id
     *
     * @return SourceType
     * @throws Exception
     */
    public function findSourceById(int $id): SourceType
    {
        return $this->findOneOrFail($id);
    }

}
