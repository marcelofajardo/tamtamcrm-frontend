import React, { Component } from 'react'
import axios from 'axios'
import EditQuote from './EditQuote'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import ViewEntity from '../common/ViewEntity'
import QuoteItem from './QuoteItem'
import QuoteFilters from './QuoteFilters'

export default class Quotes extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
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
            ignoredColumns: ['design_id', 'invitations', 'next_send_date', 'id', 'company_id', 'custom_value1', 'invoice_id', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'created_at', 'public_notes', 'private_notes', 'use_inclusive_taxes', 'terms', 'footer', 'last_sent_date', 'uses_inclusive_taxes', 'line_items', 'next_sent_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total']

        }

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
        this.deleteQuote = this.deleteQuote.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('line_items') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    updateInvoice (quotes) {
        const cachedData = !this.state.cachedData.length ? quotes : this.state.cachedData
        this.setState({
            quotes: quotes,
            cachedData: cachedData
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
            options.push(e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ bulk: options })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/quote/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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

    filterInvoices (filters) {
        this.setState({ filters: filters })
    }

    userList () {
        const { quotes, custom_fields, customers, ignoredColumns } = this.state
        return <QuoteItem quotes={quotes} customers={customers} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} updateInvoice={this.updateInvoice}
            deleteQuote={this.deleteQuote} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    deleteQuote (id, archive = true) {
        const url = archive === true ? `/api/quote/archive/${id}` : `/api/quote/${id}`
        const self = this
        axios.delete(url).then(function (response) {
            const arrQuotes = [...self.state.quotes]
            const index = arrQuotes.findIndex(payment => payment.id === id)
            arrQuotes.splice(index, 1)
            self.updateInvoice(arrQuotes)
        })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    renderErrorFor () {

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

                <ViewEntity
                    ignore={['next_send_date', 'updated_at', 'use_inclusive_taxes', 'last_sent_date', 'uses_inclusive_taxes', 'line_items', 'next_sent_date', 'first_name', 'last_name']}
                    toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}
                    entity_type="Quote"
                />
            </div>
        )
    }
}
