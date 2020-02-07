<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\PaymentMethod;
use App\Customer;
use App\Traits\Payment\Refundable;
use App\Invoice;
use App\Paymentable;
use Event;
use App\Events\PaymentWasRefunded;
use App\Traits\GeneratesCounter;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use SoftDeletes;
    use GeneratesCounter;
    use Refundable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type_id',
        'date',
        'number',
        'type_id',
        'amount',
        'customer_id',
        'status_id',
        'refunded',
        'transaction_reference',
        'is_manual'

    ];

    protected $casts = [
        //'line_items' => 'object',
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
        'deleted_at' => 'timestamp',
        'is_deleted' => 'boolean',
    ];

    protected $with = [
        'paymentables',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    const STATUS_PENDING = 1;
    const STATUS_VOIDED = 2;
    const STATUS_FAILED = 3;
    const STATUS_COMPLETED = 4;
    const STATUS_PARTIALLY_REFUNDED = 5;
    const STATUS_REFUNDED = 6;

    const TYPE_CUSTOMER_CREDIT = 2;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class, 'type_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function payment_status()
    {
        return $this->belongsTo(PaymentStatus::class, 'status_id');
    }

    public function paymentables()
     {
         return $this->hasMany(Paymentable::class);
     }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function invoice()
    {
        return $this->morphedByMany(Invoice::class, 'paymentable')->withPivot('amount','refunded')->withTimestamps();
    }

    /**
     * @return bool
     */
    public function isRefunded()
    {
        return $this->status_id == self::STATUS_REFUNDED;
    }

    /**
     * @return bool
     */
    public function isVoided()
    {
        return $this->status_id == self::STATUS_VOIDED;
    }

    /**
     * @return bool
     */
    public function isPartiallyRefunded()
    {
        return $this->status_id == self::STATUS_PARTIALLY_REFUNDED;
    }

    /**
     * @return bool
     */
    public function markVoided()
    {
        if ($this->isVoided() || $this->isPartiallyRefunded() || $this->isRefunded()) {
            return false;
        }
        //Event::fire(new PaymentWasVoided($this));
        $this->refunded = $this->amount;
        $this->status_id = STATUS_VOIDED;
        $this->save();
        return true;
    }

    public function markComplete()
    {
        $this->status_id = STATUS_COMPLETED;
        $this->save();
        //Event::fire(new PaymentCompleted($this));
    }

    /**
     * @param string $failureMessage
     */
    public function markFailed($failureMessage = '')
    {
        $this->status_id = STATUS_FAILED;
        $this->gateway_error = $failureMessage;
        $this->save();
        //Event::fire(new PaymentFailed($this));
    }

    public function invoices()
    {
        return $this->morphedByMany(Invoice::class, 'paymentable')->withPivot('amount');
    }

    public function credits()
    {
        return $this->morphedByMany(Credit::class, 'paymentable')->withPivot('amount','refunded')->withTimestamps();
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function company_ledger()
    {
        return $this->morphMany(CompanyLedger::class, 'company_ledgerable');
    }

    public function refund(array $data) :Payment
    {
        $this->processRefund($data);

        return $this;
    }
}