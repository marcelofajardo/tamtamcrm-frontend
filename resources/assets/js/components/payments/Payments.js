import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import AddPayment from './AddPayment'
import EditPayment from './EditPayment'
import { FormGroup, Input, Badge, Card, CardBody, Row, Col } from 'reactstrap'
import axios from 'axios'
import DeleteModal from '../common/DeleteModal'
import RestoreModal from '../common/RestoreModal'
import Refund from './Refund'
import CustomerDropdown from '../common/CustomerDropdown'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'
import PaymentPresenter from '../presenters/PaymentPresenter'
import DateFilter from '../common/DateFilter'

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
            ignoredColumns: ['paymentables', 'user_id', 'id', 'customer', 'invoice_id', 'applied', 'assigned_user_id', 'deleted_at', 'updated_at', 'type_id', 'refunded', 'is_manual', 'task_id', 'company_id', 'invitation_id'],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: ''
            },
            invoices: [],
            customers: [],
            showRestoreButton: false
        }

        this.updateCustomers = this.updateCustomers.bind(this)
        this.customerList = this.customerList.bind(this)
        this.deletePayment = this.deletePayment.bind(this)
        this.getInvoices = this.getInvoices.bind(this)
        this.filterPayments = this.filterPayments.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
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

    filterPayments (event) {
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

    getPaymentables (payment) {
        const invoiceIds = payment.paymentables.filter(paymentable => {
            return paymentable.payment_id === payment.id && paymentable.paymentable_type === 'App\\Invoice'
        }).map(paymentable => {
            return parseInt(paymentable.paymentable_id)
        })

        const invoices = this.state.invoices.filter(invoice => {
            return invoiceIds.includes(invoice.id)
        })

        return invoices
    }

    customerList () {
        const { payments, custom_fields, invoices, customers } = this.state
        if (payments && payments.length && customers.length && invoices.length) {
            return payments.map(payment => {
                const paymentableInvoices = this.getPaymentables(payment)

                const restoreButton = payment.deleted_at
                    ? <RestoreModal id={payment.id} entities={payments} updateState={this.updateCustomers}
                        url={`/api/payments/restore/${payment.id}`}/> : null

                const archiveButton = !payment.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deletePayment} id={payment.id}/> : null

                const deleteButton = !payment.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deletePayment} id={payment.id}/> : null

                const editButton = !payment.deleted_at ? <EditPayment
                    custom_fields={custom_fields}
                    invoices={invoices}
                    payment={payment}
                    action={this.updateCustomers}
                    payments={payments}
                    customers={customers}
                    modal={true}
                /> : null

                const columnList = Object.keys(payment).filter(key => {
                    return this.state.ignoredColumns && !this.state.ignoredColumns.includes(key)
                }).map(key => {
                    return <PaymentPresenter customers={customers} field={key} entity={payment}
                        toggleViewedEntity={this.toggleViewedEntity}/>
                })

                const refundButton = paymentableInvoices.length && invoices.length
                    ? <Refund customers={customers} payment={payment} allInvoices={paymentableInvoices}
                        invoices={invoices}
                        payments={this.state.payments}
                        action={this.updateCustomers}/> : null

                return (
                    <tr key={payment.id}>
                        <td>
                            <ActionsMenu edit={editButton} delete={deleteButton} archive={archiveButton}
                                refund={refundButton}
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

    getFilters () {
        const columnFilter = this.state.payments.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns}
                columns={Object.keys(this.state.payments[0]).concat(this.state.ignoredColumns)}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterPayments}/>
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.filterPayments}
                        customer={this.state.filters.customer_id}
                        name="customer_id"
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter update={this.updateCustomers}
                            data={this.state.cachedData}/>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterPayments}
                            id="status_id"
                            name="status_id"
                        >
                            <option value="">Select Status</option>
                            <option value='active'>Active</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
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

    deletePayment (id, archive = true) {
        const url = archive === true ? `/api/payments/archive/${id}` : `/api/payments/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrPayments = [...self.state.payments]
                const index = arrPayments.findIndex(payment => payment.id === id)
                arrPayments.splice(index, 1)
                self.updateCustomers(arrPayments)
            })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    render () {
        const { payments, custom_fields, invoices, view } = this.state
        const { status_id, searchText, customer_id } = this.state.filters
        const fetchUrl = `/api/payments?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}`
        const filters = this.getFilters()
        const addButton = invoices.length ? <AddPayment
            custom_fields={custom_fields}
            invoices={invoices}
            action={this.updateCustomers}
            payments={payments}
        /> : null

        return <div className="data-table">

            <Card>
                <CardBody>
                    <FilterTile filters={filters}/>
                    {addButton}

                    <DataTable
                        columnMapping={{ customer_id: 'Customer' }}
                        ignore={this.state.ignoredColumns}
                        disableSorting={['id', 'invoice_id']}
                        defaultColumn='amount'
                        userList={this.customerList}
                        fetchUrl={fetchUrl}
                        updateState={this.updateCustomers}
                    />
                </CardBody>
            </Card>

            <ViewEntity
                ignore={['paymentables', 'id', 'customer', 'invoice_id', 'applied', 'deleted_at', 'customer_id', 'refunded', 'task_id', 'company_id']}
                toggle={this.toggleViewedEntity} title={view.title}
                viewed={view.viewMode}
                entity={view.viewedId}/>
        </div>
    }
}
