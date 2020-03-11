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

use App\Quote;

class CloneQuoteFactory
{
    public static function create(Quote $quote, $user_id): ?Quote
    {
        $clone_quote = $quote->replicate();
        $clone_quote->status_id = Quote::STATUS_DRAFT;
        $clone_quote->number = null;
        $clone_quote->date = $quote->date;
        $clone_quote->due_date = $quote->due_date;
        $clone_quote->partial_due_date = null;
        $clone_quote->user_id = $user_id;
        $clone_quote->balance = $quote->total;
        $clone_quote->line_items = $quote->line_items;

        return $clone_quote;
    }
}
