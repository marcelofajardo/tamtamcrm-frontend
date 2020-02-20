<?php

namespace App\Requests\Payment;

use App\Payment;
use App\Repositories\Base\BaseFormRequest;
use App\Rules\Payment\ValidRefundableRequest;
use App\Rules\ValidCreditsPresentRule;
use App\Rules\ValidPayableInvoicesRule;
use App\Rules\PaymentAmountsBalanceRule;
use App\Rules\ValidRefundableInvoices;

class RefundPaymentRequest extends BaseFormRequest
{
    protected function prepareForValidation()
    {
        $input = $this->all();
        if (!isset($input['gateway_refund'])) {
            $input['gateway_refund'] = false;
        }

        if (!isset($input['send_email'])) {
            $input['send_email'] = false;
        }

        $test = [];

        if (isset($input['invoices'])) {
            foreach ($input['invoices'] as $key => $invoice) {

                if (!empty($invoice['invoice_id'])) {
                    $test['invoices'][$key]['invoice_id'] = $invoice['invoice_id'];
                    $test['invoices'][$key]['amount'] = $invoice['amount'];
                }
            }

            $input['invoices'] = $test['invoices'];
        }

        if (isset($input['credits'])) {
            unset($input['credits']);
            // foreach($input['credits'] as $key => $credit)
            //     $input['credits'][$key]['credit_id'] = $this->decodePrimaryKey($credit['credit_id']);

        }

        $this->replace($input);
    }

    public function rules()
    {
        $input = $this->all();

        $rules = [
            'id' => 'required',
            'id' => new ValidRefundableRequest($input),
            'amount' => 'numeric',
            'date' => 'required',
            'invoices.*.invoice_id' => 'required',
            'invoices.*.amount' => 'required',
            'invoices' => new ValidRefundableInvoices($input),
        ];

        return $rules;
    }

    public function payment(): ?Payment
    {
        $input = $this->all();

        return Payment::whereId($input['id'])->first();
    }
}
