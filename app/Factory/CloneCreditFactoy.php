<?php
namespace App\Factory;

use App\Credit;

class CloneCreditFactory
{
    public static function create(Credit $credit, $user_id) : Credit
    {
        $clone_credit = $credit->replicate();
        $clone_credit->status_id = credit::STATUS_DRAFT;
        $clone_credit->number = null;
        $clone_credit->date = null;
        $clone_credit->due_date = null;
        $clone_credit->partial_due_date = null;
        $clone_credit->user_id = $user_id;
        $clone_credit->balance = $credit->total;
        $clone_credit->line_items = $credit->line_items;

        return $clone_credit;
    }
}
