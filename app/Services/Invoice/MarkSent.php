<?php

namespace App\Services\Invoice;

use App\Events\Invoice\InvoiceWasMarkedSent;
use App\Jobs\Company\UpdateCompanyLedgerWithInvoice;
use App\Invoice;

class MarkSent
{

    private $customer;

    public function __construct($customer)
    {
        $this->customer = $customer;
    }

    public function __invoke($invoice)
    {

        /* Return immediately if status is not draft */
        if ($invoice->status_id != Invoice::STATUS_DRAFT) {
            return $invoice;
        }

        $invoice->markInvitationsSent();

        $invoice->setReminder();

        event(new InvoiceWasMarkedSent($invoice, $invoice->account));

        $this->customer->service()->updateBalance($invoice->balance)->save();

        $invoice->service()->setStatus(Invoice::STATUS_SENT)->applyNumber()->save();

        UpdateCompanyLedgerWithInvoice::dispatchNow($invoice, $invoice->balance, $invoice->account);

        return $invoice;

    }
}
