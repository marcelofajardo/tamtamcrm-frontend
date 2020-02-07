<?php

namespace App\Traits;

use App\Address;
use App\Utils\Number;
use App\Country;

/**
 * Class MakesInvoiceValues
 * @package App\Utils\Traits
 */
trait MakesInvoiceValues
{
    /**
     * Master list of columns used
     * for invoice tables
     * @var array
     */
    private static $master_columns = [
        'date',
        'unit_discount',
        'product_id',
        'total',
        'quantity',
        'tax_name1',
        'tax_name2',
        'tax_name3',
        'sub_total',
        'custom_label1',
        'custom_label2',
        'custom_label3',
        'custom_label4',
    ];
    /**
     * Master list of invoice labels
     * @var array
     */
    private static $labels = [
        'date',
        'due_date',
        'invoice_number',
        'po_number',
        'discount',
        'taxes',
        'tax',
        'item',
        'description',
        'unit_cost',
        'quantity',
        'line_total',
        'subtotal',
        'paid_to_date',
        'balance_due',
        'partial_due',
        'terms',
        'your_invoice',
        'quote',
        'your_quote',
        'quote_date',
        'quote_number',
        'total',
        'invoice_issued_to',
        'quote_issued_to',
        'rate',
        'hours',
        'balance',
        'from',
        'to',
        'invoice_to',
        'quote_to',
        'details',
        'invoice_no',
        'quote_no',
        'valid_until',
        'client_name',
        'address1',
        'address2',
        'id_number',
        'vat_number',
        'city_state_postal',
        'postal_city_state',
        'country',
        'email',
        'contact_name',
        'company_name',
        'website',
        'phone',
        'blank',
        'surcharge',
        'tax_invoice',
        'tax_quote',
        'statement',
        'statement_date',
        'your_statement',
        'statement_issued_to',
        'statement_to',
        'credit_note',
        'credit_date',
        'credit_number',
        'credit_issued_to',
        'credit_to',
        'your_credit',
        'phone',
        'invoice_total',
        'outstanding',
        'invoice_due_date',
        'quote_due_date',
        'service',
        'product_key',
        'unit_cost',
        'custom_value1',
        'custom_value2',
        'custom_value3',
        'custom_value4',
        'delivery_note',
        'date',
        'method',
        'payment_date',
        'reference',
        'amount',
        'amount_paid',
    ];

    private static $custom_label_fields = [
        'invoice1',
        'invoice2',
        'invoice3',
        'invoice4',
        'surcharge1',
        'surcharge2',
        'surcharge3',
        'surcharge4',
        'client1',
        'client2',
        'client3',
        'client4',
        'contact1',
        'contact2',
        'contact3',
        'contact4',
    ];

    /**
     * Iterates and translates all labels
     *
     * @return array returns an array of
     * keyed labels (appended with _label)
     */
    public function makeLabels(): array
    {
        $custom_fields = $this->account->custom_fields;

        //todo we might want to translate like this
        //trans('texts.labe', [], null, $this->client->locale());
        $data = [];

        foreach (self::$labels as $label) {
            $data['$' . $label . '_label'] = ucwords(str_replace('_', ' ', $label));
        }

        if ($custom_fields) {
            foreach ($custom_fields as $key => $value) {

                if (strpos($value, '|')) {
                    $value = explode("|", $value);
                    $value = $value[0];
                }

                $data['$' . $key . '_label'] = $value;
            }
        }

        return $data;
    }

    /**
     * Transforms all placeholders
     * to invoice values
     *
     * @return array returns an array
     * of keyed labels (appended with _label)
     */
    public
    function makeValues(
        $contact = null
    ): array {
        /*if(!$this->customer->currency() || !$this->client){
            throw new Exception(debug_backtrace()[1]['function'], 1);
            exit;
        }*/

        $settings = $this->customer->getMergedSettings();

        $data = [];

        $data['$total_tax_labels'] = $this->totalTaxLabels();
        $data['$total_tax_values'] = $this->totalTaxValues();
        $data['$line_tax_labels'] = $this->lineTaxLabels();
        $data['$line_tax_values'] = $this->lineTaxValues();

        $data['$date'] = $this->date;
        $data['$invoice.date'] = &$data['$date'];
        $data['$due_date'] = $this->due_date;
        $data['$invoice.due_date'] = &$data['$due_date'];
        $data['$number'] = $this->number;
        $data['$invoice.number'] = &$data['$number'];
        $data['$invoice_number'] = &$data['$number'];
        $data['$po_number'] = $this->po_number;
        $data['$invoice.po_number'] = &$data['$po_number'];
        $data['$line_taxes'] = $this->makeLineTaxes();
        $data['$invoice.line_taxes'] = &$data['$line_taxes'];
        $data['$total_taxes'] = $this->makeTotalTaxes();
        $data['$invoice.total_taxes'] = &$data['$total_taxes'];

        $data['$discount'] = Number::formatMoney($this->discount_total, $this->customer);
        $data['$invoice.discount'] = &$data['$discount'];
        $data['$subtotal'] = Number::formatMoney($this->total, $this->customer);
        $data['$invoice.subtotal'] = &$data['$subtotal'];
        $data['$balance_due'] = Number::formatMoney($this->balance, $this->customer);
        $data['$invoice.balance_due'] = &$data['$balance_due'];
        $data['$partial_due'] = Number::formatMoney($this->partial, $this->customer);
        $data['$invoice.partial_due'] = &$data['$partial_due'];
        $data['$total'] = Number::formatMoney($this->total, $this->customer);
        $data['$invoice.total'] = &$data['$total'];
        $data['$amount'] = &$data['$total'];
        $data['$invoice_total'] =  &$data['$total'];
        $data['$invoice.amount'] = &$data['$total'];
        $data['$balance'] = Number::formatMoney($this->balance, $this->customer);
        $data['$invoice.balance'] = &$data['$balance'];
        $data['$taxes'] = Number::formatMoney($this->total_tax, $this->customer);
        $data['$invoice.taxes'] = &$data['$taxes'];
        $data['$terms'] = $this->terms;
        $data['$invoice.terms'] = &$data['$terms'];
        $data['$invoice.custom_value1'] = $this->custom_value1;
        $data['$invoice.custom_value2'] = $this->custom_value2;
        $data['$invoice.custom_value3'] = $this->custom_value3;
        $data['$invoice.custom_value4'] = $this->custom_value4;
        $data['$invoice.public_notes'] = $this->notes;
        $data['$invoice_no'] = $this->number;
        $data['$invoice.invoice_no'] = &$data['$invoice_no'];

        $address = $this->customer->addresses->where('address_type', 1)->first();
        $country = $this->customer->getCountryId();

        $data['$client_name'] = $this->present()->customerName();
        $data['$client.name'] = &$data['$client_name'];
        $data['$client_address'] = $address->address_1 . ' ' . $address->address_2;
        $data['$client.address'] = &$data['$client_address'];
        $data['$address1'] = $address->address_1;
        $data['$client.address1'] = &$data['$address1'];
        $data['$address2'] = $address->address_2;
        $data['$client.address2'] = &$data['$address2'];
        $data['$id_number'] = $this->customer->id;
        $data['$client.id_number'] = &$data['$id_number'];
        $data['$website'] = $this->customer->present()->website();
        $data['$client.website'] = &$data['$website'];
        $data['$phone'] = $this->customer->present()->phone;
        $data['$client.phone'] = &$data['$phone'];
        $data['$city_state_postal'] = $this->present()->cityStateZip($address->city, $address->town, $address->zip,
            false);
        $data['$client.city_state_postal'] = &$data['$city_state_postal'];
        $data['$postal_city_state'] = $this->present()->cityStateZip($address->city, $address->town, $address->zip,
            true);
        $data['$client.postal_city_state'] = &$data['$postal_city_state'];
        $data['$country'] = $country !== null ? $country->name : 'no country';
        $data['$client.country'] = &$data['$country'];
        $data['$email'] = isset($this->customer->email) ?: 'no contact email on record';
        $data['$client.email'] = &$data['$email'];
        $data['$client.custom_value1'] = $this->customer->custom_value1;
        $data['$client.custom_value2'] = $this->customer->custom_value2;
        $data['$client.custom_value3'] = $this->customer->custom_value3;
        $data['$client.custom_value4'] = $this->customer->custom_value4;

        if (!$contact) {
            $contact = $this->customer->primary_contact->first();
        }

        $data['$contact_name'] = isset($contact) ? $contact->present()->name() : 'no contact name on record';
        $data['$contact.name'] = &$data['$contact_name'];
        $data['$contact.custom_value1'] = isset($contact) ? $contact->custom_value1 : '';
        $data['$contact.custom_value2'] = isset($contact) ? $contact->custom_value2 : '';
        $data['$contact.custom_value3'] = isset($contact) ? $contact->custom_value3 : '';
        $data['$contact.custom_value4'] = isset($contact) ? $contact->custom_value4 : '';

        $data['$company.city_state_postal'] = $this->account->present()->cityStateZip($settings->city, $settings->state,
            $settings->postal_code, false);
        $data['$company.postal_city_state'] = $this->account->present()->cityStateZip($settings->city, $settings->state,
            $settings->postal_code, true);
        $data['$company.name'] = $this->account->present()->name($settings);
        $data['$company.company_name'] = &$data['$company.name'];
        $data['$company.address1'] = $settings->address1;
        $data['$company.address2'] = $settings->address2;
        $data['$company.city'] = $settings->city;
        $data['$company.state'] = $settings->state;
        $data['$company.postal_code'] = $settings->postal_code;

        $data['$company.country'] = Country::find($settings->country_id)->first()->name;;
        $data['$company.phone'] = $settings->phone;
        $data['$company.email'] = $settings->email;
        $data['$company.vat_number'] = $settings->vat_number;
        $data['$company.id_number'] = $settings->id_number;
        $data['$company.website'] = $settings->website;
        $data['$company.address'] = $this->account->present()->address($settings);
        $logo = $this->account->present()->logo($settings);
        $data['$company.logo'] = "<img src='{$logo}' class='w-48'>";
        $data['$company_logo'] = &$data['$company.logo'];
        $data['$company.custom_value1'] = $this->account->custom_value1;
        $data['$company.custom_value2'] = $this->account->custom_value2;
        $data['$company.custom_value3'] = $this->account->custom_value3;
        $data['$company.custom_value4'] = $this->account->custom_value4;

        return $data;
    }

    public
    function table_header(
        array $columns,
        array $css
    ): ?string {

        /* Table Header */
        //$table_header = '<thead><tr class="'.$css['table_header_thead_class'].'">';

        $table_header = '';
        $column_headers = $this->transformColumnsForHeader($columns);

        foreach ($column_headers as $column) {
            $table_header .= '<td class="' . $css['table_header_td_class'] . '">' . $column . '</td>';
        }

//$table_header .= '</tr></thead>';

        return $table_header;
    }

    public
    function table_body(
        array $columns,
        array $css
    ): ?string {
        $table_body = '';

        /* Table Body */
        $columns = $this->transformColumnsForLineItems($columns);

        $items = $this->transformLineItems($this->line_items);

        foreach ($items as $item) {

            $table_body .= '<tr class="">';

            foreach ($columns as $column) {
                $table_body .= '<td class="' . $css['table_body_td_class'] . '">' . $item->{$column} . '</td>';
            }

            $table_body .= '</tr>';
        }

        return $table_body;
    }

    private
    function totalTaxLabels(): string
    {
//        $data = '';
//
//        if (!$this->calc()->getTotalTaxMap()) {
//            return $data;
//        }
//
//        foreach ($this->calc()->getTotalTaxMap() as $tax) {
//            $data .= '<span>'. $tax['name'] .'</span>';
//        }

        $data = '<span>Basic</span>';

        return $data;
    }

    private
    function totalTaxValues(): string
    {
        $data = '<span>' . Number::formatMoney($this->total_tax, $this->customer) . '</span>';

        return $data;
    }

    private
    function lineTaxLabels(): string
    {
        return '<span>Basic</span>';
    }

    private
    function lineTaxValues(): string
    {
        $data = '<span>' . Number::formatMoney($this->total_tax, $this->customer) . '</span>';
        return $data;
    }

    /**
     * Returns a formatted HTML table of invoice line items
     *
     * @param array $columns The columns to be displayed
     *
     * @return string[HTML string
     */
    public
    function table(
        array $columns
    ): ?string {
        $data = '<table class="table table-striped items">';
        $data .= '<thead><tr class="heading">';
        $column_headers = $this->transformColumnsForHeader($columns);
        foreach ($column_headers as $column) {
            $data .= '<td>' . $column . '</td>';
        }
        $data .= '</tr></thead>';
        $columns = $this->transformColumnsForLineItems($columns);
        //$items = $this->transformLineItems($this->line_items);
        foreach ($this->line_items as $item) {
            $data .= '<tr class="item">';
            foreach ($columns as $column) {
                $data .= '<td>' . $item->{$column}

                    .
                    '</td>';
            }
            $data .= '</tr>';

        }
        $data .= '</table>';
        return $data;
    }

    /**
     * Transform the column headers into translated header values
     *
     * @param array $columns The column header values
     * @return array          The new column header variables
     */
    private
    function transformColumnsForHeader(
        array $columns
    ): array {
        $pre_columns = $columns;
        $columns = array_intersect($columns, self::$master_columns);
        return str_replace([
            'tax_name1',
            'tax_name2'
        ],
            [
                'tax',
                'tax',
            ],
            $columns);

    }

    /**
     *
     * Transform the column headers into invoice variables
     *
     * @param array $columns The column header values
     * @return array          The invoice variables
     */
    private
    function transformColumnsForLineItems(
        array $columns
    ): array {
        /* Removes any invalid columns the user has entered. */
        $columns = array_intersect($columns, self::$master_columns);
        return str_replace([
            'custom_invoice_label1',
            'custom_invoice_label2',
            'custom_invoice_label3',
            'custom_invoice_label4',
            'tax_name1',
        ],
            [
                'custom_invoice_value1',
                'custom_invoice_value2',
                'custom_invoice_value3',
                'custom_invoice_value4',
                'unit_tax',
            ],
            $columns);

    }

    /**
     * Formats the line items for display
     * @param array $items The array of invoice items
     * @return array        The formatted array of invoice items
     */
    private
    function transformLineItems(
        array $items
    ): array {
        foreach ($items as $item) {
            $item->cost = Number::formatMoney($item->sub_total, $this->customer);
            $item->line_total = Number::formatMoney($item->sub_total, $this->customer);
            if (isset($item->discount) && $item->discount > 0) {
                if ($item->unit_discount > 0) {
                    $item->discount = Number::formatMoney($item->unit_discount, $this->customer);
                }
                //else
                //$item->discount = $item->discount . '%';
            }
        }

        return $items;
    }

    /**
     * Due to the way we are compiling the blade template we
     * have no ability to iterate, so in the case
     * of line taxes where there are multiple rows,
     * we use this function to format a section of rows
     *
     * @return string a collection of <tr> rows with line item
     * aggregate data
     */
    private
    function makeLineTaxes(): string
    {

        $data = '';
        foreach ($this->line_items as $tax) {
            $data = '<tr class="line_taxes">';
            //$data .= '<td>'. $tax['name'] .'</td>';
            $data .= '<td>' . Number::formatMoney($tax->unit_tax, $this->customer) . '</td></tr>';
        }
        return $data;
    }

    /**
     * @return string a collectino of <tr> with
     * itemised total tax data
     */

    private
    function makeTotalTaxes(): string
    {
        $data = '<tr class="total_taxes">';
        //$data .= '<td>'. $tax['name'] .'</td>';
        $data .= '<td>' . Number::formatMoney($this->tax_total, $this->customer) . '</td></tr>';
        return $data;
    }
}
