import React from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem
} from 'reactstrap'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import InvoiceLine from './InvoiceLine'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'
import Details from './Details'
import PaymentModel from '../models/PaymentModel'
import DropdownMenuBuilder from '../common/DropdownMenuBuilder'

class EditPayment extends React.Component {
    constructor (props) {
        super(props)

        this.paymentModel = new PaymentModel(this.props.invoices, this.props.payment)
        this.initialState = this.paymentModel.fields
        this.state = this.initialState

        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.setInvoices = this.setInvoices.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.handleInvoiceChange = this.handleInvoiceChange.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }

    handleCheck () {
        this.setState({ send_email: !this.state.checked })
    }

    handleInvoiceChange (e) {
        if (e.target.value === '') {
            return
        }

        const invoice = this.paymentModel.getInvoice(e.target.value)

        if (!invoice) {
            return
        }

        this.setState({
            [e.target.name]: e.target.value,
            customer_id: invoice.customer_id,
            amount: invoice.total
        })

        this.setState({ payable_invoices: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    handleCustomerChange (e) {
        const invoices = this.paymentModel.filterInvoicesByCustomer(e.target.value)

        this.setState({
            [e.target.name]: e.target.value,
            invoices: invoices
        })
    }

    handleInput (e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value,
            changesMade: true
        })
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

    getFormData () {
        return {
            type_id: this.state.type_id,
            invoice_id: this.state.invoice_id,
            customer_id: this.state.customer_id,
            amount: this.state.amount,
            transaction_reference: this.state.transaction_reference,
            invoices: this.state.payable_invoices,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            private_notes: this.state.private_notes
        }
    }

    handleClick () {
        this.paymentModel.update(this.getFormData()).then(response => {
            if (!response) {
                this.setState({ errors: this.paymentModel.errors, message: this.paymentModel.error_message })
                return
            }

            const index = this.props.payments.findIndex(payment => payment.id === this.state.id)
            this.props.payments[index] = response
            this.props.action(this.props.payments)
            this.setState({ changesMade: false })
            this.toggle()
        })
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

    setAmount (amount) {
        this.setState({ amount: amount }, () => localStorage.setItem('paymentForm', JSON.stringify(this.state)))
    }

    setInvoices (payableInvoices) {
        this.setState({ payable_invoices: payableInvoices }, () => localStorage.setItem('paymentForm', JSON.stringify(this.state)))
    }

    render () {
        const { message } = this.state

        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Update Payment
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <DropdownMenuBuilder model={this.paymentModel} formData={this.getFormData()}/>
                        {successMessage}
                        {errorMessage}

                        <Details payment={this.state} errors={this.state.errors} handleInput={this.handleInput}
                            handleCustomerChange={this.handleCustomerChange} handleCheck={this.handleCheck}/>

                        <InvoiceLine lines={this.state.payable_invoices} handleAmountChange={this.setAmount}
                            errors={this.state.errors}
                            invoices={this.props.invoices}
                            customerChange={this.handleCustomerChange} onChange={this.setInvoices}/>

                        <Notes private_notes={this.state.private_notes} handleInput={this.handleInput}/>

                        <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                            custom_value2={this.state.custom_value2}
                            custom_value3={this.state.custom_value3}
                            custom_value4={this.state.custom_value4}
                            custom_fields={this.props.custom_fields}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditPayment
