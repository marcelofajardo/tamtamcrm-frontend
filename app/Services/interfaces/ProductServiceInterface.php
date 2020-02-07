<?php

namespace App\Services\Interfaces;

use App\Requests\SearchRequest;
use App\Requests\CreateProductRequest;
use App\Requests\UpdateProductRequest;

interface ProductServiceInterface
{

    /**
     *
     * @param SearchRequest $request
     */
    public function search(SearchRequest $request);

    /**
     *
     * @param CreateProductRequest $request
     */
    public function create(CreateProductRequest $request);

    /**
     *
     * @param UpdateProductRequest $request
     * @param int $id
     */
    public function update(UpdateProductRequest $request, int $id);

    /**
     *
     * @param type $id
     */
    public function delete($id);
}
