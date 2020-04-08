import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import AddPayment from './AddPayment'
import {
    Card, CardBody
} from 'reactstrap'
import axios from 'axios'
import PaymentItem from './PaymentItem'
import PaymentFilters from './PaymentFilters'

export default class Payments extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                ignore: ['paymentables', 'assigned_user_id', 'id', 'customer', 'invoice_id', 'applied', 'deleted_at', 'customer_id', 'refunded', 'task_id', 'company_id'],
                viewMode: false,
                viewedId: null,
                title: null
            },
            payments: [],
            cachedData: [],
            custom_fields: [],
            dropdownButtonActions: ['download'],
            bulk: [],
            ignoredColumns: ['custom_value1', 'custom_value2', 'custom_value3', 'custom_value4', 'currency_id', 'exchange_rate', 'exchange_currency_id', 'paymentables', 'private_notes', 'created_at', 'user_id', 'id', 'customer', 'invoice_id', 'assigned_user_id', 'deleted_at', 'updated_at', 'type_id', 'refunded', 'is_manual', 'task_id', 'company_id', 'invitation_id'],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            invoices: [],
            customers: [],
            showRestoreButton: false
        }

        this.updateCustomers = this.updateCustomers.bind(this)
        this.customerList = this.customerList.bind(this)
        this.getInvoices = this.getInvoices.bind(this)
        this.filterPayments = this.filterPayments.bind(this)
    }

    componentDidMount () {
        this.getInvoices()
        this.getCustomers()
        this.getCustomFields()
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Payment')
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

    getInvoices () {
        axios.get('/api/invoice')
            .then((r) => {
                this.setState({
                    invoices: r.data
                })
            })
            .catch((e) => {
                console.error(e)
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

    updateCustomers (payments) {
        const cachedData = !this.state.cachedData.length ? payments : this.state.cachedData
        this.setState({
            payments: payments,
            cachedData: cachedData
        })
    }

    filterPayments (filters) {
        this.setState({ filters: filters })
    }

    customerList (props) {
        const { payments, custom_fields, invoices, customers } = this.state
        return <PaymentItem showCheckboxes={props.showCheckboxes} payments={payments} customers={customers}
            invoices={invoices} custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} updateCustomers={this.updateCustomers}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    render () {
        const { payments, custom_fields, invoices, view, filters } = this.state
        const { status_id, searchText, customer_id, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/payments?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = invoices.length ? <AddPayment
            custom_fields={custom_fields}
            invoices={invoices}
            action={this.updateCustomers}
            payments={payments}
        /> : null

        return <div className="data-table">

            <Card>
                <CardBody>
                    <PaymentFilters payments={payments} invoices={invoices}
                        updateIgnoredColumns={this.updateIgnoredColumns}
                        filters={filters} filter={this.filterPayments}
                        saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                    {addButton}

                    <DataTable
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        entity_type="Payment"
                        bulk_save_url="/api/payment/bulk"
                        view={view}
                        ignore={this.state.ignoredColumns}
                        columnMapping={{ customer_id: 'CUSTOMER' }}
                        // order={['id', 'number', 'date', 'customer_name', 'total', 'balance', 'status_id']}
                        disableSorting={['id']}
                        defaultColumn='number'
                        userList={this.customerList}
                        fetchUrl={fetchUrl}
                        updateState={this.updateCustomers}
                    />
                </CardBody>
            </Card>
        </div>
    }
}
