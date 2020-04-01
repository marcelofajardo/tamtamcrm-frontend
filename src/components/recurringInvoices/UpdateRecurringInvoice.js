import React, { Component } from 'react'
import moment from 'moment'
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, DropdownItem } from 'reactstrap'
import axios from 'axios'
import Notes from '../common/Notes'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Datepicker from '../common/Datepicker'

class UpdateRecurringInvoice extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            errors: [],
            is_recurring: false,
            changesMade: false,
            id: this.props.invoice.id,
            invoice_id: this.props.invoice && this.props.invoice.invoice_id ? this.props.invoice.invoice_id : 0,
            customer_id: this.props.invoice && this.props.invoice.customer_id ? this.props.invoice.customer_id : 0,
            finance_type: this.props.finance_type ? this.props.finance_type : 1,
            start_date: this.props.invoice && this.props.invoice.start_date ? this.props.invoice.start_date : moment(new Date()).format('YYYY-MM-DD'),
            end_date: this.props.invoice && this.props.invoice.end_date ? this.props.invoice.end_date : moment(new Date()).format('YYYY-MM-DD'),
            recurring_due_date: this.props.invoice && this.props.invoice.recurring_due_date ? this.props.invoice.recurring_due_date : moment(new Date()).format('YYYY-MM-DD'),
            frequency: this.props.invoice && this.props.invoice.frequency ? this.props.invoice.frequency : 1,
            custom_value1: this.props.invoice.custom_value1,
            custom_value2: this.props.invoice.custom_value2,
            custom_value3: this.props.invoice.custom_value3,
            custom_value4: this.props.invoice.custom_value4,
            public_notes: this.props.invoice.public_notes,
            private_notes: this.props.invoice.private_notes
        }

        this.initialState = this.state
        this.handleInput = this.handleInput.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handleClick () {
        axios.put(`/api/recurring-invoice/${this.state.id}`, {
            start_date: this.state.start_date,
            invoice_id: this.state.invoice_id,
            customer_id: this.state.customer_id,
            end_date: this.state.end_date,
            recurring_due_date: this.state.recurring_due_date,
            frequency: this.state.frequency,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes
        })
            .then((response) => {
                const index = this.props.invoices.findIndex(invoice => invoice.id === this.props.invoice.id)
                this.props.invoices[index] = response.data
                this.props.action(this.props.invoices)
                this.setState({ changesMade: false })
                this.toggle()
            })
            .catch((error) => {
                alert(error)
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleInput (e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value,
            changesMade: true
        })

        if (this.props.setRecurring) {
            this.props.setRecurring(JSON.stringify(this.state))
        }
    }

    toggle () {
        if (this.state.modal && this.state.changesMade) {
            if (window.confirm('Your changes have not been saved?')) {
                this.setState({ ...this.initialState })
            }

            return
        }

        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    render () {
        const inlineClass = this.props ? 'mb-4' : 'form-inline mb-4'

        const form = (
            <div className={inlineClass}>
                <FormGroup>
                    <Label for="start_date">Start Date(*):</Label>
                    <Datepicker name="start_date" date={this.state.start_date} handleInput={this.handleInput}
                        className={this.hasErrorFor('start_date') ? 'form-control is-invalid' : 'form-control'}/>
                    {this.renderErrorFor('start_date')}
                </FormGroup>

                <FormGroup>
                    <Label for="end_date">End Date(*):</Label>
                    <Datepicker name="end_date" date={this.state.end_date} handleInput={this.handleInput}
                        className={this.hasErrorFor('end_date') ? 'form-control is-invalid' : 'form-control'}/>
                    {this.renderErrorFor('end_date')}
                </FormGroup>

                <FormGroup>
                    <Label for="recurring_due_date">Recurring Due Date(*):</Label>
                    <Datepicker name="recurring_due_date" date={this.state.recurring_due_date} handleInput={this.handleInput}
                        className={this.hasErrorFor('recurring_due_date') ? 'form-control is-invalid' : 'form-control'}/>
                    {this.renderErrorFor('recurring_due_date')}
                </FormGroup>

                <FormGroup>
                    <Label>Frequency</Label>
                    <Input
                        value={this.state.frequency}
                        type='select'
                        name='frequency'
                        id='frequency'
                        onChange={this.handleInput}
                    >
                        <option value=""/>
                        <option value="1">Daily</option>
                        <option value="2">Weekly</option>
                        <option value="3">Every 2 weeks</option>
                        <option value="4">Every 4 weeks</option>
                        <option value="5">Monthly</option>
                        <option value="6">Every 2 months</option>
                        <option value="7">Every 3 months</option>
                        <option value="8">Every 4 months</option>
                        <option value="9">Every 6 months</option>
                        <option value="10">Annually</option>
                        <option value="11">Every 2 years</option>
                        <option value="12">Every 3 years</option>
                    </Input>
                </FormGroup>

                <Notes private_notes={this.state.private_notes} public_notes={this.state.public_notes}
                    handleInput={this.handleInput}/>

                <CustomFieldsForm handleInput={this.handleInput} custom_fields={this.props.custom_fields}
                    custom_value1={this.state.custom_value1} custom_value2={this.state.custom_value2}
                    custom_value3={this.state.custom_value3} custom_value4={this.state.custom_value4}/>
            </div>
        )

        return this.props.modal === true
            ? <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Invoice
                    </ModalHeader>

                    <ModalBody>
                        {form}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
            : form
    }
}

export default UpdateRecurringInvoice
