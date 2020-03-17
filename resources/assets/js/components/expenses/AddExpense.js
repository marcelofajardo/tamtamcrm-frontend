import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    CardHeader,
    Card,
    CardBody,
    FormGroup,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Col,
    Row,
    Collapse
} from 'reactstrap'
import axios from 'axios'
import CustomerDropdown from '../common/CustomerDropdown'
import CompanyDropdown from '../common/CompanyDropdown'
import FormBuilder from '../accounts/FormBuilder'
import PaymentTypeDropdown from '../common/PaymentTypeDropdown'
import CurrencyDropdown from '../common/CurrencyDropdown'
import moment from 'moment'
import AddButtons from '../common/AddButtons'

class AddExpense extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            amount: 0,
            date: moment(new Date()).format('YYYY-MM-DD'),
            currencyOpen: false,
            paymentOpen: false,
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
            invoice_documents: null,
            expense_date: null,
            company_id: null,
            category_id: null,
            notes: null,
            loading: false,
            errors: [],
            message: '',
            activeTab: '1'
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

        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.toggleCurrency = this.toggleCurrency.bind(this)
        this.togglePayment = this.togglePayment.bind(this)
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
                    invoice_documents: null,
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
                    invoice_documents: null,
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

    handleCheckboxChange (e) {
        const value = e.target.checked
        const name = e.target.name

        this.setState({ [name]: value })
    }

    toggleCurrency () {
        this.setState({ currencyOpen: !this.state.currencyOpen })
    }

    togglePayment () {
        this.setState({ paymentOpen: !this.state.paymentOpen })
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

                                <Card>
                                    <CardHeader>Details</CardHeader>
                                    <CardBody>

                                        <FormGroup className="mb-3">
                                            <Label>Amount</Label>
                                            <Input value={this.state.amount}
                                                className={this.hasErrorFor('amount') ? 'is-invalid' : ''}
                                                type="text" name="amount"
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('amount')}
                                        </FormGroup>

                                        <FormGroup className="mr-2">
                                            <Label for="date">Date(*):</Label>
                                            <Input className={this.hasErrorFor('expense_date') ? 'is-invalid' : ''}
                                                value={this.state.expense_date} type="date" id="date"
                                                name="expense_date"
                                                onChange={this.handleInput}/>
                                            {this.renderErrorFor('expense_date')}
                                        </FormGroup>

                                        <FormGroup className="mr-2">
                                            <Label for="date">Category(*):</Label>
                                            <Input className={this.hasErrorFor('category_id') ? 'is-invalid' : ''}
                                                value={this.state.date} type="select" id="category_id"
                                                name="category_id"
                                                onChange={this.handleInput}>
                                                <option value="">Select Category</option>
                                                <option value="1">Test category</option>
                                            </Input>
                                            {this.renderErrorFor('category_id')}
                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <Label>Customer</Label>
                                            <CustomerDropdown
                                                customer={this.state.customer_id}
                                                renderErrorFor={this.renderErrorFor}
                                                handleInputChanges={this.handleInput}
                                                customers={this.props.customers}
                                            />
                                            {this.renderErrorFor('customer_id')}
                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <Label>Company</Label>
                                            <CompanyDropdown
                                                companies={this.props.companies}
                                                company_id={this.state.company_id}
                                                renderErrorFor={this.renderErrorFor}
                                                handleInputChanges={this.handleInput}
                                            />
                                            {this.renderErrorFor('company_id')}
                                        </FormGroup>

                                        {customForm}
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="2">
                                <Card>
                                    <CardHeader>
                                        Settings
                                    </CardHeader>

                                    <CardBody>
                                        <FormBuilder
                                            handleCheckboxChange={this.handleCheckboxChange}
                                            formFieldsRows={this.formFields}
                                        />

                                        <Button color="primary" onClick={this.toggleCurrency}
                                            style={{ marginBottom: '1rem' }}>Convert Currency</Button>
                                        <Collapse isOpen={this.state.currencyOpen}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">Currency</Label>
                                                        <CurrencyDropdown currency_id={this.state.expense_currency_id}
                                                            handleInputChanges={this.handleInput}
                                                            name="expense_currency_id"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">Exchange Rate</Label>
                                                        <Input type="text" name="exchange_rate" id="exchange_rate"
                                                            onChange={this.handleInput}
                                                            value={this.state.exchange_rate}
                                                            placeholder="Exchange Rate"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Collapse>

                                        <Button color="primary" onClick={this.togglePayment}
                                            style={{ marginBottom: '1rem' }}>Mark Paid</Button>
                                        <Collapse isOpen={this.state.paymentOpen}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">Payment Type</Label>
                                                        <PaymentTypeDropdown handleInputChanges={this.handleInput}
                                                            name="payment_type_id"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">Date</Label>
                                                        <Input type="date" name="payment_date"
                                                            onChange={this.handleInput} id="examplePassword"
                                                            placeholder="payment date"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">Transaction Reference</Label>
                                                        <Input type="text" name="transaction_reference"
                                                            onChange={this.handleInput} id="transaction_reference"
                                                            placeholder="transaction reference"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Collapse>

                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="3">
                                <Card>
                                    <CardHeader>Notes</CardHeader>
                                    <CardBody>
                                        <FormGroup className="mb-3">
                                            <Label>Public Notes</Label>
                                            <Input value={this.state.notes}
                                                className={this.hasErrorFor('public_notes') ? 'is-invalid' : ''}
                                                type="textarea" name="public_notes"
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('public_notes')}
                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <Label>Private Notes</Label>
                                            <Input value={this.state.notes}
                                                className={this.hasErrorFor('private_notes') ? 'is-invalid' : ''}
                                                type="textarea" name="private_notes"
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('private_notes')}
                                        </FormGroup>
                                    </CardBody>
                                </Card>
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
