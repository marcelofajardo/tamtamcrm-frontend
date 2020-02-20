<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExpenseCategory extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'name',
    ];

    /**
     * @return BelongsTo
     */
    public function expense()
    {
        return $this->belongsTo('App\Expense');
    }
}
