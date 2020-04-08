import React, { Component } from 'react'
import axios from 'axios'
import AddRecurringInvoice from './AddRecurringInvoice'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import RecurringInvoiceItem from './RecurringInvoiceItem'
import RecurringInvoiceFilters from './RecurringInvoiceFilters'

export default class RecurringInvoices extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                ignore: [],
                viewMode: false,
                viewedId: null,
                title: null
            },
            invoices: [],
            allInvoices: [],
            cachedData: [],
            customers: [],
            bulk: [],
            dropdownButtonActions: ['download'],
            filters: {
                status_id: 'Draft',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            showRestoreButton: false,
            custom_fields: [],
            ignoredColumns: ['id', 'custom_value1', 'invoice_id', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'created_at', 'public_notes', 'private_notes', 'use_inclusive_taxes', 'terms', 'footer', 'last_send_date', 'line_items', 'next_send_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total']

        }

        this.ignore = []

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
        this.getInvoices = this.getInvoices.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
        this.getInvoices()
    }

    getInvoices () {
        axios.get('/api/invoice')
            .then((r) => {
                this.setState({
                    allInvoices: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    updateInvoice (invoices) {
        const cachedData = !this.state.cachedData.length ? invoices : this.state.cachedData
        this.setState({
            invoices: invoices,
            cachedData: cachedData
        })
    }

    filterInvoices (filters) {
        this.setState({ filters: filters })
    }

    userList (props) {
        const { invoices, custom_fields, customers, allInvoices } = this.state
        return <RecurringInvoiceItem showCheckboxes={props.showCheckboxes} allInvoices={allInvoices} invoices={invoices}
            customers={customers} custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} updateInvoice={this.updateInvoice}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    getCustomFields () {
        axios.get('api/accounts/fields/RecurringInvoice')
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

    render () {
        const { invoices, custom_fields, customers, allInvoices, view, filters } = this.state
        const { status_id, customer_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/recurring-invoice?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = customers.length && allInvoices.length
            ? <AddRecurringInvoice
                allInvoices={allInvoices}
                custom_fields={custom_fields}
                customers={customers}
                invoice={{}}
                add={false}
                action={this.updateInvoice}
                invoices={invoices}
                modal={true}
            /> : null

        return (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <RecurringInvoiceFilters invoices={invoices}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterInvoices}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}
                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Recurring Invoice"
                            bulk_save_url="/api/recurring-invoice/bulk"
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
