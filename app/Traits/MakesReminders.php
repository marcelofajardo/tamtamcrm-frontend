<?php
/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

namespace App\Traits;

use Illuminate\Support\Carbon;

/**
 * Class MakesReminders.
 */
trait MakesReminders
{

    public function setReminder($settings = null)
    {
        if (!$settings) {
            $settings = $this->customer->getMergedSettings();
        }

        if (!$this->isPayable()) {
            $this->next_send_date = null;
            $this->save();
            return; //exit early
        }

        $nsd = null;

        if ($settings->enable_reminder1 !== false && $settings->schedule_reminder1 == 'after_invoice_date' &&
            $settings->num_days_reminder1 > 0) {
            $reminder_date = Carbon::parse($this->date)->addDays($settings->num_days_reminder1);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }

        }

        if ($settings->enable_reminder1 !== false && $settings->schedule_reminder1 == 'before_due_date' &&
            $settings->num_days_reminder1 > 0) {
            $reminder_date = Carbon::parse($this->due_date)->subDays($settings->num_days_reminder1);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }
        }


        if ($settings->enable_reminder1 !== false && $settings->schedule_reminder1 == 'after_due_date' &&
            $settings->num_days_reminder1 > 0) {
            $reminder_date = Carbon::parse($this->due_date)->addDays($settings->num_days_reminder1);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }
        }

        if ($settings->enable_reminder2 !== false && $settings->schedule_reminder2 == 'after_invoice_date' &&
            $settings->num_days_reminder2 > 0) {
            $reminder_date = Carbon::parse($this->date)->addDays($settings->num_days_reminder2);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }

        }

        if ($settings->enable_reminder2 !== false && $settings->schedule_reminder2 == 'before_due_date' &&
            $settings->num_days_reminder2 > 0) {
            $reminder_date = Carbon::parse($this->due_date)->subDays($settings->num_days_reminder2);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }
        }


        if ($settings->enable_reminder2 !== false && $settings->schedule_reminder2 == 'after_due_date' &&
            $settings->num_days_reminder2 > 0) {
            $reminder_date = Carbon::parse($this->due_date)->addDays($settings->num_days_reminder2);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }
        }

        if ($settings->enable_reminder3 !== false && $settings->schedule_reminder3 == 'after_invoice_date' &&
            $settings->num_days_reminder3 > 0) {
            $reminder_date = Carbon::parse($this->date)->addDays($settings->num_days_reminder3);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }

        }

        if ($settings->enable_reminder3 !== false && $settings->schedule_reminder3 == 'before_due_date' &&
            $settings->num_days_reminder3 > 0) {
            $reminder_date = Carbon::parse($this->due_date)->subDays($settings->num_days_reminder3);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }
        }


        if ($settings->enable_reminder3 !== false && $settings->schedule_reminder3 == 'after_due_date' &&
            $settings->num_days_reminder3 > 0) {
            $reminder_date = Carbon::parse($this->due_date)->addDays($settings->num_days_reminder3);

            if (!$nsd) {
                $nsd = $reminder_date;
            }

            if ($reminder_date->lt($nsd)) {
                $nsd = $reminder_date;
            }
        }

        $this->next_send_date = $nsd;
        $this->save();

    }

    public function inReminderWindow($schedule_reminder, $num_days_reminder)
    {
        switch ($schedule_reminder) {
            case 'after_invoice_date':
                return \Carbon\Carbon::parse($this->date)->addDays($num_days_reminder)->startOfDay()->eq(Carbon::now()
                                                                                                               ->startOfDay());
                break;
            case 'before_due_date':
                return Carbon::parse($this->due_date)->subDays($num_days_reminder)->startOfDay()->eq(Carbon::now()
                                                                                                           ->startOfDay());
                break;
            case 'after_due_date':
                return Carbon::parse($this->due_date)->addDays($num_days_reminder)->startOfDay()->eq(Carbon::now()
                                                                                                           ->startOfDay());
                break;
            default:
                # code...
                break;
        }
    }

    public function calculateTemplate(): string
    {
        //if invoice is currently a draft, or being marked as sent, this will be the initial email
        $customer = $this->customer;

        //if the invoice
        if ($customer->getSetting('enable_reminder1') !== false &&
            $this->inReminderWindow($customer->getSetting('schedule_reminder1'),
                $customer->getSetting('num_days_reminder1'))) {
            return 'template1';
        } elseif ($customer->getSetting('enable_reminder2') !== false &&
            $this->inReminderWindow($customer->getSetting('schedule_reminder2'),
                $customer->getSetting('num_days_reminder2'))) {
            return 'template2';
        } elseif ($customer->getSetting('enable_reminder3') !== false &&
            $this->inReminderWindow($customer->getSetting('schedule_reminder3'),
                $customer->getSetting('num_days_reminder3'))) {
            return 'template3';
        } else {
            return 'invoice';
        }

        //also implement endless reminders here
    }

}
