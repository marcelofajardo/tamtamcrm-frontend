import React, { Component } from 'react'
import axios from 'axios'
import AddRecurringQuote from './AddRecurringQuote'
import UpdateRecurringQuote from './UpdateRecurringQuote'
import { FormGroup, Input, Badge, Card, CardBody, Col, Row } from 'reactstrap'
import DataTable from '../common/DataTable'
import CustomerDropdown from '../common/CustomerDropdown'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'

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
            custom_fields: [],
            customers: [],
            allQuotes: [],
            filters: {
                status_id: 'Draft',
                customer_id: '',
                searchText: ''
            },
            showRestoreButton: false,
            ignoredColumns: ['customer_id', 'id', 'custom_value1', 'invoice_id', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'notes', 'use_inclusive_taxes', 'terms', 'footer', 'last_send_date', 'line_items', 'next_send_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total']

        }

        this.ignore = []
        this.colors = {
            2: 'primary',
            3: 'primary',
            '-3': 'danger',
            '-1': 'primary',
            Partial: 'dark',
            '-2': 'success'
        }

        this.statuses = {
            2: 'Draft',
            3: 'Active',
            '-3': 'Cancelled',
            '-1': 'Pending',
            '-2': 'Completed'
        }

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
        this.deleteInvoice = this.deleteInvoice.bind(this)
        this.getQuotes = this.getQuotes.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
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
        this.setState({ invoices: invoices })
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

    filterInvoices (event) {
        const column = event.target.id
        const value = event.target.value

        if (value === 'all') {
            const updatedRowState = this.state.filters.filter(filter => filter.column !== column)
            this.setState({ filters: updatedRowState })
            return true
        }

        const showRestoreButton = column === 'status_id' && value === 'archived'

        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [column]: value
            },
            showRestoreButton: showRestoreButton
        }))

        return true
    }

    userList () {
        const { invoices, custom_fields, customers, allQuotes } = this.state
        if (invoices && invoices.length) {
            return invoices.map(user => {
                const restoreButton = user.deleted_at
                    ? <RestoreModal id={user.id} entities={invoices} updateState={this.updateInvoice}
                        url={`/api/recurringQuote/restore/${user.id}`}/> : null
                const archiveButton = !user.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteInvoice} id={user.id}/> : null

                const deleteButton = !user.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteInvoice} id={user.id}/> : null

                const status = !user.deleted_at
                    ? <Badge color={this.colors[user.status_id]}>{this.statuses[user.status_id]}</Badge>
                    : <Badge color="warning">Archived</Badge>

                const editButton = !user.deleted_at ? <UpdateRecurringQuote
                    allQuotes={allQuotes}
                    custom_fields={custom_fields}
                    customers={customers}
                    modal={true}
                    add={true}
                    invoice={user}
                    invoice_id={user.id}
                    action={this.updateInvoice}
                    invoices={invoices}
                /> : null

                const columnList = Object.keys(user).filter(key => {
                    return this.state.ignoredColumns && !this.state.ignoredColumns.includes(key)
                }).map(key => {
                    return (key === 'status_id') ? (
                        <td data-label="Status">{status}</td>) : ((key === 'customer_id') ? (
                        <td onClick={() => this.toggleViewedEntity(user, user.number)}>{`${user.first_name} ${user.last_name}`}</td>) : (
                        <td onClick={() => this.toggleViewedEntity(user, user.number)} key={key} data-label={key}>{user[key]}</td>))
                })

                return (
                    <tr key={user.id}>
                        <td>
                            <ActionsMenu edit={editButton} delete={deleteButton} archive={archiveButton}
                                restore={restoreButton}/>
                        </td>
                        {columnList}
                    </tr>
                )
            })
        } else {
            return <tr>
                <td className="text-center">No Records Found.</td>
            </tr>
        }
    }

    deleteInvoice (id, archive = true) {
        const url = archive === true ? `/api/recurring-quote/archive/${id}` : `/api/recurring-quote/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrQuotes = [...self.state.invoices]
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

    getFilters () {
        const { customers } = this.state
        const columnFilter = this.state.invoices.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns}
                columns={Object.keys(this.state.invoices[0]).concat(this.state.ignoredColumns)}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterInvoices}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        {columnFilter}
                    </FormGroup>
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        customer={this.state.filters.customer_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.filterInvoices}
                        customers={customers}
                        name="customer_id"
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterInvoices}
                            id="status_id"
                            name="status_id"
                        >
                            <option value="">Select Status</option>
                            <option value='Draft'>Draft</option>
                            <option value="archived">Archived</option>
                            <option value="deleted">Deleted</option>
                            <option value='unpaid'>Sent</option>
                            <option value='Viewed'>Viewed</option>
                            <option value='unpaid'>Partial</option>
                            <option value='paid'>Paid</option>
                            <option value='overdue'>Past Due</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        )
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
        const { invoices, custom_fields, customers, allQuotes, view } = this.state
        const { status_id, customer_id, searchText } = this.state.filters
        const fetchUrl = `/api/recurring-quote?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}`
        const filters = this.state.customers.length ? this.getFilters() : 'Loading filters'
        const addButton = customers.length && allQuotes.length ? <AddRecurringQuote
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
                        <FilterTile filters={filters}/>
                        {addButton}
                        <DataTable
                            // order={['id', 'number', 'date', 'customer_name', 'total', 'status_id']}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='total'
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
