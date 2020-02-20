<?php

namespace App\Services\Invoice;

use App\Invoice;
use App\Services\Invoice\GetCreditPdf;
use App\Payment;
use App\Services\Customer\CustomerService;
use App\Services\Invoice\MarkInvoicePaid;
use App\Services\Invoice\ApplyNumber;
use App\Services\Invoice\MarkSent;
use App\Services\Invoice\UpdateBalance;
use Illuminate\Support\Carbon;
use App\Services\Invoice\ApplyPayment;
use App\Services\Invoice\CreateInvitations;

class InvoiceService
{
    protected $invoice;

    protected $customer_service;

    private $payment_service;

    public function __construct($invoice)
    {
        $this->invoice = $invoice;

        $this->customer_service = new CustomerService($invoice->customer);

    }

    /**
     * Marks as invoice as paid
     * and executes child sub functions
     * @return $this InvoiceService object
     */
    /**
     * Marks as invoice as paid
     * and executes child sub functions
     * @return $this InvoiceService object
     */
    public function markPaid()
    {
        $mark_invoice_paid = new MarkPaid($this->customer_service, $this->invoice);

        $this->invoice = $mark_invoice_paid->run();

        return $this;
    }

    public function getInvoicePdf($contact)
    {
        $get_invoice_pdf = new GetInvoicePdf($this->invoice, $contact);

        return $get_invoice_pdf->run();
    }

    /**
     * Applies the invoice number
     * @return $this InvoiceService object
     */
    public function applyNumber()
    {
        $apply_number = new ApplyNumber($this->invoice->customer, $this->invoice);

        $this->invoice = $apply_number->run();

        return $this;
    }

    /**
     * Apply a payment amount to an invoice.
     * @param Payment $payment The Payment
     * @param float $payment_amount The Payment amount
     * @return InvoiceService          Parent class object
     */
    public function applyPayment(Payment $payment, float $payment_amount)
    {
        $apply_payment = new ApplyPayment($this->invoice, $payment, $payment_amount);

        $this->invoice = $apply_payment->run();

        return $this;
    }

    public function createInvitations()
    {
        $create_invitation = new CreateInvitations($this->invoice);

        $this->invoice = $create_invitation->run();

        return $this;
    }

    /**
     * Update an invoice balance
     * @param float $balance_adjustment The amount to adjust the invoice by
     * a negative amount will REDUCE the invoice balance, a positive amount will INCREASE
     * the invoice balance
     * @return InvoiceService                     Parent class object
     */
    public function updateBalance($balance_adjustment)
    {
        $update_balance = new UpdateBalance($this->invoice, $balance_adjustment);

        $this->invoice = $update_balance->run();

        return $this;
    }

    public function markSent()
    {
        $mark_sent = new MarkSent($this->invoice->customer, $this->invoice);

        $this->invoice = $mark_sent->run();

        return $this;
    }

    /* One liners */
    public function setDueDate()
    {
        $this->invoice->due_date = Carbon::now()->addDays($this->invoice->customer->getSetting('payment_terms'));

        return $this;
    }

    public function setStatus($status)
    {
        $this->invoice->status_id = $status;

        return $this;
    }

    public function clearPartial()
    {
        $this->invoice->partial = null;
        $this->invoice->partial_due_date = null;

        return $this;
    }

    public function updatePartial($amount)
    {
        $this->invoice->partial += $amount;

        return $this;
    }

    public function sendEmail($contact = null)
    {
        $send_email = new SendEmail($this->invoice, null, $contact);

        return $send_email->run();
    }

    /**
     * Saves the invoice
     * @return Invoice object
     */
    public function save(): ?Invoice
    {
        $this->invoice->save();
        return $this->invoice;
    }
}
