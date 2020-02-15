<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 08/12/2019
 * Time: 17:10
 */

namespace App;


use App\Traits\CompanySettingsSaver;
use Illuminate\Database\Eloquent\Model;
use Laracasts\Presenter\PresentableTrait;
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
    use PresentableTrait,
        CompanySettingsSaver;

    protected $presenter = 'App\Presenters\AccountPresenter';

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
        return $this->hasMany(Design::class)->whereAccountId($this->id)->orWhere('account_id',null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class)->withTrashed();
    }

        /**
      * @return \Illuminate\Database\Eloquent\Relations\HasMany
      */
     public function quotes()
     {
         return $this->hasMany(Quote::class)->withTrashed();
     }


     /**
      * @return \Illuminate\Database\Eloquent\Relations\HasMany
      */
     public function credits()
     {
         return $this->hasMany(Credit::class)->withTrashed();
     }

     /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tax_rates()
    {
        return $this->hasMany(TaxRate::class);
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country()
    {
        //return $this->belongsTo(Country::class);
        return Country::find($this->settings->country_id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function companies()
    {
        return $this->hasMany(Company::class)->withTrashed();
    }

}
