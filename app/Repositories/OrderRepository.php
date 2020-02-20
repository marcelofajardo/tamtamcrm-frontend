<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 22/12/2019
 * Time: 13:05
 */

namespace App\Repositories;

use App\Order;
use App\Product;
use App\Task;
use App\Repositories\Base\BaseRepository;
use Exception;
use Illuminate\Support\Collection;

class OrderRepository extends BaseRepository
{
    /**
     * OrderRepository constructor.
     *
     * @param Order $order
     */
    public function __construct(Order $order)
    {
        parent::__construct($order);
        $this->model = $order;
    }

    public function getModel()
    {
        return $this->model;
    }

    /**
     * @param int $id
     *
     * @return Order
     * @throws Exception
     */
    public function findOrderById(int $id): Order
    {
        return $this->findOneOrFail($id);
    }

    /**
     * @param array $items
     * @param Task $task
     * @param ProductRepository $product_repo
     * @param Order $order
     * @return bool
     */
    public function buildOrderDetails(array $items, Task $task, ProductRepository $product_repo, Order $order)
    {

        Order::where('task_id', $task->id)->delete();

        foreach ($items as $item) {
            $product = $product_repo->findProductById($item);
            $this->associateProduct($product, $order);
        }

        return true;
    }

    /**
     * @param Product $product
     * @param Order $order
     * @param Task $task
     * @return bool
     */
    public function associateProduct(Product $product, Order $order)
    {

        $attributes = [];

        $range_from = $range_to = $payable_months = $minimum_downpayment = $number_of_years = $interest_rate = 0;
        $attributes = $product->attributes->first();

        if ($attributes && $attributes->count() > 0) {
            $attributes['range_from'] = $attributes->range_from;
            $attributes['range_to'] = $attributes->range_to;
            $attributes['payable_months'] = $attributes->payable_months;
            $attributes['minimum_downpayment'] = $attributes->minimum_downpayment;
            $attributes['number_of_years'] = $attributes->number_of_years;
            $attributes['interest_rate'] = $attributes->interest_rate;
        }

        $order->product_id = $product->id;
        $order->attributes = $attributes;
        $order->name = $product->name;
        $order->sku = $product->sku;

        $order->save();

        return $order;
    }

    /**
     * @param $data
     * @param Order $order
     * @return Order
     */
    public function saveOrder($data, Order $order): Order
    {
        $order->fill($data);
        $order->save();
        return $order;
    }

    public function getOrdersForTask(Task $task): Collection
    {
        return $this->model->where('task_id', '=', $task->id)->get();
    }

}
