<?php

namespace App;

use App\Invoice;
use Illuminate\Database\Eloquent\Model;

class InvoiceStatus extends Model
{

    protected $table = 'invoice_status';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

}
