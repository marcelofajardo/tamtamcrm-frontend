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

namespace App\Mail;

use App\Helpers\Email\BuildEmail;
use App\User;
use App\Customer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use tests\Mockery\Adapter\Phpunit\EmptyTestCase;

class TemplateEmail extends Mailable
{
    use Queueable, SerializesModels;
    private $build_email;
    private $user; //the user the email will be sent from
    private $customer;

    public function __construct($build_email, User $user, Customer $customer)
    {
        $this->build_email = $build_email;
        $this->user =
            $user; //this is inappropriate here, need to refactor 'user' in this context the 'user' could also be the 'system'
        $this->customer = $customer;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        /*Alter Run Time Mailer configuration (driver etc etc) to regenerate the Mailer Singleton*/
        //if using a system level template
        $template_name = 'email.template.' . $this->build_email->getTemplate();

        $settings = $this->customer->getMergedSettings();

        $company = $this->customer->account;

        $message = $this->from($this->user->email,
            $this->user->present()->name())//todo this needs to be fixed to handle the hosted version
                        ->subject($this->build_email->getSubject())->text('email.template.plain', [
            'body' => $this->build_email->getBody(),
            'footer' => $this->build_email->getFooter()
        ])->view($template_name, [
            'body' => $this->build_email->getBody(),
            'footer' => $this->build_email->getFooter(),
            'title' => $this->build_email->getSubject(),
            'settings' => $settings,
            'company' => $company
        ]);

        //conditionally attach files
//         if($settings->pdf_email_attachment !== false && !empty($this->build_email->getAttachments())){
//
//             foreach($this->build_email->getAttachments() as $file)
//                 $message->attach($file);
//         }

        return $message;
    }
}
