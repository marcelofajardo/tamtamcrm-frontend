<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Invoice;

class ValidPayableInvoicesRule implements Rule
{
    private $error_msg;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string $attribute
     * @param  mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        /*If no invoices has been sent, then we apply the payment to the client account*/
        $invoices = [];
        if (is_array($value)) {
            $invoices = Invoice::whereIn('id', array_column($value, 'invoice_id'))->get();
        }
        foreach ($invoices as $invoice) {
            if (!$invoice->isPayable()) {
                $this->error_msg = "One or more of these invoices have been paid";
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->error_msg;
    }
}
