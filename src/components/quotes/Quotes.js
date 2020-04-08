import React, { Component } from 'react'
import axios from 'axios'
import EditQuote from './EditQuote'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import QuoteItem from './QuoteItem'
import QuoteFilters from './QuoteFilters'

export default class Quotes extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                ignore: ['next_send_date', 'updated_at', 'use_inclusive_taxes', 'last_sent_date', 'uses_inclusive_taxes', 'line_items', 'next_sent_date', 'first_name', 'last_name', 'design_id', 'status_id', 'custom_surcharge_tax1', 'custom_surcharge_tax2', 'custom_surcharge_tax3', 'custom_surcharge_tax4'],
                viewMode: false,
                viewedId: null,
                title: null
            },
            quotes: [],
            cachedData: [],
            customers: [],
            custom_fields: [],
            bulk: [],
            dropdownButtonActions: ['download'],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            showRestoreButton: false,
            ignoredColumns: ['emails', 'custom_surcharge1', 'custom_surcharge_tax1', 'custom_surcharge2', 'custom_surcharge_tax2', 'custom_surcharge3', 'custom_surcharge_tax3', 'custom_surcharge4', 'custom_surcharge_tax4', 'design_id', 'invitations', 'next_send_date', 'id', 'company_id', 'custom_value1', 'invoice_id', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'created_at', 'public_notes', 'private_notes', 'use_inclusive_taxes', 'terms', 'footer', 'last_sent_date', 'uses_inclusive_taxes', 'line_items', 'next_sent_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total']

        }

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
    }

    updateInvoice (quotes) {
        const cachedData = !this.state.cachedData.length ? quotes : this.state.cachedData
        this.setState({
            quotes: quotes,
            cachedData: cachedData
        })
    }

    filterInvoices (filters) {
        this.setState({ filters: filters })
    }

    userList (props) {
        const { quotes, custom_fields, customers } = this.state
        return <QuoteItem showCheckboxes={props.showCheckboxes} quotes={quotes} customers={customers}
            custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} updateInvoice={this.updateInvoice}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    getCustomers () {
        axios.get('/api/customers')
            .then((r) => {
                this.setState({
                    customers: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Quote')
            .then((r) => {
                this.setState({
                    custom_fields: r.data.fields
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    render () {
        const { quotes, custom_fields, customers, view, filters } = this.state
        const { status_id, customer_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/quote?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = customers.length ? <EditQuote
            custom_fields={custom_fields}
            customers={customers}
            invoice={{}}
            add={true}
            action={this.updateInvoice}
            invoices={quotes}
            modal={true}
        /> : null

        return (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <QuoteFilters quotes={quotes}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterInvoices}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}

                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Quote"
                            bulk_save_url="/api/quote/bulk"
                            view={view}
                            columnMapping={{ customer_id: 'CUSTOMER' }}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='number'
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.updateInvoice}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
