<?php
namespace App\Factory;

use App\Invoice;

class CloneInvoiceFactory
{
    public static function create(Invoice $invoice, $user_id) : ?Invoice
	{
		$clone_invoice = $invoice->replicate();
		$clone_invoice->status_id = Invoice::STATUS_DRAFT;
		$clone_invoice->number = NULL;
		$clone_invoice->date = $invoice->date;
		$clone_invoice->due_date = $invoice->due_date;
		$clone_invoice->partial_due_date = null;
		$clone_invoice->user_id = $user_id;
		$clone_invoice->balance = $invoice->total;
		$clone_invoice->line_items = $invoice->line_items;
		
		return $clone_invoice;
	}
}
