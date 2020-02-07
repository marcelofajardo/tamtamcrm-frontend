<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\InvoiceRepositoryInterface;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use App\Transformations\OrderTransformable;

class OrderController extends Controller
{
    use OrderTransformable;

    private $order_repo;

    public function __construct(
        OrderRepository $order_repo
    ) {
        $this->order_repo = $order_repo;
    }

    public function update(int $id, Request $request)
    {
        $order = $this->order_repo->findOrderById($id);
        $this->order_repo->saveOrder($request->all(), $order);
        return response()->json($this->transformOrder($order));
    }
}
