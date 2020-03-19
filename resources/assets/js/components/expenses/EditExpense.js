import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    DropdownItem
} from 'reactstrap'
import axios from 'axios'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import DetailsForm from './DetailsForm'
import SettingsForm from './SettingsForm'
import NotesForm from './NotesForm'
import ExpenseDropdown from './ExpenseDropdown'

class EditExpense extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            id: this.props.expense.id,
            amount: this.props.expense.amount,
            date: this.props.expense.date,
            customer_id: this.props.expense.customer_id,
            company_id: this.props.expense.company_id,
            category_id: this.props.expense.category_id,
            public_notes: this.props.expense.public_notes,
            private_notes: this.props.expense.private_notes,
            custom_value1: this.props.expense.custom_value1,
            custom_value2: this.props.expense.custom_value2,
            custom_value3: this.props.expense.custom_value3,
            custom_value4: this.props.expense.custom_value4,
            expense_currency_id: this.props.expense.expense_currency_id,
            exchange_rate: this.props.expense.exchange_rate,
            transaction_reference: this.props.expense.transaction_reference,
            payment_type_id: this.props.expense.payment_type_id,
            expense_date: this.props.expense.expense_date,
            payment_date: this.props.expense.payment_date,
            invoice_documents: this.props.expense.invoice_documents,
            errors: [],
            message: '',
            activeTab: '1',
            currencyOpen: false,
            paymentOpen: false,
            changesMade: false,
            loading: false,
            modal: false,
            dropdownOpen: false,
            showSuccessMessage: false,
            showErrorMessage: false
        }

        this.formFields = [
            [
                // {
                //     name: 'mark_billable',
                //     label: 'Mark Billable',
                //     type: 'checkbox',
                //     placeholder: 'Update Products'
                // },
                // {
                //     name: 'mark_paid',
                //     label: 'Mark Paid',
                //     type: 'checkbox',
                //     placeholder: 'Show Cost'
                // },
                // {
                //     name: 'convert_currency',
                //     label: 'Convert Currency',
                //     type: 'checkbox',
                //     placeholder: 'Show Product Quantity'
                // },
                {
                    name: 'invoice_documents',
                    label: 'Add Documents to invoice',
                    type: 'checkbox',
                    placeholder: 'Fill Products'
                }
            ]
        ]

        this.initialState = this.state
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu (event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value,
            changesMade: true
        })
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
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
            amount: this.state.amount,
            customer_id: this.state.customer_id,
            company_id: this.state.company_id,
            payment_type_id: this.state.payment_type_id,
            invoice_category_id: this.state.category_id,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            expense_currency_id: this.state.expense_currency_id,
            exchange_rate: this.state.exchange_rate,
            expense_date: this.state.expense_date,
            payment_date: this.state.payment_date,
            invoice_documents: this.state.invoice_documents,
            transaction_reference: this.state.transaction_reference,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4
        }
    }

    handleClick () {
        const data = this.getFormData()
        axios.put(`/api/expense/${this.state.id}`, data)
            .then((response) => {
                const index = this.props.expenses.findIndex(expense => expense.id === this.props.expense.id)
                this.props.expenses[index] = response.data
                this.props.action(this.props.expenses)
                this.setState({ changesMade: false })
                this.toggle()
            })
            .catch((error) => {
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
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        const { message } = this.state

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Expense
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <ExpenseDropdown formData={this.getFormData()} id={this.state.id} />
                        {successMessage}
                        {errorMessage}

                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '1' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('1')
                                    }}>
                                    Details
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '2' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('2')
                                    }}>
                                    Settings
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '3' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('3')
                                    }}>
                                    Notes
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <DetailsForm custom_fields={this.props.custom_fields} errors={this.state.errors} amount={this.state.amount}
                                    handleInput={this.handleInput} expense_date={this.state.expense_date}
                                    category_id={this.state.category_id} customer_id={this.state.customer_id}
                                    customers={this.props.customers} companies={this.props.companies}
                                    company_id={this.state.company_id}/>

                            </TabPane>

                            <TabPane tabId="2">
                                <SettingsForm errors={this.state.errors}
                                    transaction_reference={this.state.transaction_reference}
                                    handleInput={this.handleInput} payment_date={this.state.payment_date}
                                    payment_type_id={this.state.payment_type_id}
                                    expense_currency_id={this.state.expense_currency_id}
                                    exchange_rate={this.state.exchange_rate}/>
                            </TabPane>

                            <TabPane tabId="3">
                                <NotesForm errors={this.state.errors} public_notes={this.state.public_notes}
                                    private_notes={this.state.private_notes} handleInput={this.handleInput}/>
                            </TabPane>
                        </TabContent>

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

export default EditExpense
