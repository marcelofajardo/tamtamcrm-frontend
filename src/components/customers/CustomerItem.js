import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditCustomer from './EditCustomer'
import CustomerPresenter from '../presenters/CustomerPresenter'

export default class CustomerItem extends Component {
    constructor (props) {
        super(props)

        this.deleteCustomer = this.deleteCustomer.bind(this)
    }

    deleteCustomer (id, archive = false) {
        const url = archive === true ? `/api/customers/archive/${id}` : `/api/customers/${id}`
        axios.delete(url).then(data => {
            const arrCustomers = [...this.props.customers]
            const index = arrCustomers.findIndex(customer => customer.id === id)
            arrCustomers.splice(index, 1)
            this.props.updateCustomers(arrCustomers)
        })
    }

    render () {
        const { customers, custom_fields, ignoredColumns } = this.props
        if (customers && customers.length) {
            return customers.map(customer => {
                const restoreButton = customer.deleted_at
                    ? <RestoreModal id={customer.id} entities={customers} updateState={this.props.updateCustomers}
                        url={`/api/customers/restore/${customer.id}`}/> : null
                const archiveButton = !customer.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteCustomer} id={customer.id}/> : null
                const deleteButton = !customer.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteCustomer} id={customer.id}/> : null
                const editButton = !customer.deleted_at && customers.length ? <EditCustomer
                    custom_fields={custom_fields}
                    customer={customer}
                    action={this.props.updateCustomers}
                    customers={customers}
                    modal={true}
                /> : null

                const columnList = Object.keys(customer).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <CustomerPresenter key={key} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={customer}/>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return (
                    <tr key={customer.id}>
                        <td>
                            <Input className={checkboxClass} value={customer.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
