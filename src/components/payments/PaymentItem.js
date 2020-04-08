import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditPayment from './EditPayment'
import PaymentPresenter from '../presenters/PaymentPresenter'
import Refund from './Refund'

export default class PaymentItem extends Component {
    constructor (props) {
        super(props)

        this.deletePayment = this.deletePayment.bind(this)
    }

    deletePayment (id, archive = true) {
        const url = archive === true ? `/api/payments/archive/${id}` : `/api/payments/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrPayments = [...self.props.payments]
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

    getPaymentables (payment) {
        const invoiceIds = payment.paymentables.filter(paymentable => {
            return paymentable.payment_id === payment.id && paymentable.paymentable_type === 'App\\Invoice'
        }).map(paymentable => {
            return parseInt(paymentable.invoice_id)
        })

        const invoices = this.props.invoices.filter(invoice => {
            return invoiceIds.includes(parseInt(invoice.id))
        })

        return invoices
    }

    render () {
        const { payments, custom_fields, invoices, customers } = this.props
        if (payments && payments.length && customers.length && invoices.length) {
            return payments.map(payment => {
                const paymentableInvoices = invoices && invoices.length ? this.getPaymentables(payment) : null

                const restoreButton = payment.deleted_at
                    ? <RestoreModal id={payment.id} entities={payments} updateState={this.props.updateCustomers}
                        url={`/api/payments/restore/${payment.id}`}/> : null

                const archiveButton = !payment.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deletePayment} id={payment.id}/> : null

                const deleteButton = !payment.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deletePayment} id={payment.id}/> : null

                const editButton = !payment.deleted_at ? <EditPayment
                    custom_fields={custom_fields}
                    invoices={invoices}
                    payment={payment}
                    action={this.props.updateCustomers}
                    payments={payments}
                    customers={customers}
                    modal={true}
                /> : null

                const columnList = Object.keys(payment).filter(key => {
                    return this.props.ignoredColumns && !this.props.ignoredColumns.includes(key)
                }).map(key => {
                    return <PaymentPresenter key={key} customers={customers} field={key}
                        paymentables={paymentableInvoices} entity={payment}
                        toggleViewedEntity={this.props.toggleViewedEntity}/>
                })

                const refundButton = paymentableInvoices.length && invoices.length
                    ? <Refund customers={customers} payment={payment} allInvoices={paymentableInvoices}
                        invoices={invoices}
                        payments={payments}
                        action={this.props.updateCustomers}/> : null

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return (
                    <tr key={payment.id}>
                        <td>
                            <Input className={checkboxClass} value={payment.id} type="checkbox"
                                onChange={this.props.onChangeBulk}/>
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
}
