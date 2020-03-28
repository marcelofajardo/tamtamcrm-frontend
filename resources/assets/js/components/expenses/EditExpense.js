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
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import DetailsForm from './DetailsForm'
import SettingsForm from './SettingsForm'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'
import ExpenseModel from '../models/ExpenseModel'
import DropdownMenuBuilder from '../common/DropdownMenuBuilder'

class EditExpense extends React.Component {
    constructor (props) {
        super(props)
        this.expenseModel = new ExpenseModel(this.props.expense, this.props.customers)
        this.initialState = this.expenseModel.fields
        this.state = this.initialState

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
        console.log('e', e)
        if (e.target.name === 'expense_currency_id') {
            const exchange_rate = this.expenseModel.getExchangeRateForCurrency(e.target.value)
            this.setState({ exchange_rate: exchange_rate })
        }

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        this.setState({
            [e.target.name]: value,
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
            should_be_invoiced: this.state.should_be_invoiced,
            transaction_reference: this.state.transaction_reference,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4
        }
    }

    handleClick () {
        this.expenseModel.update(this.getFormData()).then(response => {
            if (!response) {
                this.setState({ errors: this.expenseModel.errors, message: this.expenseModel.error_message })
                return
            }

            const index = this.props.expenses.findIndex(expense => expense.id === this.state.id)
            this.props.expenses[index] = response
            this.props.action(this.props.expenses)
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

                        <DropdownMenuBuilder formData={this.getFormData()} model={this.expenseModel}/>
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
                                <DetailsForm errors={this.state.errors}
                                    handleInput={this.handleInput} expense={this.state}
                                    customers={this.props.customers} companies={this.props.companies}/>

                                <CustomFieldsForm handleInput={this.handleInput}
                                    custom_value1={this.state.custom_value1}
                                    custom_value2={this.state.custom_value2}
                                    custom_value3={this.state.custom_value3}
                                    custom_value4={this.state.custom_value4}
                                    custom_fields={this.props.custom_fields}/>

                            </TabPane>

                            <TabPane tabId="2">
                                <SettingsForm errors={this.state.errors}

                                    handleInput={this.handleInput}

                                    expense={this.state}/>
                            </TabPane>

                            <TabPane tabId="3">
                                <Notes errors={this.state.errors} public_notes={this.state.public_notes}
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
