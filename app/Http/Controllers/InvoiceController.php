<?php

namespace App\Http\Controllers;

use App\Account;
use App\Factory\CloneInvoiceFactory;
use App\Factory\CloneInvoiceToQuoteFactory;
use App\Factory\NotificationFactory;
use App\Jobs\Invoice\CreateInvoicePdf;
use App\Jobs\Order\InvoiceOrders;
use App\Jobs\RecurringInvoice\SaveRecurringInvoice;
use App\Quote;
use App\RecurringInvoice;
use App\Repositories\AccountRepository;
use App\Repositories\NotificationRepository;
use App\Repositories\QuoteRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\InvoiceRepositoryInterface;
use App\Repositories\Interfaces\InvoiceLineRepositoryInterface;
use App\Transformations\InvoiceTransformable;
use App\Invoice;
use App\Requests\SearchRequest;
use App\Requests\Invoice\CreateInvoiceRequest;
use Illuminate\Support\Facades\Mail;
use App\Jobs\Invoice\MarkInvoicePaid;
use App\Factory\InvoiceFactory;
use App\Factory\RecurringInvoiceFactory;
use App\Repositories\RecurringInvoiceRepository;
use App\Jobs\Invoice\StoreInvoice;
use App\Events\Invoice\InvoiceWasUpdated;
use App\Events\Invoice\InvoiceWasCreated;
use App\Notifications\InvoiceCreated;
use App\Filters\InvoiceFilter;
use Illuminate\Support\Facades\Notification;
use App\Jobs\Invoice\EmailInvoice;
use App\Repositories\TaskRepository;
use App\Task;
use App\Traits\CheckEntityStatus;

class InvoiceController extends Controller
{

    use InvoiceTransformable,
        CheckEntityStatus;

    private $invoiceRepository;
    private $invoiceLineRepository;

    /**
     * InvoiceController constructor.
     * @param InvoiceRepositoryInterface $invoice_repo
     */
    public function __construct(
        InvoiceRepositoryInterface $invoice_repo
    ) {
        $this->invoice_repo = $invoice_repo;
    }

    /**
     *
     * @param Request $request
     * @return type
     */
    public function index(SearchRequest $request)
    {
        $invoices = (new InvoiceFilter($this->invoice_repo))->filter($request,
            auth()->user()->account_user()->account_id);
        return response()->json($invoices);
    }

    public function getInvoicesByStatus(int $status)
    {
        $invoices = $this->invoice_repo->findInvoicesByStatus($status);
        return response()->json($invoices);
    }

    /**
     * @param CreateInvoiceRequest $request
     * @return string
     */
    public function store(CreateInvoiceRequest $request)
    {
        $invoice = $this->invoice_repo->save($request->all(),
            InvoiceFactory::create($request->customer_id, auth()->user()->id,
                auth()->user()->account_user()->account_id, $request->total));
        $invoice = StoreInvoice::dispatchNow($invoice,
            $request->all(),
            $invoice->account); //todo potentially this may return mixed ie PDF/$invoice... need to revisit when we implement UI
        InvoiceOrders::dispatchNow($invoice);
        $notification = NotificationFactory::create(auth()->user()->account_user()->account_id, auth()->user()->id);
        (new NotificationRepository(new \App\Notification))->save($notification, [
            'data' => json_encode(['id' => $invoice->id, 'message' => 'A new invoice was created']),
            'type' => 'App\Notifications\InvoiceCreated'
        ]);


        SaveRecurringInvoice::dispatchNow($request, $invoice->account, $invoice);

        $invoiceTransformed = $this->transformInvoice($invoice);
        return $invoiceTransformed->toJson();
    }

    /**
     * @param int $invoice_id
     * @return mixed
     */
    public function show(int $invoice_id)
    {

        $invoice = $this->invoice_repo->findInvoiceById($invoice_id);
        return response()->json($this->transformInvoice($invoice));
    }

    /**
     * @param int $task_id
     * @return mixed
     * @throws \Exception
     */
    public function getInvoiceLinesForTask(int $task_id)
    {
        $task = (new TaskRepository(new Task))->findTaskById($task_id);
        $invoice = $this->invoice_repo->getInvoiceForTask($task);

        if (!$invoice->count()) {
            return response()->json('empty');
        }

        $arrTest = [
            'lines' => $invoice->line_items,
            'invoice' => $invoice
        ];

        return response()->json($arrTest);
    }

    /**
     * @param int $id
     * @param Request $request
     * @return mixed
     */
    public function update(int $id, Request $request)
    {
        $invoice = $this->invoice_repo->findInvoiceById($id);

        if ($this->entityIsDeleted($invoice)) {
            return $this->disallowUpdate();
        }

        $invoice = $this->invoice_repo->save($request->all(), $invoice);
        //SaveRecurringInvoice::dispatchNow($request, $invoice->account);
        InvoiceOrders::dispatchNow($invoice);
        event(new InvoiceWasUpdated($invoice, $invoice->account));
        $invoiceTransformed = $this->transformInvoice($invoice);
        return $invoiceTransformed->toJson();
    }

    public function action(Request $request, Invoice $invoice, $action)
    {
        return $this->performAction($invoice, $request, $action);
    }

    private function performAction(Invoice $invoice, Request $request, $action, $bulk = false)
    {
        switch ($action) {
            case 'clone_to_invoice':
                $invoice = CloneInvoiceFactory::create($invoice, auth()->user()->id);
                $this->invoice_repo->save($request->all(), $invoice);
                return response()->json($invoice);
                break;
            case 'clone_to_quote':
                $quote = CloneInvoiceToQuoteFactory::create($invoice, auth()->user()->id);
                (new QuoteRepository(new Quote))->save($request->all(), $quote);
                // todo build the quote transformer and return response here
                break;
            case 'history':
                # code...
                break;
            case 'delivery_note':
                # code...
                break;
            case 'mark_paid':
                if ($invoice->balance < 0 || $invoice->status_id == Invoice::STATUS_PAID || $invoice->is_deleted === true) {
                    return response()->json('Invoice cannot be marked as paid', 400);
                }
                $invoice = $invoice->service()->markPaid();
                if (!$bulk) {
                    return response()->json($invoice);
                }
                break;
            case 'mark_sent':
                $invoice->service()->markSent();
                if (!$bulk) {
                    return response()->json($invoice);
                }
                break;
            case 'download':
                $headers = array('Content-Type: pdf');
                $contents = file_get_contents(public_path($invoice->service()->getInvoicePdf(null)));
                //$contents = file_get_contents(public_path($invoice->pdf_file_path()));
                return response()->json(['data' => base64_encode($contents)]);
                //return response()->download(public_path($invoice->pdf_file_path()), 'test.pdf', $headers);
                break;
            case 'archive':
                $this->invoice_repo->archive($invoice);
                if (!$bulk) {
                    return response()->json($invoice);
                }
                break;
            case 'delete':
                $this->invoice_repo->newDelete($invoice);
                if (!$bulk) {
                    return response()->json($invoice);
                }
                break;
            case 'email':
                $invoice->service()->sendEmail(null);
                if (!$bulk) {
                    return response()->json(['message' => 'email sent'], 200);
                }
                break;
            default:
                return response()->json(['message' => "The requested action `{$action}` is not available."], 400);
                break;
        }
    }

    public function downloadPdf($invitation_key) {
        $invitation = $this->invoice_repo->getInvitationByKey($invitation_key);
        $contact    = $invitation->contact;
        $invoice    = $invitation->invoice;

        $file_path = $invoice->service()->getInvoicePdf();

        return response()->download($file_path);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function archive(int $id)
    {
        $invoice = $this->invoice_repo->findInvoiceById($id);
        $this->invoice_repo->archive($invoice);
        return response()->json([], 200);
    }

    public function destroy(int $id)
    {
        $invoice = Invoice::withTrashed()->where('id', '=', $id)->first();
        $this->invoice_repo->newDelete($invoice);
        return response()->json([], 200);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function restore(int $id)
    {
        $invoice = Invoice::withTrashed()->where('id', '=', $id)->first();
        $this->invoice_repo->restore($invoice);
        return response()->json([], 200);
    }

    public function bulk()
    {
        $action = request()->input('action');

        $ids = request()->input('ids');
        $invoices = Invoice::withTrashed()->whereIn('id', $ids);
        if (!$invoices) {
            return response()->json(['message' => 'No Invoices Found']);
        }
        $invoices->each(function ($invoice, $key) use ($action) {
//      $this->invoice_repo->{$action}($invoice);
            $this->performAction($invoice, request(), $action, true);
        });
        return response()->json(Invoice::withTrashed()->whereIn('id', $ids));
    }
}
