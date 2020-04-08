import React, { Component } from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap'
import AddRecurringInvoice from '../recurringInvoices/AddRecurringInvoice'
import Address from './Address'
import CustomerDropdown from '../common/CustomerDropdown'
import CompanyDropdown from '../common/CompanyDropdown'
import Datepicker from '../common/Datepicker'

export default class Details extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            is_recurring: false
        }
        this.handleSlideClick = this.handleSlideClick.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleSlideClick (e) {
        this.setState({ is_recurring: e.target.checked })
    }

    hasErrorFor (field) {
        return this.props.errors && !!this.props.errors[field]
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
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Recurring</CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label>Is Recurring?</Label>
                            <Input type="checkbox" onChange={this.handleSlideClick}/>
                        </FormGroup>

                        <div className={this.state.is_recurring ? 'collapse show' : 'collapse'}>
                            <AddRecurringInvoice
                                invoice={this.props.invoice}
                                setRecurring={this.props.setRecurring}
                            />

                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>Details</CardHeader>
                    <CardBody>

                        <h2>{this.props.customerName}</h2>
                        <Address address={this.props.address}/>

                        <FormGroup>
                            <Label for="date">Invoice Date(*):</Label>
                            <Datepicker name="date" date={this.props.invoice.date} handleInput={this.props.handleInput}
                                className={this.hasErrorFor('date') ? 'form-control is-invalid' : 'form-control'}/>
                            {this.renderErrorFor('date')}
                        </FormGroup>
                        <FormGroup>
                            <Label for="due_date">Due Date(*):</Label>
                            <Datepicker name="due_date" date={this.props.invoice.due_date} handleInput={this.props.handleInput}
                                className={this.hasErrorFor('due_date') ? 'form-control is-invalid' : 'form-control'}/>
                            {this.renderErrorFor('due_date')}
                        </FormGroup>
                        <FormGroup>
                            <Label for="po_number">PO Number(*):</Label>
                            <Input value={this.props.invoice.po_number} type="text" id="po_number" name="po_number"
                                onChange={this.props.handleInput}/>
                            {this.renderErrorFor('po_number')}
                        </FormGroup>
                        <FormGroup>
                            <Label>Partial</Label>
                            <Input
                                value={this.props.invoice.partial}
                                type='text'
                                name='partial'
                                id='partial'
                                onChange={this.props.handleInput}
                            />
                        </FormGroup>

                        <FormGroup className={this.props.invoice.has_partial === true ? '' : 'd-none'}>
                            <Label>Partial Due Date</Label>
                            <Datepicker name="partial_due_date" date={this.props.invoice.partial_due_date} handleInput={this.props.handleInput}
                                className={this.hasErrorFor('partial_due_date') ? 'form-control is-invalid' : 'form-control'}/>
                        </FormGroup>

                        <CustomerDropdown
                            handleInputChanges={this.props.handleInput}
                            customer={this.props.invoice.customer_id}
                            customers={this.props.customers}
                            errors={this.props.errors}
                        />

                        <CompanyDropdown
                            company_id={this.props.invoice.company_id}
                            name="company_id"
                            hasErrorFor={this.hasErrorFor}
                            errors={this.props.errors}
                            handleInputChanges={this.props.handleInput}
                        />
                    </CardBody>
                </Card>
            </React.Fragment>

        )
    }
}
