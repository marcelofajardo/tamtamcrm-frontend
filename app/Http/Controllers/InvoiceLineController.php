<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\InvoiceRepositoryInterface;
use App\Repositories\Interfaces\QuoteRepositoryInterface;
use App\Repositories\InvoiceLineRepository;
use App\Repositories\Interfaces\InvoiceLineRepositoryInterface;
use App\Transformations\InvoiceTransformable;
use App\Repositories\TaskRepository;
use App\Task;
use Illuminate\Http\Response;

class InvoiceLineController extends Controller
{

    use InvoiceTransformable;

    private $invoiceLineRepository;

    private $quoteRepository;

    public function __construct(InvoiceRepositoryInterface $invoiceRepository,
        QuoteRepositoryInterface $quoteRepository,
        InvoiceLineRepositoryInterface $invoiceLineRepository)
    {
        $this->invoiceRepository = $invoiceRepository;
        $this->quoteRepository = $quoteRepository;
        $this->invoiceLineRepository = $invoiceLineRepository;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return Response
     * @throws Exception
     */
    public function destroyLine(int $id)
    {
        $customer = $this->invoiceLineRepository->findLineById($id);
        $customerRepo = new InvoiceLineRepository($customer);
        $customerRepo->deleteLine();
    }

    /**
     *
     * @param int $id
     * @param Request $request
     */
    public function updateLine(int $id, Request $request)
    {

        $invoiceLine = $this->invoiceLineRepository->findLineById($id);

        $update = new InvoiceLineRepository($invoiceLine);

        $update->updateLine($request->all());
    }

    /**
     *
     * @param int $task_id
     * @return type
     */
    public function getInvoiceLinesForTask(int $task_id, int $finance_type)
    {
        $task = (new TaskRepository(new Task))->findTaskById($task_id);

        if ($finance_type === 2) {
            $invoice = $this->quoteRepository->getQuoteForTask($task);

        } else {
            $invoice = $this->invoiceRepository->getInvoiceForTask($task, $finance_type);
            $lines = $this->invoiceLineRepository->getInvoiceLinesForTask($task, $finance_type);
        }


        if (!$invoice->count()) {
            return response()->json('empty');
        }


        $arrTest = [
            'lines' => $invoice->line_items,
            'invoice' => $invoice
        ];

        return response()->json($arrTest);
    }

}
