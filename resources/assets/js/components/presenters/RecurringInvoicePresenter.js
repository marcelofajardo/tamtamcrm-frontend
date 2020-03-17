import { Badge } from 'reactstrap'
import React from 'react'
import moment from 'moment'
import FormatMoney from '../common/FormatMoney'
import FormatDate from '../common/FormatDate'

export default function RecurringInvoicePresenter (props) {
    const colors = {
        2: 'primary',
        3: 'primary',
        '-3': 'danger',
        '-1': 'primary',
        Partial: 'dark',
        '-2': 'success'
    }

    const statuses = {
        2: 'Draft',
        3: 'Active',
        '-3': 'Cancelled',
        '-1': 'Pending',
        '-2': 'Completed'
    }

    const { field, entity } = props

    const status = !entity.deleted_at
        ? <Badge color={colors[entity.status_id]}>{statuses[entity.status_id]}</Badge>
        : <Badge className="mr-2" color="warning">Archived</Badge>

    switch (field) {
        case 'total':
            return <td onClick={() => props.toggleViewedEntity(entity, entity.number)} data-label="Total">{<FormatMoney
                customers={props.customers} customer_id={entity.customer_id}
                amount={entity.total}/>}</td>
        case 'date':
        case 'due_date':
        case 'start_date': {
            return <FormatDate field={field} date={entity[field]} />
        }

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
