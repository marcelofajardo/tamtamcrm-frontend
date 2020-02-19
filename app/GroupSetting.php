<?php
namespace App;
use App\DataMapper\ClientSettings;
use App\DataMapper\CompanySettings;
use App\Customer;
use App\Account;
use App\User;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class GroupSetting extends Model
{
    use SoftDeletes;
    
    public $timestamps = false;
    protected $casts = [
        'settings' => 'object',
        'updated_at' => 'timestamp',
        'deleted_at' => 'timestamp',
    ];
    protected $fillable = [
        'name',
        'settings'
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function customers()
    {
        return $this->hasMany(Customer::class, 'id', 'group_settings_id');
    }
    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value)
    {
        return $this
            ->where('id', $this->decodePrimaryKey($value))->firstOrFail();
    }
}
