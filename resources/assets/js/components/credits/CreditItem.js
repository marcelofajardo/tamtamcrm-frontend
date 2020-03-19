import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditCredit from './EditCredit'
import CreditPresenter from '../presenters/CreditPresenter'

export default class CreditItem extends Component {
    constructor (props) {
        super(props)

        this.deleteCredit = this.deleteCredit.bind(this)
    }

    deleteCredit (id, archive = false) {
        const url = archive === true ? `/api/credits/archive/${id}` : `/api/credits/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrPayments = [...self.props.credits]
                const index = arrPayments.findIndex(payment => payment.id === id)
                arrPayments.splice(index, 1)
                self.props.updateCustomers(arrPayments)
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
        const { credits, customers, custom_fields, ignoredColumns } = this.props
        if (credits && credits.length && customers.length) {
            return credits.map(credit => {
                const editButton = !credit.deleted_at ? <EditCredit
                    custom_fields={custom_fields}
                    credit={credit}
                    action={this.props.updateCustomers}
                    credits={credits}
                    customers={customers}
                    modal={true}
                /> : null
                const restoreButton = credit.deleted_at
                    ? <RestoreModal id={credit.id} entities={credits} updateState={this.props.updateCustomers}
                        url={`/api/credits/restore/${credit.id}`}/> : null
                const archiveButton = !credit.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteCredit} id={credit.id}/> : null
                const deleteButton = !credit.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteCredit} id={credit.id}/> : null

                const columnList = Object.keys(credit).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <CreditPresenter key={key} customers={customers} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={credit}/>
                })
                return (
                    <tr key={credit.id}>
                        <td>
                            <Input value={credit.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
