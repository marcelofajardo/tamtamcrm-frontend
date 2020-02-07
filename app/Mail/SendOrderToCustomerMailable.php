<?php
namespace App\Mail;

use App\Transformations\AddressTransformable;
use App\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendOrderToCustomerMailable extends Mailable
{
    use Queueable, SerializesModels, AddressTransformable;
    public $task;

    /**
     * Create a new message instance.
     *
     * @param Task $task
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data = [
            'task' => $this->task,
            'products' => $this->task->products,
            'customer' => $this->task->customer,
            'address' => $this->task->customer->addresses->first(),
            'status' => $this->task->taskStatus,
            //'product_attributes' => $this->task->products->attributes
        ];

        return $this->view('emails.customer.sendTaskDetailsToCustomer', $data);
        die('good 5');
    }
}
