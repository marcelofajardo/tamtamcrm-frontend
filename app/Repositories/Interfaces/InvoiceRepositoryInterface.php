<?php
namespace App\Repositories\Interfaces;

use App\Invoice;
use App\Task;
use Illuminate\Support\Collection;

interface InvoiceRepositoryInterface
{
    /**
     *
     * @param string $order
     * @param string $sort
     * @param array $columns
     */
    public function listInvoices(string $order = 'id', string $sort = 'desc', array $columns = ['*']): Collection;

    public function save($data, Invoice $invoice) : ?Invoice;

    /**
     *
     * @param int $id
     */
    public function findInvoiceById(int $id): Invoice;

    /**
     *
     * @param \App\Repositories\Interfaces\Task $objTask
     */
    public function getInvoiceForTask(Task $objTask): Invoice;

    public function deleteInvoice(): bool;

    public function findInvoicesByStatus(int $status) : Collection;

}