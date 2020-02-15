<?php

namespace App;

use App\ClientContact;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use App\Traits\Inviteable;

/**
 * Class Invitation.
 */
class InvoiceInvitation extends \Illuminate\Database\Eloquent\Model
{

    use SoftDeletes;
    use Inviteable;

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'key',
        'client_contact_id'
    ];

    protected $with = [
         //'account',
     ];

    /**
     * @return mixed
     */
    public function getEntityType()
    {
        return 3;
    }

    public function isSent()
    {
        return $this->sent_date && $this->sent_date != '0000-00-00 00:00:00';
    }

    /**
     * @param null $messageId
     */
    public function markSent($messageId = null)
    {
        $this->message_id = $messageId;
        $this->sent_date = Carbon::now()->toDateTimeString();
        $this->save();
    }

    /**
     * @return mixed
     */
    public function invoice()
    {
        return $this->belongsTo('App\Invoice')->withTrashed();
    }

    /**
     * @return mixed
     */
    public function customer()
    {
        return $this->belongsTo('App\Customer')->withTrashed();
    }

    /**
     * @return mixed
     */
    public function user()
    {
        return $this->belongsTo('App\User')->withTrashed();
    }

    /**
     * @return mixed
     */
    public function contact()
    {
        return $this->belongsTo(ClientContact::class, 'client_contact_id', 'id')->withTrashed();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function account()
    {
        return $this->belongsTo('App\Account');
    }

    public function signatureDiv()
    {
        if (! $this->signature_base64) {
            return false;
        }
        return sprintf('<img src="data:image/svg+xml;base64,%s"></img><p/>%s: %s', $this->signature_base64, ctrans('texts.signed'), $this->createClientDate($this->signature_date, $this->contact->client->timezone()->name));
    }

    public function getName()
    {
        return $this->invitation_key;
    }

    public function markViewed()
    {
        $this->viewed_date = Carbon::now();
        $this->save();
    }

    public function entityType() {
        return Invoice::class;
    }

}
