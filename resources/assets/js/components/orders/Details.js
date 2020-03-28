import React from 'react'
import {
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import Datepicker from '../common/Datepicker'
import CustomerDropdown from '../common/CustomerDropdown'
import Address from '../invoice/Address'

export default class Details extends React.Component {
    constructor (props) {
        super(props)

        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
    }

    hasErrorFor (field) {
        return !!this.props.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render () {
        return (<Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <h2>{this.props.customerName}</h2>
                <Address address={this.props.address}/>
                <FormGroup className="mr-2">
                    <Label for="date">Order Date(*):</Label>
                    <Datepicker name="date" date={this.props.order.date} handleInput={this.props.handleInput}
                        className={this.hasErrorFor('date') ? 'form-control is-invalid' : 'form-control'}/>
                    {this.renderErrorFor('date')}
                </FormGroup>

                <CustomerDropdown
                    handleInputChanges={this.props.handleInput}
                    customer={this.props.order.customer_id}
                    customers={this.props.customers}
                    errors={this.props.errors}
                />
            </CardBody>
        </Card>
        )
    }
}
