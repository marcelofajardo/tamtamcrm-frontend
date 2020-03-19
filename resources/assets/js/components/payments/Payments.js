import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import AddPayment from './AddPayment'
import {
    Card, CardBody
} from 'reactstrap'
import axios from 'axios'
import ViewEntity from '../common/ViewEntity'
import PaymentItem from './PaymentItem'
import PaymentFilters from './PaymentFilters'

export default class Payments extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
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
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
    }

    componentDidMount () {
        this.getInvoices()
        this.getCustomers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer', 'invoices') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    toggleViewedEntity (id, title = null) {
        this.setState({
            view: {
                ...this.state.view,
                viewMode: !this.state.view.viewMode,
                viewedId: id,
                title: title
            }
        }, () => console.log('view', this.state.view))
    }

    onChangeBulk (e) {
        // current array of options
        const options = this.state.bulk
        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(+e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ bulk: options })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/payment/bulk', {
            ids: this.state.bulk,
            action: action
        }).then(function (response) {
            // const arrQuotes = [...self.state.invoices]
            // const index = arrQuotes.findIndex(payment => payment.id === id)
            // arrQuotes.splice(index, 1)
            // self.updateInvoice(arrQuotes)
        })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
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

    customerList () {
        const { payments, custom_fields, invoices, customers, ignoredColumns } = this.state
        return <PaymentItem payments={payments} customers={customers} invoices={invoices} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} updateCustomers={this.updateCustomers}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
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
                        columnMapping={{ customer_id: 'Customer' }}
                        ignore={this.state.ignoredColumns}
                        disableSorting={['id', 'invoice_id']}
                        defaultColumn='number'
                        userList={this.customerList}
                        fetchUrl={fetchUrl}
                        updateState={this.updateCustomers}
                    />
                </CardBody>
            </Card>

            <ViewEntity
                ignore={['paymentables', 'id', 'customer', 'invoice_id', 'applied', 'deleted_at', 'customer_id', 'refunded', 'task_id', 'company_id']}
                toggle={this.toggleViewedEntity}
                title={view.title}
                viewed={view.viewMode}
                entity={view.viewedId}
                entity_type="Payment"
            />
        </div>
    }
}
