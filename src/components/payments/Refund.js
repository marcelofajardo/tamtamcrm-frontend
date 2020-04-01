import React from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, InputGroup,
    InputGroupAddon, InputGroupText, DropdownItem, FormGroup
} from 'reactstrap'
import axios from 'axios'
import InvoiceLine from './InvoiceLine'

class Refund extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            send_email: false,
            errors: [],
            amount: this.props.payment.amount,
            date: null,
            invoices: this.props.payment.invoices,
            payable_invoices: [],
            selectedInvoices: [],
            id: this.props.payment.id,
            message: ''
        }

        this.initialState = this.state
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.setInvoices = this.setInvoices.bind(this)
        this.setAmount = this.setAmount.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }

    handleInput (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCheck () {
        this.setState({ send_email: !this.state.checked })
    }

    setAmount (amount) {
        this.setState({ amount: amount })
    }

    setInvoices (payableInvoices) {
        this.setState({ payable_invoices: payableInvoices }, () => console.log('payable invoices', payableInvoices))
    }

    handleCustomerChange (customerId) {
        this.setState({ customer_id: customerId }, () => console.log('customer', this.state.customer_id))
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
        axios.put(`/api/refund/${this.state.id}`, {
            amount: this.state.amount,
            invoices: this.state.payable_invoices,
            send_email: this.state.send_email,
            date: this.state.date,
            id: this.props.payment.id
        })
            .then((response) => {
                this.initialState = this.state
                console.log('test', response.data)
                const index = this.props.payments.findIndex(payment => payment.id === this.props.payment.id)
                this.props.payments[index] = response.data
                this.props.action(this.props.payments)
                this.toggle()
            })
            .catch((error) => {
                if (error.response.data.message) {
                    this.setState({ message: error.response.data.message })
                }

                if (error.response.data.errors) {
                    this.setState({
                        errors: error.response.data.errors
                    })
                } else {
                    this.setState({ message: error.response.data })
                }
            })
    }

    toggle () {
        if (this.state.modal) {
            this.setState({ ...this.initialState })
        }

        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-trash-o"/>Refund</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Refund
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Label>Amount</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o"/></InputGroupText>
                            </InputGroupAddon>
                            <Input value={this.state.amount}
                                className={this.hasErrorFor('amount') ? 'is-invalid' : ''} type="text"
                                name="amount"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('amount')}
                        </InputGroup>

                        <Label>Date</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o"/></InputGroupText>
                            </InputGroupAddon>
                            <Input value={this.state.date}
                                className={this.hasErrorFor('date') ? 'is-invalid' : ''} type="date" name="date"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('date')}
                        </InputGroup>

                        <InvoiceLine invoices={this.props.invoices} status={null} handleAmountChange={this.setAmount} errors={this.state.errors}
                            allInvoices={this.props.allInvoices}
                            customerChange={this.handleCustomerChange} onChange={this.setInvoices}/>

                        <FormGroup check>
                            <Label check>
                                <Input value={this.state.send_email} onChange={this.handleCheck} type="checkbox"/>
                                Send Email
                            </Label>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Refund</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Refund
