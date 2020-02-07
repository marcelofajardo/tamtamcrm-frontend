<?php

namespace App\Services\Interfaces;

use App\Requests\CreateUserRequest;
use App\Requests\UpdateUserRequest;
use App\Requests\SearchRequest;
use Illuminate\Http\Request;

interface UserServiceInterface
{

    /**
     *
     * @param SearchRequest $request
     */
    public function search(SearchRequest $request);

    /**
     *
     * @param CreateUserRequest $request
     */
    public function create(CreateUserRequest $request);

    /**
     *
     * @param int $id
     */
    public function delete(int $id);

    /**
     *
     * @param UpdateUserRequest $request
     * @param int $id
     */
    public function update(UpdateUserRequest $request, int $id);

    /**
     *
     * @param Request $request
     */
    public function upload(Request $request);
}
