<?php
/**
 * Created by PhpStorm.
 * User: michael.hampton
 * Date: 14/02/2020
 * Time: 19:51
 */

namespace App\Helpers\Email;


use App\Invoice;

class OrderEmail extends EmailBuilder
{
    public function build($order, $client)
    {
        //$body_template = $client->getSetting('email_template_order');
        $body_template = '';

        /* Use default translations if a custom message has not been set*/
        if (iconv_strlen($body_template) == 0) {
            $body_template = trans('texts.order_message', [
                'amount' => $order->product->price,
                'account' => $order->account->present()->name()
            ], null, $order->task->customer->locale());
        }

        //$subject_template = $client->getSetting('email_subject_' . $reminder_template);
        $subject_template = '';

        if (iconv_strlen($subject_template) == 0) {
            $subject_template = trans('texts.order_subject', [
                'number' => $order->id,
                'account' => $order->account->present()->name()
            ], null, $order->task->customer->locale());
        }

        $this->setTemplate($order->task->customer->getSetting('email_style'))->setSubject($subject_template)
             ->setBody($body_template);

//        if ($client->getSetting('pdf_email_attachment') !== false) {
//            $this->setAttachments($invoice->pdf_file_path());
//        }
        return $this;
    }
}
