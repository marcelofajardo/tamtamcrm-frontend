import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditInvoice from './EditInvoice'
import InvoicePresenter from '../presenters/InvoicePresenter'

export default class InvoiceItem extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const { invoices, customers, custom_fields } = this.props
        if (invoices && invoices.length && customers.length) {
            return invoices.map(invoice => {
                const restoreButton = invoice.deleted_at
                    ? <RestoreModal id={invoice.id} entities={invoices} updateState={this.props.updateInvoice}
                        url={`/api/invoice/restore/${invoice.id}`}/> : null

                const archiveButton = !invoice.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteInvoice} id={invoice.id}/> : null

                const deleteButton = !invoice.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteInvoice} id={invoice.id}/> : null

                const editButton = !invoice.deleted_at ? <EditInvoice
                    custom_fields={custom_fields}
                    customers={customers}
                    modal={true}
                    add={false}
                    invoice={invoice}
                    invoice_id={invoice.id}
                    action={this.props.updateInvoice}
                    invoices={invoices}
                /> : null

                const columnList = Object.keys(invoice).filter(key => {
                    return this.props.ignoredColumns && !this.props.ignoredColumns.includes(key)
                }).map(key => {
                    return <InvoicePresenter key={key} customers={customers} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={invoice}/>
                })

                return (
                    <tr key={invoice.id}>
                        <td>
                            <Input value={invoice.id} type="checkbox" onChange={this.props.onChangeBulk} />
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
