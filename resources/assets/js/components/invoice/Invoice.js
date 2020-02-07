import React, { Component } from 'react'
import axios from 'axios'
import EditInvoice from './EditInvoice'
import { FormGroup, Input, Badge, Card, CardBody, Row, Col } from 'reactstrap'
import DataTable from '../common/DataTable'
import CustomerDropdown from '../common/CustomerDropdown'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'

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
            customers: [],
            custom_fields: [],
            ignoredColumns: ['id', 'user_id', 'status', 'company_id', 'customer_id', 'custom_value1', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'notes', 'terms', 'footer', 'last_send_date', 'line_items', 'next_send_date', 'last_sent_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total'],
            filters: {
                status_id: 'Draft',
                customer_id: '',
                searchText: ''
            },
            showRestoreButton: false
            // columns: ['Number', 'Customer', 'Due Date', 'Total', 'Balance', 'Status']
        }

        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)

        this.colors = {
            1: 'secondary',
            2: 'primary',
            3: 'success',
            4: 'warning',
            5: 'danger',
            '-1': 'danger',
            '-2': 'danger',
            '-3': 'danger'
        }

        this.statuses = {
            1: 'Draft',
            2: 'Sent',
            3: 'Paid',
            4: 'Partial',
            5: 'Cancelled',
            '-1': 'Overdue',
            '-2': 'Unpaid',
            '-3': 'Reversed'
        }

        this.updateInvoice = this.updateInvoice.bind(this)
        this.userList = this.userList.bind(this)
        this.filterInvoices = this.filterInvoices.bind(this)
        this.deleteInvoice = this.deleteInvoice.bind(this)
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

    updateInvoice (invoices) {
        this.setState({ invoices: invoices })
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
        const { invoices, customers, custom_fields } = this.state
        if (invoices && invoices.length) {
            return invoices.map(invoice => {
                const restoreButton = invoice.deleted_at
                    ? <RestoreModal id={invoice.id} entities={invoices} updateState={this.updateInvoice}
                        url={`/api/invoice/restore/${invoice.id}`}/> : null
                const archiveButton = !invoice.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteInvoice} id={invoice.id}/> : null
                const deleteButton = !invoice.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteInvoice} id={invoice.id}/> : null
                const status = !invoice.deleted_at
                    ? <Badge color={this.colors[invoice.status_id]}>{this.statuses[invoice.status_id]}</Badge>
                    : <Badge className="mr-2" color="warning">Archived</Badge>
                const editButton = !invoice.deleted_at ? <EditInvoice
                    custom_fields={custom_fields}
                    customers={customers}
                    modal={true}
                    add={false}
                    invoice={invoice}
                    invoice_id={invoice.id}
                    action={this.updateInvoice}
                    invoices={invoices}
                /> : null

                const columnList = Object.keys(invoice).filter(key => {
                    return this.state.ignoredColumns && !this.state.ignoredColumns.includes(key)
                }).map(key => {
                    return key === 'status_id' ? <td className="status" data-label="Status">{status}</td>
                        : <td onClick={() => this.toggleViewedEntity(invoice)} key={key}
                            data-label={key}>{invoice[key]}</td>
                })

                return (
                    <tr key={invoice.id}>
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
        const url = archive === true ? `/api/invoice/archive/${id}` : `/api/invoice/${id}`
        const self = this
        axios.delete(url).then(function (response) {
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
                            <option value='deleted'>Deleted</option>
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
        const { invoices, customers, custom_fields, view } = this.state
        const { status_id, customer_id, searchText } = this.state.filters
        const fetchUrl = `/api/invoice?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}`
        const filters = this.state.customers.length ? this.getFilters() : 'Loading filters'
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
                        <FilterTile filters={filters}/>
                        {addButton}
                        <DataTable
                            ignore={this.state.ignoredColumns}
                            columnMapping={{ customer_id: 'Customer' }}
                            // order={['id', 'number', 'date', 'customer_name', 'total', 'balance', 'status_id']}
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
