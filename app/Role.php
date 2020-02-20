<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Permission;
use App\Traits\SearchableTrait;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{

    use SearchableTrait;

    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'roles.name' => 10
        ]
    ];
    protected $fillable = ['name', 'description'];

    /**
     * @return BelongsToMany
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    /**
     *
     * @param type $permissions
     * @return type
     */
    public function syncPermissions(...$permissions)
    {
        $this->permissions()->detach();

        foreach ($permissions as $permission) {
            $this->permissions()->sync($permission, false);
        }
    }

    public function attachPermission(Permission $permission)
    {
        $this->permissions()->attach([$permission->id]);
    }

    /**
     * @param $term
     *
     * @return mixed
     */
    public function searchRole($term)
    {
        return self::search($term);
    }

}
