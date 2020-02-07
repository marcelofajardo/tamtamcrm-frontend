<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class CompanyLedger extends Model
{

    protected $casts = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
        'deleted_at' => 'timestamp',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function company_ledgerable()
    {
        return $this->morphTo();
    }
}
