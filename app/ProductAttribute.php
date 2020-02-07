<?php

namespace App;

use App\Product;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{

    protected $fillable = [
        'range_from',
        'range_to',
        'interest_rate',
        'payable_months',
        'minimum_downpayment',
        'number_of_years'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
