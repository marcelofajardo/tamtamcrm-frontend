import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import axios from 'axios'
import AddExpense from './AddExpense'
import EditExpense from './EditExpense'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import { Card, CardBody, FormGroup, Input, Row, Col } from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'

export default class Expenses extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            expenses: [],
            filters: {
                status_id: 'active',
                searchText: ''
            },
            ignoredColumns:
                [
                    'user_id',
                    'company_id',
                    'customer_id',
                    'invoice_currency_id',
                    'foreign_amount',
                    'exchange_rate',
                    'deleted_at',
                    'recurring_expense_id',
                    'expense_currency_id',
                    'type_id',
                    'invoice_id',
                    'assigned_user_id',
                    'bank_id',
                    'invoice_category_id',
                    'should_be_invoiced',
                    'invoice_documents',
                    'notes',
                    'archived_at',
                    'updated_at',
                    'is_deleted',
                    'payment_type_id',
                    'custom_value1',
                    'custom_value2',
                    'custom_value3',
                    'custom_value4',
                    'tax_name1',
                    'tax_rate1',
                    'tax_name2',
                    'tax_rate2',
                    'tax_name3',
                    'tax_rate3'
                ],
            custom_fields: [],
            customers: [],
            showRestoreButton: false
        }

        this.updateExpenses = this.updateExpenses.bind(this)
        this.expenseList = this.expenseList.bind(this)
        this.deleteExpense = this.deleteExpense.bind(this)
        this.filterExpenses = this.filterExpenses.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer') }, function () {
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

    filterExpenses (event) {
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

    getFilters () {
        const columnFilter = this.state.expenses.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns} columns={Object.keys(this.state.expenses[0])}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterExpenses}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        {columnFilter}
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterExpenses}
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

    updateExpenses (expenses) {
        this.setState({ expenses: expenses })
    }

    expenseList () {
        const { expenses, customers, custom_fields, ignoredColumns } = this.state
        console.log('custom_fields', custom_fields)
        if (expenses && expenses.length) {
            return expenses.map(expense => {
                const restoreButton = expense.deleted_at
                    ? <RestoreModal id={expense.id} entities={expenses} updateState={this.addUserToState}
                        url={`/api/expenses/restore/${expense.id}`}/> : null
                const archiveButton = !expense.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteExpense} id={expense.id}/> : null
                const deleteButton = !expense.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteExpense} id={expense.id}/> : null
                const editButton = !expense.deleted_at ? <EditExpense
                    custom_fields={custom_fields}
                    expense={expense}
                    action={this.updateExpenses}
                    expenses={expenses}
                    customers={customers}
                    modal={true}
                /> : null

                const columnList = Object.keys(expense).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.toggleViewedEntity(expense)} data-label={key}>{expense[key]}</td>
                })

                return (
                    <tr key={expense.id}>
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

    getCustomFields () {
        axios.get('api/accounts/fields/Expense')
            .then((r) => {
                this.setState({
                    custom_fields: r.data.fields && Object.keys(r.data.fields).length ? r.data.fields : []
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    deleteExpense (id, archive = true) {
        const url = archive === true ? `/api/expenses/archive/${id}` : `/api/expenses/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrExpenses = [...self.state.expenses]
                const index = arrExpenses.findIndex(expense => expense.id === id)
                arrExpenses.splice(index, 1)
                self.updateExpenses(arrExpenses)
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
        const { expenses, customers, custom_fields, view } = this.state
        const { searchText, status_id } = this.state.filters
        const fetchUrl = `/api/expenses?search_term=${searchText}&status=${status_id}`
        const filters = this.state.customers.length ? this.getFilters() : 'Loading filters'
        const addButton = customers.length ? <AddExpense
            custom_fields={custom_fields}
            customers={customers}
            action={this.updateExpenses}
            expenses={expenses}
        /> : null

        return this.state.customers.length ? (
            <div className="data-table">

                <Card>
                    <CardBody>

                        <FilterTile filters={filters}/>
                        {addButton}

                        <DataTable
                            disableSorting={['id']}
                            defaultColumn='amount'
                            userList={this.expenseList}
                            ignore={this.state.ignoredColumns}
                            fetchUrl={fetchUrl}
                            updateState={this.updateExpenses}
                        />
                    </CardBody>
                </Card>

                <ViewEntity ignore={[]} toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}/>
            </div>
        ) : null
    }
}
