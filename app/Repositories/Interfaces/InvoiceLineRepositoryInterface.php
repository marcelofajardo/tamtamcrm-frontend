<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Interfaces;

use App\InvoiceLine;
use App\Invoice;
use Illuminate\Support\Collection as Support;
use App\Task;

/**
 * Description of InvoiceLineRepositoryInterface
 *
 * @author michael.hampton
 */
interface InvoiceLineRepositoryInterface
{
    /**
     *
     * @param array $params
     */
    public function createInvoiceLine(Invoice $invoice, array $params): InvoiceLine;

    /**
     *
     * @param array $params
     */
    public function updateLine(array $params): bool;

    /**
     *
     * @param int $id
     */
    public function findLineById(int $id): InvoiceLine;

    /**
     *
     */
    public function deleteLine(): bool;

    /**
     *
     */
    public function getInvoiceLinesForTask(Task $objTask, int $finance_type): Support;

    /**
     *
     * @param Invoice $objInvoice
     */
    public function getInvoiceLinesByInvoiceId(Invoice $objInvoice): Support;
}
