<?php
/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

namespace App\Traits;

/**
 * Class Inviteable
 * @package App\Utils\Traits
 */
trait Inviteable
{
    /**
     * Gets the status.
     *
     * @return     string  The status.
     */
    public function getStatus(): string
    {
        $status = '';
        if (isset($this->sent_date)) {
            $status = 'sent';
        }

        if (isset($this->opened_date)) {
            $status = 'opened';
        }

        if (isset($this->viewed_date)) {
            $status = 'viewed';
        }
        return $status;
    }

    public function getAdminLink() :string
    {
        return $this->getLink(). '?silent=true';
    }

    public function getLink(): string
    {
        $entity_type = strtolower(class_basename($this->entityType()));
        //$this->with('company','contact',$this->entity_type);
        $this->with('account');
        $domain = isset($this->account->portal_domain) ?: $this->account->domain();
        switch ($this->account->portal_mode) {
            case 'subdomain':
                return $domain . '/customer/' . $entity_type . '/' . $this->key;
                break;
            case 'iframe':
                return $domain . '/customer/' . $entity_type . '/' . $this->key;
                //return $domain . $entity_type .'/'. $this->contact->client->client_hash .'/'. $this->key;
                break;
            case 'domain':
                return $domain . '/customer/' . $entity_type . '/' . $this->key;
                break;
        }
    }
}
