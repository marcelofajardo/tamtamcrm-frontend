import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import axios from 'axios'
import AddExpense from './AddExpense'
import EditExpense from './EditExpense'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import {
    Card, CardBody, Input
} from 'reactstrap'
import ActionsMenu from '../common/ActionsMenu'
import ViewEntity from '../common/ViewEntity'
import ExpensePresenter from '../presenters/ExpensePresenter'
import ExpenseFilters from './ExpenseFilters'

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
            companies: [],
            cachedData: [],
            bulk: [],
            dropdownButtonActions: ['download'],
            filters: {
                status_id: 'active',
                searchText: '',
                customer_id: '',
                company_id: '',
                start_date: '',
                end_date: ''
            },
            ignoredColumns:
                [
                    'user_id',
                    'company_id',
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
                    'public_notes',
                    'private_notes',
                    'archived_at',
                    'created_at',
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
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
        this.getCompanies()
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

    getCompanies () {
        axios.get('/api/companies')
            .then((r) => {
                this.setState({
                    companies: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    filterExpenses (filters) {
        this.setState({ filters: filters })
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
        axios.post('/api/expense/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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
        const cachedData = !this.state.cachedData.length ? expenses : this.state.cachedData
        this.setState({
            expenses: expenses,
            cachedData: cachedData
        })
    }

    expenseList () {
        const { expenses, customers, custom_fields, ignoredColumns, companies } = this.state
        if (expenses && expenses.length && customers.length) {
            return expenses.map(expense => {
                const restoreButton = expense.deleted_at
                    ? <RestoreModal id={expense.id} entities={expenses} updateState={this.addUserToState}
                        url={`/api/expenses/restore/${expense.id}`}/> : null
                const archiveButton = !expense.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteExpense} id={expense.id}/> : null
                const deleteButton = !expense.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteExpense} id={expense.id}/> : null
                const editButton = !expense.deleted_at ? <EditExpense
                    companies={companies}
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
                    return <ExpensePresenter key={key} companies={companies} customers={customers}
                        toggleViewedEntity={this.toggleViewedEntity}
                        field={key} entity={expense}/>
                })

                return (
                    <tr key={expense.id}>
                        <td>
                            <Input value={expense.id} type="checkbox" onChange={this.onChangeBulk}/>
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
        const { expenses, customers, custom_fields, view, companies } = this.state
        const { searchText, status_id, customer_id, company_id, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/expenses?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&company_id=${company_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = customers.length ? <AddExpense
            custom_fields={custom_fields}
            customers={customers}
            companies={companies}
            action={this.updateExpenses}
            expenses={expenses}
        /> : null

        return this.state.customers.length ? (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <ExpenseFilters expenses={expenses} companies={companies}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={this.state.filters} filter={this.filterExpenses}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}

                        <DataTable
                            columnMapping={{ customer_id: 'CUSTOMER' }}
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
