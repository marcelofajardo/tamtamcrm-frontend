<?php

use Illuminate\Database\Seeder;
use App\CompanyGateway;

class CompanyGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $cg = new CompanyGateway;
        $cg->account_id = 1;
        $cg->user_id = 9874;
        $cg->gateway_key = 'd14dd26a37cecc30fdd65700bfb55b23';
        $cg->require_cvv = true;
        $cg->show_billing_address = true;
        $cg->show_shipping_address = true;
        $cg->update_details = true;
        $cg->config = encrypt('{"secret": "test"}');
        $cg->save();

        $cg = new CompanyGateway;
        $cg->account_id = 1;
        $cg->user_id = 9874;
        $cg->gateway_key = 'd14dd26a37cecc30fdd65700bfb55b23';
        $cg->require_cvv = true;
        $cg->show_billing_address = true;
        $cg->show_shipping_address = true;
        $cg->update_details = true;
        $cg->config = encrypt(config('taskmanager.testvars.stripe'));
        $cg->save();

        $cg = new CompanyGateway;
        $cg->account_id = 1;
        $cg->user_id = 9874;
        $cg->gateway_key = '38f2c48af60c7dd69e04248cbb24c36e';
        $cg->require_cvv = true;
        $cg->show_billing_address = true;
        $cg->show_shipping_address = true;
        $cg->update_details = true;
        $cg->config = encrypt('{"secret": "test"}');
        $cg->save();
    }
}
