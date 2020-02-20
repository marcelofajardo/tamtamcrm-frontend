<?php

namespace App\Transformations;

use App\CompanyGateway;

trait CompanyGatewayTransformable
{
    protected function transformCompanyGateway(CompanyGateway $company_gateway)
    {
        $prop = new CompanyGateway;
        $prop->id = (int)$company_gateway->id;
        $prop->gateway_key = (string)$company_gateway->gateway_key ?: '';
        $prop->accepted_credit_cards = $company_gateway->accepted_credit_cards;
        $prop->require_cvv = (bool)$company_gateway->require_cvv;
        $prop->show_billing_address = (bool)$company_gateway->show_billing_address;
        $prop->show_shipping_address = (bool)$company_gateway->show_shipping_address;
        $prop->update_details = (bool)$company_gateway->update_details;
        $prop->config = $company_gateway->config;
        $prop->fees_and_limits = $company_gateway->fees_and_limits ?: '';
        $prop->updated_at = $company_gateway->updated_at;
        $prop->deleted_at = $company_gateway->deleted_at;
        return $prop;
    }
}
