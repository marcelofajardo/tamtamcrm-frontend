<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 28/12/2019
 * Time: 17:32
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Gateway extends Model
{

    protected $casts = [
        'is_offsite' => 'boolean',
        'is_secure' => 'boolean',
        'recommended' => 'boolean',
        //'visible' => 'boolean',
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
        'default_gateway_type_id' => 'string',
        'fields' => 'json',
    ];
    
    /**
     * Test if gateway is custom
     * @return boolean TRUE|FALSE
     */
    public function isCustom() :bool
    {
        return in_array($this->id, [62, 67, 68]); //static table ids of the custom gateways
    }
}