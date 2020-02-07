<?php

namespace App\Services\Interfaces;

use App\Requests\SearchRequest;
use App\Requests\UpdateCustomerRequest;
use App\Requests\CreateCustomerRequest;
use App\Customer;

interface CustomerServiceInterface
{

    /**
     *
     * @param type $id
     */
    public function delete($id);

    /**
     *
     * @param SearchRequest $request
     */
    public function search(SearchRequest $request);

    /**
     *
     * @param UpdateCustomerRequest $request
     * @param type $id
     */
    public function update(array $request, $id);

    /**
     *
     * @param CreateCustomerRequest $request
     */
    public function create(CreateCustomerRequest $request);

    /**
     *
     * @param Customer $customer
     */
    public function convertCustomerToDeal(Customer $customer);
}
