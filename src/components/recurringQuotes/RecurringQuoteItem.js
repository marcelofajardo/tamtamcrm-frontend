import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import UpdateRecurringQuote from './UpdateRecurringQuote'
import RecurringQuotePresenter from '../presenters/RecurringQuotePresenter'

export default class RecurringQuoteItem extends Component {
    constructor (props) {
        super(props)

        this.deleteInvoice = this.deleteInvoice.bind(this)
    }

    deleteInvoice (id, archive = false) {
        const url = archive === true ? `/api/recurring-quote/archive/${id}` : `/api/recurring-quote/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrQuotes = [...self.props.invoices]
                const index = arrQuotes.findIndex(payment => payment.id === id)
                arrQuotes.splice(index, 1)
                self.props.updateInvoice(arrQuotes)
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
        const { invoices, custom_fields, customers, allQuotes } = this.props
        if (invoices && invoices.length && customers.length) {
            return invoices.map(user => {
                const restoreButton = user.deleted_at
                    ? <RestoreModal id={user.id} entities={invoices} updateState={this.props.updateInvoice}
                        url={`/api/recurringQuote/restore/${user.id}`}/> : null
                const archiveButton = !user.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteInvoice} id={user.id}/> : null

                const deleteButton = !user.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteInvoice} id={user.id}/> : null

                const editButton = !user.deleted_at ? <UpdateRecurringQuote
                    allQuotes={allQuotes}
                    custom_fields={custom_fields}
                    customers={customers}
                    modal={true}
                    add={true}
                    invoice={user}
                    invoice_id={user.id}
                    action={this.props.updateInvoice}
                    invoices={invoices}
                /> : null

                const columnList = Object.keys(user).filter(key => {
                    return this.props.ignoredColumns && !this.props.ignoredColumns.includes(key)
                }).map(key => {
                    return <RecurringQuotePresenter key={key} customers={customers} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={user}/>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return (
                    <tr key={user.id}>
                        <td>
                            <Input className={checkboxClass} value={user.id} type="checkbox" onChange={this.props.onChangeBulk} />
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
