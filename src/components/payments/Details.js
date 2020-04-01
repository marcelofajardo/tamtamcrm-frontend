import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import Datepicker from '../common/Datepicker'
import PaymentTypeDropdown from '../common/PaymentTypeDropdown'
import CustomerDropdown from '../common/CustomerDropdown'

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
                <FormGroup className="mb-3">
                    <Label>Amount</Label>
                    <Input value={this.props.payment.amount} className={this.hasErrorFor('amount') ? 'is-invalid' : ''}
                        type="text" name="amount"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('amount')}
                </FormGroup>

                <FormGroup className="mr-2">
                    <Label for="date">Date(*):</Label>
                    <Datepicker name="date" date={this.props.payment.date} handleInput={this.props.handleInput}
                        className={this.hasErrorFor('date') ? 'form-control is-invalid' : 'form-control'}/>
                    {this.renderErrorFor('date')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Transaction Reference</Label>
                    <Input className={this.hasErrorFor('transaction_reference') ? 'is-invalid' : ''} type="text"
                        value={this.props.payment.transaction_reference}
                        name="transaction_reference"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('transaction_reference')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Payment Type</Label>
                    <PaymentTypeDropdown
                        errors={this.props.errors}
                        name="type_id"
                        payment_type={this.props.payment.type_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleInput}
                    />
                    {this.renderErrorFor('type_id')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Customer</Label>
                    <CustomerDropdown
                        disabled={true}
                        customer={this.props.payment.customer_id}
                        errors={this.props.errors}
                        name="customer_id"
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleCustomerChange}
                    />
                    {this.renderErrorFor('customer_id')}
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input value={this.props.payment.send_email} onChange={this.props.handleCheck} type="checkbox"/>
                            Send Email
                    </Label>
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
