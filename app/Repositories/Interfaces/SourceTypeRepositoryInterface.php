<?php

namespace App\Repositories\Interfaces;

use App\SourceType;

interface SourceTypeRepositoryInterface
{

    public function getAll();

    /**
     *
     * @param int $id
     */
    public function findSourceById(int $id): SourceType;
}
