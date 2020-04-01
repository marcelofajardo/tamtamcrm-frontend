import React from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import AddButtons from '../common/AddButtons'
import SettingsForm from './SettingsForm'
import DetailsForm from './DetailsForm'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'
import ExpenseModel from '../models/ExpenseModel'

class AddExpense extends React.Component {
    constructor (props) {
        super(props)

        this.expenseModel = new ExpenseModel(null, this.props.customers)
        this.initialState = this.expenseModel.fields
        this.state = this.initialState

        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'expenseForm')) {
            const storedValues = JSON.parse(localStorage.getItem('expenseForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    handleInput (e) {
        if (e.target.name === 'expense_currency_id') {
            const exchange_rate = this.expenseModel.getExchangeRateForCurrency(e.target.value)
            this.setState({ exchange_rate: exchange_rate })
        }

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        this.setState({
            [e.target.name]: value
        }, () => localStorage.setItem('expenseForm', JSON.stringify(this.state)))
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

    handleClick () {
        const data = {
            amount: this.state.amount,
            customer_id: this.state.customer_id,
            expense_currency_id: this.state.expense_currency_id,
            exchange_rate: this.state.exchange_rate,
            company_id: this.state.company_id,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            transaction_reference: this.state.transaction_reference,
            invoice_category_id: this.state.category_id,
            expense_date: this.state.expense_date,
            payment_type_id: this.state.payment_type_id,
            invoice_documents: this.state.invoice_documents,
            should_be_invoiced: this.state.should_be_invoiced,
            payment_date: this.state.payment_date,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4
        }

        this.expenseModel.save(data).then(response => {
            if (!response) {
                this.setState({ errors: this.expenseModel.errors, message: this.expenseModel.error_message })
                return
            }
            this.props.expenses.push(response)
            this.props.action(this.props.expenses)
            localStorage.removeItem('expenseForm')
            this.setState(this.initialState)
        })
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState(this.initialState, () => localStorage.removeItem('expenseForm'))
            }
        })
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Expense
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

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
                                    expense={this.state}
                                    handleInput={this.handleInput}
                                    customers={this.props.customers} companies={this.props.companies}/>

                                <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                                    custom_value2={this.state.custom_value2}
                                    custom_value3={this.state.custom_value3}
                                    custom_value4={this.state.custom_value4}
                                    custom_fields={this.props.custom_fields}/>

                            </TabPane>

                            <TabPane tabId="2">
                                <SettingsForm expense={this.state} errors={this.state.errors}
                                    handleInput={this.handleInput}/>
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

export default AddExpense
