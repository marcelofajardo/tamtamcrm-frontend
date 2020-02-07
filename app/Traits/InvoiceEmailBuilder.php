<?php
namespace App\Traits;

use App\Invoice;
use Illuminate\Support\Carbon;
use Parsedown;

/**
 * Class InvoiceEmailBuilder
 * @package App\Utils\Traits
 */
trait InvoiceEmailBuilder
{
    /**
     * Builds the correct template to send
     * @param  string $reminder_template The template name ie reminder1
     * @return array
     */
    public function getEmailData($reminder_template = null) :array
    {
        //client
        //$client = $this->customer;
        if (!$reminder_template) {
            $reminder_template = $this->calculateTemplate();
        }
        //Need to determine which email template we are producing
        return $this->generateTemplateData($reminder_template);
        
    }

    private function generateTemplateData(string $reminder_template) :array
    {
        $data = [];
        $client = $this->customer;
        $body_template = $client->getSetting('email_template_' . $reminder_template);
        $subject_template = $client->getSetting('email_subject_' . $reminder_template);
        $data['body'] = $this->parseTemplate($body_template, false);
        $data['subject'] = $this->parseTemplate($subject_template, true);

        if($client->getSetting('pdf_email_attachment') !== false) {
             $data['files'][] = $this->pdf_file_path();
        }

        return $data;
    }

    private function parseTemplate(string $template_data, bool $is_markdown = true) :string
    {
        $invoice_variables = $this->makeValues();
        //process variables
        $data = str_replace(array_keys($invoice_variables), array_values($invoice_variables), $template_data);
        //process markdown
        if ($is_markdown) {
            $data = Parsedown::instance()->line($data);
        }
        return $data;
    }

    private function calculateTemplate() :string
    {
        //if invoice is currently a draft, or being marked as sent, this will be the initial email
        $client = $this->customer;
        //if the invoice
        if ($this->status_id == Invoice::STATUS_DRAFT || Carbon::parse($this->due_date) > now()) {
            return 'invoice';
        } else {
            if ($client->getSetting('enable_reminder1') !== false && $this->inReminderWindow($client->getSetting('schedule_reminder1'),
                    $client->getSetting('num_days_reminder1'))
            ) {
                return 'template1';
            } else {
                if ($client->getSetting('enable_reminder2') !== false && $this->inReminderWindow($client->getSetting('schedule_reminder2'),
                        $client->getSetting('num_days_reminder2'))
                ) {
                    return 'template2';
                } else {
                    if ($client->getSetting('enable_reminder3') !== false && $this->inReminderWindow($client->getSetting('schedule_reminder3'),
                            $client->getSetting('num_days_reminder3'))
                    ) {
                        return 'template3';
                    }
                    else
                        return 'invoice';
                }
            }
        }
        //also implement endless reminders here
        //

    }

    private function inReminderWindow($schedule_reminder, $num_days_reminder)
    {
        switch ($schedule_reminder) {
            case 'after_invoice_date':
                return Carbon::parse($this->date)->addDays($num_days_reminder)->startOfDay()->eq(Carbon::now()->startOfDay());
                break;
            case 'before_due_date':
                return Carbon::parse($this->due_date)->subDays($num_days_reminder)->startOfDay()->eq(Carbon::now()->startOfDay());
                break;
            case 'after_due_date':
                return Carbon::parse($this->due_date)->addDays($num_days_reminder)->startOfDay()->eq(Carbon::now()->startOfDay());
                break;
            default:
                # code...
                break;
        }
    }
}
