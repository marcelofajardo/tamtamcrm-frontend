import { Badge } from 'reactstrap'
import React from 'react'
import moment from 'moment'

export default function ExpensePresenter (props) {
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

    const paymentInvoices = entity.invoices && Object.keys(entity.invoices).length > 0 ? Array.prototype.map.call(entity.invoices, s => s.number).toString() : null

    switch (field) {
        case 'expense_date':
        case 'payment_date':
            const date = moment(entity[field]).format('D/MMM/YYYY')
            return <td data-label="Date">{date}</td>
        case 'status':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.transaction_reference)}
                data-label="Status">{status}</td>
        case 'customer_id':
            const index = props.customers.findIndex(customer => customer.id === entity[field])
            const customer = props.customers[index]
            return <td onClick={() => this.toggleViewedEntity(entity, entity.number)}
                data-label="Customer">{`${customer.first_name} ${customer.last_name}`}</td>

        case 'invoices':
            return <td data-label="Invoices">{paymentInvoices}</td>

        default:
            return <td onClick={() => props.toggleViewedEntity(entity, entity.transaction_reference)} key={field}
                data-label={field}>{entity[field]}</td>
    }
}
