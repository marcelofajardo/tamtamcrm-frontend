import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import UpdateRecurringInvoice from './UpdateRecurringInvoice'
import RecurringInvoicePresenter from '../presenters/RecurringInvoicePresenter'

export default class RecurringInvoiceItem extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const { invoices, custom_fields, customers, allInvoices } = this.props
        if (invoices && invoices.length && customers.length) {
            return invoices.map(user => {
                const restoreButton = user.deleted_at
                    ? <RestoreModal id={user.id} entities={invoices} updateState={this.props.updateInvoice}
                        url={`/api/recurringInvoice/restore/${user.id}`}/> : null

                const archiveButton = !user.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteInvoice} id={user.id}/> : null

                const deleteButton = !user.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteInvoice} id={user.id}/> : null

                const editButton = !user.deleted_at ? <UpdateRecurringInvoice
                    allInvoices={allInvoices}
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
                    return <RecurringInvoicePresenter key={key} customers={customers} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={user}/>
                })

                return (
                    <tr key={user.id}>
                        <td>
                            <Input value={user.id} type="checkbox" onChange={this.props.onChangeBulk} />
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
