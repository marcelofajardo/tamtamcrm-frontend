import React, { Component } from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap'
import Address from './Address'
import CustomerDropdown from '../common/CustomerDropdown'
import CompanyDropdown from '../common/CompanyDropdown'
import FormBuilder from '../accounts/FormBuilder'
import AddRecurringQuote from '../recurringQuotes/AddRecurringQuote'

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
        const customFields = this.props.custom_fields ? this.props.custom_fields : []

        if (customFields[0] && Object.keys(customFields[0]).length) {
            customFields[0].forEach((element, index, array) => {
                if (this.props[element.name] && this.props[element.name].length) {
                    customFields[0][index].value = this.props[element.name]
                }
            })
        }

        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.props.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

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
                            <AddRecurringQuote
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
                            <Label for="date">Quote Date(*):</Label>
                            <Input value={this.props.date} type="date" id="date" name="date"
                                onChange={this.props.handleInput}/>
                            {this.renderErrorFor('due_date')}
                        </FormGroup>
                        <FormGroup>
                            <Label for="due_date">Expiry Date(*):</Label>
                            <Input value={this.props.due_date} type="date" id="due_date" name="due_date"
                                onChange={this.props.handleInput}/>
                            {this.renderErrorFor('due_date')}
                        </FormGroup>
                        <FormGroup>
                            <Label for="po_number">PO Number(*):</Label>
                            <Input value={this.props.po_number} type="text" id="po_number" name="po_number"
                                onChange={this.props.handleInput}/>
                            {this.renderErrorFor('po_number')}
                        </FormGroup>
                        <FormGroup>
                            <Label>Partial</Label>
                            <Input
                                value={this.props.partial}
                                type='text'
                                name='partial'
                                id='partial'
                                onChange={this.props.handleInput}
                            />
                        </FormGroup>

                        <CustomerDropdown
                            handleInputChanges={this.props.handleInput}
                            customer={this.props.customer_id}
                            customers={this.props.customers}
                            errors={this.props.errors}
                        />

                        <CompanyDropdown
                            company_id={this.props.company_id}
                            name="company_id"
                            hasErrorFor={this.hasErrorFor}
                            errors={this.props.errors}
                            handleInputChanges={this.props.handleInput}
                        />

                        {customForm}
                    </CardBody>
                </Card>
            </React.Fragment>

        )
    }
}
