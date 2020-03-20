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
    TabPane
} from 'reactstrap'
import axios from 'axios'
import moment from 'moment'
import AddButtons from '../common/AddButtons'
import SettingsForm from './SettingsForm'
import DetailsForm from './DetailsForm'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'

class AddExpense extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            amount: 0,
            date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            public_notes: '',
            private_notes: '',
            customer_id: null,
            expense_currency_id: null,
            payment_type_id: null,
            exchange_rate: 1,
            transaction_reference: null,
            payment_date: null,
            invoice_documents: false,
            should_be_invoiced: false,
            expense_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            company_id: null,
            category_id: null,
            notes: null,
            loading: false,
            errors: [],
            message: '',
            activeTab: '1'
        }

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
        this.setState({
            [e.target.name]: e.target.value
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
        axios.post('/api/expense', {
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
        })
            .then((response) => {
                const newUser = response.data
                this.props.expenses.push(newUser)
                this.props.action(this.props.expenses)
                localStorage.removeItem('expenseForm')
                this.setState({
                    paymentOpen: false,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    customer_id: null,
                    expense_currency_id: null,
                    payment_type_id: null,
                    exchange_rate: 1,
                    transaction_reference: null,
                    payment_date: null,
                    invoice_documents: false,
                    should_be_invoiced: false,
                    expense_date: null,
                    company_id: null,
                    category_id: null,
                    public_notes: null,
                    private_notes: null,
                    loading: false
                })
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
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    paymentOpen: false,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    customer_id: null,
                    expense_currency_id: null,
                    payment_type_id: null,
                    exchange_rate: 1,
                    transaction_reference: null,
                    payment_date: null,
                    invoice_documents: false,
                    should_be_invoiced: false,
                    expense_date: null,
                    company_id: null,
                    category_id: null,
                    public_notes: null,
                    private_notes: null,
                    loading: false
                }, () => localStorage.removeItem('expenseForm'))
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
                                    amount={this.state.amount}
                                    handleInput={this.handleInput} expense_date={this.state.expense_date}
                                    category_id={this.state.category_id} customer_id={this.state.customer_id}
                                    customers={this.props.customers} companies={this.props.companies}
                                    company_id={this.state.company_id}/>

                                <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                                    custom_value2={this.state.custom_value2}
                                    custom_value3={this.state.custom_value3}
                                    custom_value4={this.state.custom_value4}
                                    custom_fields={this.props.custom_fields}/>

                            </TabPane>

                            <TabPane tabId="2">
                                <SettingsForm errors={this.state.errors}
                                    should_be_invoiced={this.state.should_be_invoiced}
                                    invoice_documents={this.state.invoice_documents}
                                    transaction_reference={this.state.transaction_reference}
                                    handleInput={this.handleInput} payment_date={this.state.payment_date}
                                    payment_type_id={this.state.payment_type_id}
                                    expense_currency_id={this.state.expense_currency_id}
                                    exchange_rate={this.state.exchange_rate}/>
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
