<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Services\Interfaces;

use Illuminate\Http\Request;
use App\Requests\CreateEventRequest;
use App\Requests\UpdateEventRequest;

/**
 *
 * @author michael.hampton
 */
interface EventServiceInterface
{

    /**
     *
     * @param CreateEventRequest $request
     */
    public function create(CreateEventRequest $request);

    /**
     *
     * @param int $id
     */
    public function delete(int $id);

    /**
     *
     * @param UpdateEventRequest $request
     * @param int $id
     */
    public function update(UpdateEventRequest $request, int $id);

    /**
     *
     * @param type $id
     * @param Request $request
     */
    public function updateEventStatus($id, Request $request);
}
