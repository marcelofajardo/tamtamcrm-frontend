<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 22/12/2019
 * Time: 13:02
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

/**
 * Class Order
 * @package App
 */
class Order extends Model
{
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

}