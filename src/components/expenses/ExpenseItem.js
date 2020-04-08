import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditExpense from './EditExpense'
import ExpensePresenter from '../presenters/ExpensePresenter'

export default class ExpenseItem extends Component {
    constructor (props) {
        super(props)

        this.deleteExpense = this.deleteExpense.bind(this)
    }

    deleteExpense (id, archive = false) {
        const url = archive === true ? `/api/expenses/archive/${id}` : `/api/expenses/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrExpenses = [...self.props.expenses]
                const index = arrExpenses.findIndex(expense => expense.id === id)
                arrExpenses.splice(index, 1)
                self.props.updateExpenses(arrExpenses)
            })
            .catch(function (error) {
                alert(error)
            })
    }

    render () {
        const { expenses, customers, custom_fields, ignoredColumns, companies } = this.props
        if (expenses && expenses.length && customers.length) {
            return expenses.map(expense => {
                const restoreButton = expense.deleted_at
                    ? <RestoreModal id={expense.id} entities={expenses} updateState={this.props.updateExpenses}
                        url={`/api/expenses/restore/${expense.id}`}/> : null
                const archiveButton = !expense.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteExpense} id={expense.id}/> : null
                const deleteButton = !expense.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteExpense} id={expense.id}/> : null
                const editButton = !expense.deleted_at ? <EditExpense
                    companies={companies}
                    custom_fields={custom_fields}
                    expense={expense}
                    action={this.props.updateExpenses}
                    expenses={expenses}
                    customers={customers}
                    modal={true}
                /> : null

                const columnList = Object.keys(expense).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <ExpensePresenter key={key} companies={companies} customers={customers}
                        toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={expense}/>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return (
                    <tr key={expense.id}>
                        <td>
                            <Input className={checkboxClass} value={expense.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
}
