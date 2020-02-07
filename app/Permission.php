<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\SearchableTrait;
use App\Role;

class Permission extends Model
{

    use SearchableTrait;

    protected $fillable = [
        'name',
        'display_name',
        'description'
    ];
    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'permissions.name' => 10
        ]
    ];

    /**
     * @param $term
     *
     * @return mixed
     */
    public function searchPermission($term)
    {
        return self::search($term);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'permission_role');
    }

}
