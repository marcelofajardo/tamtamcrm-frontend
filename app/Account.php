<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 08/12/2019
 * Time: 17:10
 */

namespace App;


use App\Events\Account\AccountWasDeleted;
use App\Traits\CompanySettingsSaver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laracasts\Presenter\PresentableTrait;
use Illuminate\Notifications\Notification;
use App\Services\Notification\NotificationService;
use App\Credit;
use App\Quote;
use App\Invoice;
use App\Customer;
use App\Product;
use App\TaxRate;
use App\Currency;
use App\Payment;
use App\Design;

class Account extends Model
{
    use PresentableTrait, CompanySettingsSaver;

    protected $presenter = 'App\Presenters\AccountPresenter';

    protected $dispatchesEvents = [
        'deleted' => AccountWasDeleted::class,
    ];

    const ENTITY_RECURRING_INVOICE = 'recurring_invoice';
    const ENTITY_CREDIT = 'credit';
    const ENTITY_QUOTE = 'quote';
    const ENTITY_TASK = 'task';
    const ENTITY_EXPENSE = 'expense';
    const ENTITY_PROJECT = 'project';
    const ENTITY_VENDOR = 'vendor';
    const ENTITY_TICKET = 'ticket';
    const ENTITY_PROPOSAL = 'proposal';
    const ENTITY_RECURRING_QUOTE = 'recurring_quote';
    const ENTITY_RECURRING_EXPENSE = 'recurring_expense';
    const ENTITY_RECURRING_TASK = 'recurring_task';

    public static $modules = [
        self::ENTITY_RECURRING_INVOICE => 1,
        self::ENTITY_CREDIT => 2,
        self::ENTITY_QUOTE => 4,
        self::ENTITY_TASK => 8,
        self::ENTITY_EXPENSE => 16,
        self::ENTITY_PROJECT => 32,
        self::ENTITY_VENDOR => 64,
        self::ENTITY_TICKET => 128,
        self::ENTITY_PROPOSAL => 256,
        self::ENTITY_RECURRING_EXPENSE => 512,
        self::ENTITY_RECURRING_TASK => 1024,
    ];

    protected $fillable = [
        'fill_products',
        'industry_id',
        'subdomain',
        'size_id',
        'custom_fields',
        'enable_product_cost',
        'enable_product_quantity',
        'default_quantity',
        'enable_invoice_quantity',
        'enabled_tax_rates',
        'portal_mode',
        'portal_domain',
        'convert_products',
        'update_products',
        'custom_surcharge_taxes1',
        'custom_surcharge_taxes2',
        'custom_surcharge_taxes3',
        'custom_surcharge_taxes4',
        'show_product_details',
    ];

    protected $casts = [
        'country_id' => 'string',
        'custom_fields' => 'object',
        'settings' => 'object',
        'custom_fields' => 'object',
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
        'deleted_at' => 'timestamp',
    ];

    public function users()
    {
        return $this->hasManyThrough(User::class, AccountUser::class, 'company_id', 'id', 'id', 'user_id');
    }

    public function designs()
    {
        return $this->hasMany(Design::class)->whereAccountId($this->id)->orWhere('account_id', null);
    }

    /**
     * @return HasMany
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class)->withTrashed();
    }

    /**
     * @return HasMany
     */
    public function quotes()
    {
        return $this->hasMany(Quote::class)->withTrashed();
    }


    /**
     * @return HasMany
     */
    public function credits()
    {
        return $this->hasMany(Credit::class)->withTrashed();
    }

    /**
     * @return HasMany
     */
    public function customers()
    {
        return $this->hasMany(Customer::class)->withTrashed();
    }

    public function domains()
    {
        return $this->belongsTo(Domain::class, 'domain_id');
    }


    /**
     * @return mixed
     */
    public function payments()
    {
        return $this->hasMany(Payment::class)->withTrashed();
    }


    /**
     * @return HasMany
     */
    public function tax_rates()
    {
        return $this->hasMany(TaxRate::class);
    }

    /**
     * @return HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * @return BelongsTo
     */
    public function country()
    {
        //return $this->belongsTo(Country::class);
        return Country::find($this->settings->country_id);
    }

    /**
     * @return BelongsTo
     */
    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function getLogo()
    {
        return $this->settings->company_logo ?: null;
    }

    public function domain()
    {
        return 'https://' . $this->subdomain . config('taskmanager.app_domain');
    }

    /**
     * @return HasMany
     */
    public function companies()
    {
        return $this->hasMany(Company::class)->withTrashed();
    }

    public function notification(Notification $notification)
    {
        return new NotificationService($this, $notification);
    }

    public function routeNotificationForSlack($notification)
    {
        //todo need to return the company channel here for hosted users
        //else the env variable for selfhosted
        //
        return $this->slack_webhook_url;

    }

    public function account_users()
    {
        return $this->hasMany(AccountUser::class);
    }

    public function owner()
    {
        $c = $this->account_users->where('is_owner', true)->first();

        return User::find($c->user_id);
    }
}
