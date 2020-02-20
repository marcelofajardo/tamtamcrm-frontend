<?php

namespace App\Http\Controllers\Support\Messages;

use App\Http\Controllers\Controller;
use App\Mail\SupportMessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendingController extends Controller
{

    /**
     * Send a support message.
     *
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'message' => ['required'],
        ]);

        $send_logs = false;

        if ($request->has('send_logs')) {
            $send_logs = $request->input('send_logs');
        }


        Mail::to(config('taskmanager.contact.ninja_official_contact'))->send(new SupportMessageSent($request->message,
            $send_logs));

        return response()->json([
            'success' => true
        ]);
    }
}
