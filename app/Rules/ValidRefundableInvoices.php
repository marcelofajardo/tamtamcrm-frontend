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

namespace App\Rules;

use App\Invoice;
use App\Payment;
use App\Utils\Traits\MakesHash;
use Illuminate\Contracts\Validation\Rule;

class ValidRefundableInvoices implements Rule
{
    /**
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */

    private $error_msg;

    private $input;

    public function __construct($input)
    {
        $this->input = $input;
    }

    public function passes($attribute, $value)
    {

        $payment = Payment::whereId($this->input['id'])->first();

        if (request()->has('amount') && (request()->input('amount') > ($payment->amount - $payment->refunded))) {
            $this->error_msg =
                "Attempting to refunded more than payment amount, enter a value equal to or lower than the payment amount of " .
                $payment->amount;
            return false;
        }

        /*If no invoices has been sent, then we apply the payment to the client account*/
        $invoices = [];

        if (is_array($value)) {
            $invoices = Invoice::whereIn('id', array_column($this->input['invoices'], 'invoice_id'))->get();
        } else {
            return true;
        }

        foreach ($invoices as $invoice) {

            if (!$invoice->isRefundable()) {
                $this->error_msg = "Invoice id " . $invoice->id . " cannot be refunded";
                return false;
            }


            foreach ($this->input['invoices'] as $val) {
                if ($val['invoice_id'] == $invoice->id) {

                    //$pivot_record = $invoice->payments->where('id', $invoice->id)->first();
                    $pivot_record = $payment->paymentables->where('paymentable_id', $invoice->id)->first();

                    if ($val['amount'] > ($pivot_record->amount - $pivot_record->refunded)) {
                        $this->error_msg = "Attempting to refund " . $val['amount'] . " only " .
                            ($pivot_record->amount - $pivot_record->refunded) . " available for refund";
                        return false;
                    }
                }
            }

        }

        return true;
    }

    /**
     * @return string
     */
    public function message()
    {
        return $this->error_msg;
    }
}
