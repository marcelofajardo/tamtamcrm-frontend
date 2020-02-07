<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class CompanyToken extends Model
{
    /**
     * @var bool
     */
    public $timestamps = false;

    protected $with = [
        //    'user',
        //    'company',
    ];

    protected $casts = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
        'deleted_at' => 'timestamp',
    ];

    protected $fillable = [
        'account_id',
        'user_id',
        'domain_id',
        'user_id',
        'token',
        'name'
    ];

    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}