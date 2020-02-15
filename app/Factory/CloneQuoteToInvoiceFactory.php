<?php
namespace App\Factory;

use App\Invoice;
use App\Quote;

class CloneQuoteToInvoiceFactory
{
    public static function create(Quote $quote, $user_id, $account_id) : ?Invoice
	{
		$invoice = new Invoice();
		$invoice->account_id = $account_id;
		$invoice->customer_id = $quote->customer_id;
		$invoice->user_id = $user_id;
		$invoice->discount_total = $quote->discount_total;
		$invoice->tax_total = $quote->tax_total;
		$invoice->is_amount_discount = $quote->is_amount_discount;
		$invoice->po_number = $quote->po_number;
		$invoice->footer = $quote->footer;
		$invoice->notes = $quote->notes;
		$invoice->terms = $quote->terms;
		$invoice->sub_total = $quote->sub_total;
		$invoice->total = $quote->total;
		$invoice->balance = $quote->balance;
		$invoice->partial = $quote->partial;
		$invoice->partial_due_date = $quote->partial_due_date;
		$invoice->last_viewed = $quote->last_viewed;
		$invoice->status_id = Invoice::STATUS_DRAFT;
		$invoice->number = '';
		$invoice->date = null;
		$invoice->due_date = null;
		$invoice->partial_due_date = null;
		$invoice->balance = $quote->total;
		$invoice->line_items = $quote->line_items;
		return $invoice;
	}
} 
