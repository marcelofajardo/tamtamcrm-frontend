import React, { Component } from 'react'
import axios from 'axios'
import EditQuote from './EditQuote'
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
            customers: [],
            custom_fields: [],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: ''
            },
            showRestoreButton: false,
            ignoredColumns: ['next_send_date', 'customer_id', 'id', 'company_id', 'custom_value1', 'invoice_id', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'notes', 'use_inclusive_taxes', 'terms', 'footer', 'last_sent_date', 'uses_inclusive_taxes', 'line_items', 'next_sent_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total']

        }

        this.colors = {
            1: 'secondary',
            2: 'primary',
            4: 'success',
            '-1': 'danger'
        }

        this.statuses = {
            1: 'Draft',
            2: 'Sent',
            4: 'Approved',
            '-1': 'Expired'
        }

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
        this.deleteQuote = this.deleteQuote.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
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
        this.setState({ quotes: quotes })
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
        const { quotes, custom_fields, customers } = this.state
        if (this.state.quotes && this.state.quotes.length) {
            return quotes.map(user => {
                const restoreButton = user.deleted_at
                    ? <RestoreModal id={user.id} entities={quotes} updateState={this.updateInvoice}
                        url={`/api/quotes/restore/${user.id}`}/> : null

                const deleteButton = !user.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteQuote} id={user.id}/> : null

                const archiveButton = !user.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteQuote} id={user.id}/> : null

                const status = !user.deleted_at
                    ? <Badge color={this.colors[user.status_id]}>{this.statuses[user.status_id]}</Badge>
                    : <Badge color="warning">Archived</Badge>

                const editButton = !user.deleted_at ? <EditQuote
                    custom_fields={custom_fields}
                    customers={customers}
                    modal={true}
                    add={false}
                    invoice={user}
                    invoice_id={user.id}
                    action={this.updateInvoice}
                    invoices={quotes}
                /> : null

                const columnList = Object.keys(user).filter(key => {
                    return this.state.ignoredColumns && !this.state.ignoredColumns.includes(key)
                }).map(key => {
                    return key === 'status_id' ? <td data-label="Status">{status}</td>
                        : <td onClick={() => this.toggleViewedEntity(user, user.number)} key={key}
                            data-label={key}>{user[key]}</td>
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

    getFilters () {
        const { customers } = this.state
        const columnFilter = this.state.quotes.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns}
                columns={Object.keys(this.state.quotes[0]).concat(this.state.ignoredColumns)}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterInvoices}/>
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
                            name="status_id"
                            id="status_id"
                        >
                            <option value="">Select Status</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
                            <option value='active'>Draft</option>
                            <option value='active'>Sent</option>
                            <option value='active'>Viewed</option>
                            <option value='approved'>Approved</option>
                            <option value='archived'>Expired</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={10}>
                    <FormGroup>
                        {columnFilter}
                    </FormGroup>
                </Col>
            </Row>
        )
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
        const { quotes, custom_fields, customers, view } = this.state
        const { status_id, customer_id, searchText } = this.state.filters
        const fetchUrl = `/api/quote?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}`
        const filters = this.state.customers.length ? this.getFilters() : 'Loading filters'
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
                        <FilterTile filters={filters}/>
                        {addButton}

                        <DataTable
                            columnMapping={{ customer_id: 'Customer' }}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='total'
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
                    entity={view.viewedId}/>
            </div>
        )
    }
}
