import React, { Component } from 'react'
import axios from 'axios'
import AddRecurringQuote from './AddRecurringQuote'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import ViewEntity from '../common/ViewEntity'
import RecurringQuoteItem from './RecurringQuoteItem'
import RecurringQuoteFilters from './RecurringQuoteFilters'

export default class RecurringQuotes extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            invoices: [],
            cachedData: [],
            custom_fields: [],
            customers: [],
            allQuotes: [],
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
            ignoredColumns: ['id', 'custom_value1', 'invoice_id', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'created_at', 'public_notes', 'private_notes', 'use_inclusive_taxes', 'terms', 'footer', 'last_send_date', 'line_items', 'next_send_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total']

        }

        this.ignore = []

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
        this.getQuotes = this.getQuotes.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getQuotes()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('line_items') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    updateInvoice (invoices) {
        const cachedData = !this.state.cachedData.length ? invoices : this.state.cachedData
        this.setState({
            invoices: invoices,
            cachedData: cachedData
        })
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
        axios.post('/api/recurringQuote/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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

    getQuotes () {
        axios.get('/api/quote')
            .then((r) => {
                this.setState({
                    allQuotes: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    filterInvoices (filters) {
        this.setState({ filters: filters })
    }

    userList () {
        const { invoices, custom_fields, customers, allQuotes, ignoredColumns } = this.state
        return <RecurringQuoteItem allQuotes={allQuotes} invoices={invoices} customers={customers} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} updateInvoice={this.updateInvoice}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    renderErrorFor () {

    }

    getCustomFields () {
        axios.get('api/accounts/fields/RecurringQuote')
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
        const { invoices, custom_fields, customers, allQuotes, view, filters } = this.state
        const { status_id, customer_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/recurring-quote?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = customers.length ? <AddRecurringQuote
            allQuotes={allQuotes}
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
                        <RecurringQuoteFilters invoices={invoices}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterInvoices}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}
                        <DataTable
                            columnMapping={{ customer_id: 'Customer' }}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='number'
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.updateInvoice}
                        />
                    </CardBody>
                </Card>

                <ViewEntity ignore={[]} toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}/>
            </div>
        )
    }
}
