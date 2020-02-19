<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 22/12/2019
 * Time: 13:02
 */

namespace App;


use App\Services\Order\OrderService;
use Illuminate\Database\Eloquent\Model;
use Laracasts\Presenter\PresentableTrait;

/**
 * Class Order
 * @package App
 */
class Order extends Model
{
    use PresentableTrait;

    protected $presenter = 'App\Presenters\OrderPresenter';

    protected $fillable = [
        'product_id',
        'task_id',
        'attributes',
        'name',
        'sku',
        'status'
    ];

    protected $casts = [
        'atrributes' => 'object',
    ];

    protected $table = 'product_task';

    const STATUS_PENDING = 1;
    const STATUS_QUOTED = 2;
    const STATUS_INVOICED = 3;

    public function service(): OrderService
    {
        return new OrderService($this);
    }

    public function task()
    {
        return $this->belongsTo('App\Task');
    }

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}