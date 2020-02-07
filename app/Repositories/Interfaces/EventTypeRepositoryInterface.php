<?php
namespace App\Repositories\Interfaces;

use App\EventType;

interface EventTypeRepositoryInterface
{
    public function getAll();

    /**
     *
     * @param int $id
     */
    public function findEventTypeById(int $id): EventType;
}
