<?php
namespace App\Events\Invoice;

use App\Invoice;
use Illuminate\Queue\SerializesModels;

/**
 * Class InvoiceWasEmailedAndFailed.
 */
class InvoiceWasEmailedAndFailed 
{
    use SerializesModels;
    /**
     * @var Invoice
     */
    public $invoice;
    /**
     * @var array
     */
    public $errors;
    /**
     * Create a new event instance.
     *
     * @param Invoice $invoice
     */
    public function __construct(Invoice $invoice, array $errors)
    {
        $this->invoice = $invoice;
        
        $this->errors = $errors;
    }
}
