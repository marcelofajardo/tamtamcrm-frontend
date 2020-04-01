import { Badge } from 'reactstrap'
import React from 'react'
import moment from 'moment'
import FormatMoney from '../common/FormatMoney'
import FormatDate from '../common/FormatDate'

export default function InvoicePresenter (props) {
    const colors = {
        1: 'secondary',
        2: 'primary',
        3: 'success',
        4: 'warning',
        5: 'danger',
        '-1': 'danger',
        '-2': 'danger',
        '-3': 'danger'
    }

    const statuses = {
        1: 'Draft',
        2: 'Sent',
        3: 'Paid',
        4: 'Partial',
        5: 'Cancelled',
        '-1': 'Overdue',
        '-2': 'Unpaid',
        '-3': 'Reversed'
    }

    const { field, entity } = props

    const dueDate = moment(entity.due_date).format('YYYY-MM-DD HH::MM:SS')
    const pending_statuses = [1, 2, 4]

    const is_late = moment().isAfter(dueDate) && pending_statuses.includes(entity.status_id)
    const entity_status = is_late === true ? '-1' : entity.status_id

    const status = !entity.deleted_at
        ? <Badge color={colors[entity_status]}>{statuses[entity_status]}</Badge>
        : <Badge className="mr-2" color="warning">Archived</Badge>

    switch (field) {
        case 'total':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Total">{<FormatMoney
                customers={props.customers} customer_id={entity.customer_id}
                amount={entity.total}/>}</td>
        case 'balance':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Balance">{
                <FormatMoney customers={props.customers} customer_id={entity.customer_id}
                    amount={entity.balance}/>}</td>
        case 'date':
        case 'due_date':
            return <FormatDate field={field} date={entity[field]} />

        case 'status_id':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Status">{status}</td>

        case 'customer_id': {
            const index = props.customers.findIndex(customer => customer.id === entity[field])
            const customer = props.customers[index]
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)}
                data-label="Customer">{customer.name}</td>
        }

        default:
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} key={field}
                data-label={field}>{entity[field]}</td>
    }
}
