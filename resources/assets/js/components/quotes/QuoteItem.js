import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditQuote from './EditQuote'
import QuotePresenter from '../presenters/QuotePresenter'

export default class QuoteItem extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const { quotes, custom_fields, customers } = this.props
        if (this.props.quotes && this.props.quotes.length && customers.length) {
            return quotes.map(user => {
                const restoreButton = user.deleted_at
                    ? <RestoreModal id={user.id} entities={quotes} updateState={this.props.updateInvoice}
                        url={`/api/quotes/restore/${user.id}`}/> : null

                const deleteButton = !user.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteQuote} id={user.id}/> : null

                const archiveButton = !user.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteQuote} id={user.id}/> : null

                const editButton = !user.deleted_at ? <EditQuote
                    custom_fields={custom_fields}
                    customers={customers}
                    modal={true}
                    add={false}
                    invoice={user}
                    invoice_id={user.id}
                    action={this.props.updateInvoice}
                    invoices={quotes}
                /> : null

                const columnList = Object.keys(user).filter(key => {
                    return this.props.ignoredColumns && !this.props.ignoredColumns.includes(key)
                }).map(key => {
                    return <QuotePresenter key={key} customers={customers} toggleViewedEntity={this.props.toggleViewedEntity}
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
