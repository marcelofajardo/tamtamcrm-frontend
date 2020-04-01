import { Badge } from 'reactstrap'
import React from 'react'
import FormatMoney from '../common/FormatMoney'
import FormatDate from '../common/FormatDate'

export default function PaymentPresenter (props) {
    const colors = {
        Pending: 'secondary',
        Voided: 'danger',
        Failed: 'danger',
        Completed: 'success',
        'Partially Refunded': 'dark',
        Refunded: 'danger'
    }

    const { field, entity } = props

    const status = !entity.deleted_at
        ? <Badge color={colors[entity.status]}>{entity.status}</Badge>
        : <Badge color="warning">Archived</Badge>

    console.log('paymentables', props.paymentables)

    const paymentInvoices = props.paymentables && Object.keys(props.paymentables).length > 0 ? Array.prototype.map.call(props.paymentables, s => s.number).toString() : null

    switch (field) {
        case 'amount':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Total">{<FormatMoney
                customers={props.customers} customer_id={entity.customer_id}
                amount={entity.amount}/>}</td>
        case 'applied':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Applied">{<FormatMoney
                customers={props.customers} customer_id={entity.customer_id}
                amount={entity.applied}/>}</td>
        case 'date': {
            return <FormatDate field={field} date={entity[field]} />
        }

        case 'status':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Status">{status}</td>

        case 'customer_id': {
            const index = props.customers.findIndex(customer => customer.id === entity[field])
            const customer = props.customers[index]
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)}
                data-label="Customer">{customer.name}</td>
        }

        case 'invoices':
            return <td data-label="Invoices">{paymentInvoices}</td>

        default:
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} key={field}
                data-label={field}>{entity[field]}</td>
    }
}
