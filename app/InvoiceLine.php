<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of InvoiceLine
 *
 * @author michael.hampton
 */
class InvoiceLine extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quantity',
        'sub_total',
        'tax_total',
        'unit_tax',
        'unit_discount',
        'unit_price',
        'invoice_id',
        'status',
        'product_id'
    ];

}
