<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 19/12/2019
 * Time: 18:23
 */

namespace App\Helpers\Invoice;

class InvoiceSumInclusive
{
    protected $invoice;

    private $total;

    /**
     * Constructs the object with Invoice and Settings object
     *
     * @param \App\Models\Invoice $invoice The invoice
     */
    public function __construct($invoice)
    {
        $this->invoice = $invoice;
    }

    public function build()
    {
        $this->calculateBalance()
            ->calculatePartial();

        return $this;
    }

    /**
     * Calculates the balance.
     *
     * @return     self  The balance.
     */
    private function calculateBalance()
    {
        //$this->invoice->balance = $this->balance($this->getTotal(), $this->invoice);
        $this->setCalculatedAttributes();

        return $this;
    }

    private function calculatePartial()
    {
        if (!isset($this->invoice->id) && isset($this->invoice->partial)) {
            $this->invoice->partial = max(0,
                min($this->formatValue($this->invoice->partial, 2), $this->invoice->balance));
        }

        return $this;
    }

    public function getInvoice()
    {
        //Build invoice values here and return Invoice
        $this->setCalculatedAttributes();
        $this->invoice->save();

        return $this->invoice;
    }

    /**
     * Build $this->invoice variables after
     * calculations have been performed.
     */
    private function setCalculatedAttributes()
    {
        /* If amount != balance then some money has been paid on the invoice, need to subtract this difference from the total to set the new balance */
        if ($this->invoice->total != $this->invoice->balance) {
            $paid_to_date = $this->invoice->total - $this->invoice->balance;

            $this->invoice->balance = $this->formatValue($this->getTotal(),
                    $this->invoice->customer->currency->precision) - $paid_to_date;
        } else {
            $this->invoice->balance = $this->formatValue($this->getTotal(),
                $this->invoice->customer->currency->precision);
        }

        /* Set new calculated total */
        $this->invoice->total = $this->formatValue($this->getTotal(), $this->invoice->customer->currency->precision);

        return $this;
    }

    public function getTotal()
    {
        return $this->invoice->total;
    }
}
