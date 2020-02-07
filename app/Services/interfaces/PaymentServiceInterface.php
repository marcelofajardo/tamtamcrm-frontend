<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Services\Interfaces;

use App\Invoice;

/**
 * Description of PaymentServiceInterface
 *
 * @author michael.hampton
 */
interface PaymentServiceInterface
{

    /*
     * 
     */
    public function autoBillInvoice(Invoice $invoice);
}
