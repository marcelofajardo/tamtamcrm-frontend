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

namespace App\Jobs\Company;

use App\DataMapper\CompanySettings;
use App\Events\UserSignedUp;
use App\Account;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;

class CreateCompany
{
    use Dispatchable;
    protected $request;
    protected $domain;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $request, $domain = null)
    {
        $this->request = $request;
        $this->domain = $domain;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): ?Account
    {
        $settings = CompanySettings::defaults();

        $settings->name = isset($this->request['name']) ? $this->request['name'] : '';
        $company = new Account();
        $company->domain_id = $this->domain->id ?? 1;
        $company->ip = request()->ip();
        $company->settings = $settings;
        $company->subdomain = isset($this->request['domain']) ? $this->request['domain'] : config('ninja.site_url');
        $company->save();

        //$company->notification(new NewAccountCreated($user, $company))->run();

        return $company;
    }
}
