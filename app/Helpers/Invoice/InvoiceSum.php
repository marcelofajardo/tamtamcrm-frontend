<?php

namespace App\Helpers\Invoice;

use App\Helpers\Invoice\Balancer;
use App\Helpers\Invoice\CustomValuer;
use App\Helpers\Invoice\Discounter;
use App\Helpers\Invoice\InvoiceItemSum;
use App\Helpers\Invoice\Taxer;
use App\Traits\NumberFormatter;
use Illuminate\Support\Collection;

class InvoiceSum
{
    use NumberFormatter;

    protected $invoice;
    public $tax_map;
    public $invoice_item;
    public $total_taxes;

    /**
     * Constructs the object with Invoice and Settings object
     * InvoiceSum constructor.
     * @param $invoice
     */
    public function __construct($invoice)
    {

        $this->invoice = $invoice;
    }

    public function build()
    {
        $this->calculateBalance()
            ->calculatePartial();
//        $this->calculateLineItems()
//            ->calculateDiscount()
//            ->calculateCustomValues()
//            ->calculateInvoiceTaxes()
//            ->setTaxMap()
//            ->calculateTotals()
//            ->calculateBalance()
//            ->calculatePartial();
        return $this;
    }

    /**
     * Calculates the balance.
     *
     * @return     self  The balance.
     */
    private function calculateBalance()
    {
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

    /**
     * Build $this->invoice variables after
     * calculations have been performed.
     */
    private function setCalculatedAttributes()
    {
        $precision = !empty($this->invoice->customer->currency) ?  $this->invoice->customer->currency->precision : 2;

        /* If amount != balance then some money has been paid on the invoice, need to subtract this difference from the total to set the new balance */
        if ($this->invoice->total != $this->invoice->balance) {
            $paid_to_date = $this->invoice->total - $this->invoice->balance;
            $this->invoice->balance = $this->formatValue($this->invoice->total,
                    $precision) - $paid_to_date;
        } else {
            $this->invoice->balance = $this->formatValue($this->invoice->total,
               $precision);
        }
        /* Set new calculated total */
        $this->invoice->total = $this->formatValue($this->invoice->total,
           $precision);
        return $this;
    }

    public function getInvoice()
    {

        //$this->invoice->save();

        return $this->invoice;
    }

}
