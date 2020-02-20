import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label
} from 'reactstrap'
import axios from 'axios'
import CustomerDropdown from '../common/CustomerDropdown'
import PaymentTypeDropdown from '../common/PaymentTypeDropdown'
import moment from 'moment'
import FormBuilder from '../accounts/FormBuilder'
import InvoiceLine from './InvoiceLine'
import AddButtons from '../common/AddButtons'

class AddPayment extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            invoices: this.props.invoices,
            modal: false,
            customer_id: null,
            invoice_id: null,
            transaction_reference: null,
            date: moment(new Date()).format('YYYY-MM-DD'),
            amount: 0,
            type_id: '',
            loading: false,
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            private_notes: '',
            errors: [],
            send_email: true,
            selectedInvoices: [],
            payable_invoices: [],
            message: ''
        }
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.setInvoices = this.setInvoices.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.setAmount = this.setAmount.bind(this)
    }

    componentDidMount () {
        if (localStorage.hasOwnProperty('paymentForm')) {
            const storedValues = JSON.parse(localStorage.getItem('paymentForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck () {
        this.setState({ send_email: !this.state.checked }, () => localStorage.setItem('paymentForm', JSON.stringify(this.state)))
    }

    setAmount (amount) {
        this.setState({ amount: amount }, () => localStorage.setItem('paymentForm', JSON.stringify(this.state)))
    }

    setInvoices (payableInvoices) {
        this.setState({ payable_invoices: payableInvoices }, () => localStorage.setItem('paymentForm', JSON.stringify(this.state)))
    }

    handleCustomerChange (customerId) {
        this.setState({ customer_id: customerId }, () => localStorage.setItem('paymentForm', JSON.stringify(this.state)))
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
        axios.post('/api/payments', {
            date: this.state.date,
            type_id: this.state.type_id,
            invoices: this.state.payable_invoices,
            customer_id: this.state.customer_id,
            amount: this.state.amount,
            send_email: this.state.send_email,
            transaction_reference: this.state.transaction_reference,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            private_notes: this.state.private_notes
        })
            .then((response) => {
                this.toggle()
                const newUser = response.data
                this.props.payments.push(newUser)
                this.props.action(this.props.payments)
                localStorage.removeItem('paymentForm')
                this.setState({
                    type_id: null,
                    transaction_reference: null,
                    invoice_id: null,
                    customer_id: null,
                    amount: null,
                    private_notes: ''
                })
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
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    invoice_id: null,
                    amount: null,
                    type_id: null,
                    customer_id: null,
                    payable_invoices: [],
                    transaction_reference: null,
                    private_notes: ''
                }, () => localStorage.removeItem('paymentForm'))
            }
        })
    }

    render () {
        const { message } = this.state
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Payment
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <FormGroup className="mb-3">
                            <Label>Amount</Label>
                            <Input value={this.state.amount} className={this.hasErrorFor('amount') ? 'is-invalid' : ''}
                                type="text" name="amount"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('amount')}
                        </FormGroup>

                        <FormGroup className="mr-2">
                            <Label for="date">Date(*):</Label>
                            <Input className={this.hasErrorFor('date') ? 'is-invalid' : ''} value={this.state.date}
                                type="date" id="date" name="date"
                                onChange={this.handleInput}/>
                            {this.renderErrorFor('date')}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label>Transaction Reference</Label>
                            <Input className={this.hasErrorFor('transaction_reference') ? 'is-invalid' : ''} type="text"
                                value={this.state.transaction_reference}
                                name="transaction_reference"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('transaction_reference')}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label>Payment Type</Label>
                            <PaymentTypeDropdown
                                errors={this.state.errors}
                                name="type_id"
                                value={this.state.type_id}
                                renderErrorFor={this.renderErrorFor}
                                handleInputChanges={this.handleInput}
                            />
                            {this.renderErrorFor('type_id')}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label>Customer</Label>
                            <CustomerDropdown
                                disabled={true}
                                customer={this.state.customer_id}
                                errors={this.state.errors}
                                name="customer_id"
                                renderErrorFor={this.renderErrorFor}
                                handleInputChanges={this.handleCustomerChange}
                            />
                            {this.renderErrorFor('customer_id')}
                        </FormGroup>

                        <InvoiceLine status={2} handleAmountChange={this.setAmount} errors={this.state.errors}
                            invoices={this.props.invoices}
                            customerChange={this.handleCustomerChange} onChange={this.setInvoices}/>

                        <FormGroup className="mb-3">
                            <Label>Notes</Label>
                            <Input className={this.hasErrorFor('private_notes') ? 'is-invalid' : ''} type="text"
                                value={this.state.private_notes}
                                name="private_notes"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('private_notes')}
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                                <Input value={this.state.send_email} onChange={this.handleCheck} type="checkbox"/>
                                Send Email
                            </Label>
                        </FormGroup>

                        {customForm}

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AddPayment
