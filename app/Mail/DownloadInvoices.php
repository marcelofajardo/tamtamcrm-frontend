<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DownloadInvoices extends Mailable
{
    use Queueable, SerializesModels;

    public $file_path;

    public function __construct($file_path)
    {
        $this->file_path = $file_path;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->subject(trans('texts.download_files'))
            ->markdown('email.admin.download_files',['url' => $this->file_path]
        );
    }
}
