<?php

namespace App\Repositories;

use App\Company;
use App\CompanyContact;
use App\Expense;
use App\Repositories\Base\BaseRepository;
use Illuminate\Support\Str;

/**
 * VendorContactRepository
 */
class CompanyContactRepository extends BaseRepository
{

    /**
     * CompanyContactRepository constructor.
     * @param CompanyContact $contact
     */
    public function __construct(CompanyContact $contact)
    {
        parent::__construct($contact);
        $this->model = $contact;
    }

    public function save($contacts, Company $company): void
    {

        /* Convert array to collection */
        $contacts = collect($contacts);

        /* Get array of IDs which have been removed from the contacts array and soft delete each contact */
        collect($company->contacts->pluck('id'))->diff($contacts->pluck('id'))->each(function ($contact) {
            CompanyContact::destroy($contact);
        });

        $this->is_primary = true;
        /* Set first record to primary - always */
        $contacts = $contacts->sortByDesc('is_primary')->map(function ($contact) {
            $contact['is_primary'] = $this->is_primary;
            $this->is_primary = false;
            return $contact;
        });

        //loop and update/create contacts
        $contacts->each(function ($contact) use ($company) {
            $update_contact = null;

            if (isset($contact['id'])) {
                $update_contact = CompanyContact::find($contact['id']);
            }

            if (!$update_contact) {
                $update_contact = new CompanyContact;
                $update_contact->company_id = $company->id;
                $update_contact->account_id = $company->account_id;
                $update_contact->user_id = $company->user_id;
                $update_contact->contact_key = Str::random(40);
            }

            $update_contact->fill($contact);

            $update_contact->save();
        });

        //always made sure we have one blank contact to maintain state
        if ($contacts->count() == 0) {
            $new_contact = new CompanyContact;
            $new_contact->company_id = $company->id;
            $new_contact->account_id = $company->account_id;
            $new_contact->user_id = $company->user_id;
            $new_contact->contact_key = Str::random(40);
            $new_contact->is_primary = true;
            $new_contact->save();
        }
    }
}
