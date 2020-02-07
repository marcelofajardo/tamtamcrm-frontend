<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Interfaces;

use App\Repositories\Base\BaseRepositoryInterface;
use App\Customer;
use Illuminate\Support\Collection as Support;

/**
 *
 * @author michael.hampton
 */
interface CustomerRepositoryInterface extends BaseRepositoryInterface
{

    /**
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     */
    public function listCustomers(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Support;

    /**
     *
     * @param int $id
     */
    public function findCustomerById(int $id): Customer;

    /**
     *
     */
    public function deleteCustomer(): bool;
}
