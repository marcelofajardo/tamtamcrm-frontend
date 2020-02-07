<?php
namespace App\Mail;

use App\Transformations\AddressTransformable;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Task;

class sendEmailNotificationToAdminMailable extends Mailable
{
    use Queueable, SerializesModels, AddressTransformable;
    public $task;

    /**
     * Create a new message instance.
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
            'address' => $this->task->customer->address,
            'status' => $this->task->taskStatus
        ];

        return $this->view('emails.admin.OrderNotificationEmail', $data);
    }
}
