import React, { Component } from 'react'
import axios from 'axios'
import EditInvoice from './EditInvoice'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import ViewEntity from '../common/ViewEntity'
import InvoiceItem from './InvoiceItem'
import InvoiceFilters from './InvoiceFilters'

export default class Invoice extends Component {
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
            customers: [],
            bulk: [],
            dropdownButtonActions: ['download'],
            custom_fields: [],
            ignoredColumns: ['custom_surcharge1', 'custom_surcharge_tax1', 'custom_surcharge2', 'custom_surcharge_tax2', 'custom_surcharge3', 'custom_surcharge_tax3', 'custom_surcharge4', 'custom_surcharge_tax4', 'design_id', 'invitations', 'id', 'user_id', 'status', 'company_id', 'custom_value1', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'created_at', 'public_notes', 'private_notes', 'terms', 'footer', 'last_send_date', 'line_items', 'next_send_date', 'last_sent_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total'],
            filters: {
                status_id: 'Draft',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            showRestoreButton: false
        }

        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
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
        this.setState({ bulk: options }, () => console.log('bulk', this.state.bulk))
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

    userList () {
        const { invoices, customers, custom_fields, ignoredColumns } = this.state
        return <InvoiceItem invoices={invoices} customers={customers} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} updateInvoice={this.updateInvoice}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/invoice/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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
        axios.get('api/accounts/fields/Invoice')
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
        const { invoices, customers, custom_fields, view, filters } = this.state
        const { status_id, customer_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/invoice?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = this.state.customers.length ? <EditInvoice
            custom_fields={custom_fields}
            customers={customers}
            invoice={{}}
            add={true}
            action={this.updateInvoice}
            invoices={invoices}
            modal={true}
        /> : null

        return (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <InvoiceFilters invoices={invoices} customers={customers}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterInvoices}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}
                        <DataTable
                            ignore={this.state.ignoredColumns}
                            columnMapping={{ customer_id: 'CUSTOMER' }}
                            // order={['id', 'number', 'date', 'customer_name', 'total', 'balance', 'status_id']}
                            disableSorting={['id']}
                            defaultColumn='number'
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.updateInvoice}
                        />
                    </CardBody>
                </Card>

                <ViewEntity
                    ignore={[]} toggle={this.toggleViewedEntity}
                    title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}
                    entity_type="Invoice"
                />
            </div>
        )
    }
}
