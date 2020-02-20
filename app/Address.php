<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\SearchableTrait;
use App\Customer;

/**
 * Description of Address
 *
 * @author michael.hampton
 */
class Address extends Model
{

    use SoftDeletes, SearchableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'alias',
        'address_1',
        'address_2',
        'zip',
        'city',
        'state_code',
        'province_id',
        'country_id',
        'customer_id',
        'status',
        'address_type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];
    protected $dates = ['deleted_at'];

    private $repository = 'App\Repositories\AddressRepository';

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        'columns' => [
            'alias' => 5,
            'address_1' => 10,
            'address_2' => 5,
            'zip' => 5,
            'city' => 10,
            'state_code' => 10,
            'phone' => 5
        ]
    ];

    /**
     * @param $term
     *
     * @return mixed
     */
    public function searchAddress($term)
    {
        return self::search($term);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

}
