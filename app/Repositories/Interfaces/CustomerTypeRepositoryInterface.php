<?php
namespace App\Repositories\Interfaces;

use App\CustomerType;

interface CustomerTypeRepositoryInterface
{
    public function getAll();

    /**
     *
     * @param int $id
     */
    public function findCustomerTypeById(int $id): CustomerType;
}
