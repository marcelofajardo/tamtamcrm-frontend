<?php

namespace App\DataMapper;

class InvoiceItem
{
    public $quantity = 0;
    public $unit_price = 0;
    public $product_id = 0;
    public $unit_discount = 0;
    public $unit_tax = 0;
    public $tax_total = 0;
    public $is_amount_discount = false;
    public $sub_total = 0;
    public $custom_value1 = '';
    public $custom_value2 = '';
    public $custom_value3 = '';
    public $custom_value4 = '';
    public $line_item_type_id = 1; //1 = product, 2 = service, 3 unpaid gateway fee, 4 paid gateway fee

    public static $casts = [
        'line_item_type_id' => 'string',
        'quantity' => 'float',
        'unit_price' => 'float',
        'product_id' => 'int',
        'unit_discount' => 'float',
        'is_amount_discount' => 'bool',
        'unit_tax' => 'float',
        'tax_total' => 'float',
        'sub_total' => 'float',
        'date' => 'string',
        'custom_value1' => 'string',
        'custom_value2' => 'string',
        'custom_value3' => 'string',
        'custom_value4' => 'string',
    ];
}
