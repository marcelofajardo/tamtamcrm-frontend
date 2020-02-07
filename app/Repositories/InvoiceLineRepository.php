<?php

namespace App\Repositories;

use App\InvoiceLine;
use App\Invoice;
use App\Repositories\Interfaces\InvoiceLineRepositoryInterface;
use App\Repositories\Base\BaseRepository;
use App\Task;
use Illuminate\Support\Collection as Support;
use App\Quote;

class InvoiceLineRepository extends BaseRepository implements InvoiceLineRepositoryInterface
{

    /**
     * InvoiceLineRepository constructor.
     * @param Order $invoiceLine
     */
    public function __construct(InvoiceLine $invoiceLine)
    {
        parent::__construct($invoiceLine);
        $this->model = $invoiceLine;
    }

    /**
     * Create the invoice line
     * @param Invoice $invoice
     * @param array $params
     * @return InvoiceLine
     */
    public function createInvoiceLine(Invoice $invoice, array $params): InvoiceLine
    {
        try {

            $params['invoice_id'] = $invoice->id;

            $invoiceLine = $this->create($params);
            return $invoiceLine;
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * Find the invoice line or fail
     *
     * @param int $id
     *
     * @return InvoiceLine
     * @throws \Exception
     */
    public function findLineById(int $id): InvoiceLine
    {
        return $this->findOneOrFail($id);
    }

    /**
     * Delete a invoice line
     *
     * @return bool
     * @throws \Exception
     */
    public function deleteLine(): bool
    {
        return $this->delete();
    }

    /**
     * Update the customer
     *
     * @param array $params
     *
     * @return bool
     * @throws UpdateCustomerInvalidArgumentException
     */
    public function updateLine(array $params): bool
    {
        return $this->model->update($params);
    }

    /**
     *
     * @param Task $objTask
     * @return type
     */
    public function getInvoiceLinesForTask(Task $objTask, int $finance_type): Support
    {
        return $this->model->join('invoice_task', 'invoice_task.invoice_id', '=', 'invoice_lines.invoice_id')
            ->join('invoices', 'invoice_lines.invoice_id', '=', 'invoices.id')
            ->select('invoice_lines.*')
            ->where('invoice_task.task_id', $objTask->id)
            ->where('invoices.finance_type', $finance_type)
            ->get();
    }

    /**
     *
     * @param Task $objTask
     * @return type
     */
    public function getQuoteLinesForTask(Task $objTask): Support
    {
        return $this->model->join('quote_task', 'quote_task.quote_id', '=', 'invoice_lines.invoice_id')
            ->join('invoices', 'invoice_lines.invoice_id', '=', 'invoices.id')
            ->select('invoice_lines.*')
            ->where('quote_task.task_id', $objTask->id)
            ->where('invoices.finance_type', 2)
            ->get();
    }

    /**
     *
     * @param int $customerId
     * @return type
     */
    public function getInvoiceLinesByInvoiceId(Invoice $objInvoice): Support
    {

        return $this->model->join('invoices', 'invoices.id', '=', 'invoice_lines.invoice_id')
            ->select('invoice_lines.*')
            ->where('invoices.id', $objInvoice->id)
            ->get();
    }

    /**
     *
     * @param Invoice $objInvoice
     * @return bool
     */
    public function deleteAllLines(Invoice $objInvoice): bool
    {

        return $this->model->where('invoice_id', $objInvoice->id)->delete();
    }

    /**
     *
     * @param Invoice $objInvoice
     * @return bool
     */
    public function deleteAllLinesForQuote(Quote $objInvoice): bool
    {

        return $this->model->where('invoice_id', $objInvoice->id)->delete();
    }

}
