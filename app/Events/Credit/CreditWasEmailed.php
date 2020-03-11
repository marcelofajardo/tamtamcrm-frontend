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

namespace App\Events\Credit;

use App\Credit;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreditWasEmailed
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $credit;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Credit $credit)
    {
        $this->credit = $credit;
    }
}
