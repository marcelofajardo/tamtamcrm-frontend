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

namespace App\Factory;

use App\Project;

class ProjectFactory
{
    public static function create(int $user_id, int $customer_id, int $account_id): Project
    {
        $project = new Project;
        $project->title = '';
        $project->description = '';
        $project->notes = '';
        $project->due_date = null;
        $project->budgeted_hours = null;
        $project->customer_id = $customer_id;
        $project->account_id = $account_id;
        $project->user_id = $user_id;
        return $project;
    }
}
