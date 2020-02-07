<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Task;
use App\Traits\SearchableTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{

    use SearchableTrait;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'customer_id',
        'account_id',
        'assigned_user_id',
        'user_id',
        'account_id',
        'notes',
        'due_date',
        'budgeted_hours'
    ];

    protected $casts = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
    ];

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'projects.title' => 10,
        ]
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }

    /**
     * @param $term
     *
     * @return mixed
     */
    public function searchProject($term)
    {
        return self::search($term);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    /**
     * @return mixed
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class)->withTrashed();
    }
}
