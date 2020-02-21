import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    CardHeader,
    Card,
    CardBody,
    Label,
    FormGroup,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Col,
    Row,
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import axios from 'axios'
import CustomerDropdown from '../common/CustomerDropdown'
import CompanyDropdown from '../common/CompanyDropdown'
import FormBuilder from '../accounts/FormBuilder'
import PaymentTypeDropdown from '../common/PaymentTypeDropdown'
import CurrencyDropdown from '../common/CurrencyDropdown'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'

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
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.toggleCurrency = this.toggleCurrency.bind(this)
        this.togglePayment = this.togglePayment.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
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

    handleCheckboxChange (e) {
        const value = e.target.checked
        const name = e.target.name

        this.setState({ [name]: value })
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    toggleCurrency () {
        this.setState({ currencyOpen: !this.state.currencyOpen })
    }

    togglePayment () {
        this.setState({ paymentOpen: !this.state.paymentOpen })
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

    changeStatus (action) {
        if (!this.state.id) {
            return false
        }

        const data = this.getFormData()
        axios.post(`/api/expense/${this.state.id}/${action}`, data)
            .then((response) => {
                if (action === 'download') {
                    this.downloadPdf(response)
                }

                this.setState({ showSuccessMessage: true })
            })
            .catch((error) => {
                this.setState({ showErrorMessage: true })
                console.warn(error)
            })
    }

    handleClick () {
        const data = this.getFormData()
        axios.put(`/api/expense/${this.state.id}`, data)
            .then((response) => {
                const index = this.props.expenses.findIndex(expense => expense.id === this.props.expense.id)
                this.props.expenses[index] = response.data
                this.props.action(this.props.expenses)
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
        const sendEmailButton = <DropdownItem className="primary" onClick={() => this.changeStatus('email')}>Send
            Email</DropdownItem>

        const deleteButton = this.state.status_id === 1
            ? <DropdownItem className="primary" onClick={() => this.changeStatus('delete')}>Delete</DropdownItem> : null

        const archiveButton = this.state.status_id === 1
            ? <DropdownItem className="primary" onClick={() => this.changeStatus('archive')}>Archive</DropdownItem> : null

        const cloneButton =
            <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_expense')}>Clone</DropdownItem>

        const dropdownMenu = <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMenu}>
            <DropdownToggle caret>
                Actions
            </DropdownToggle>

            <DropdownMenu>
                {sendEmailButton}
                {deleteButton}
                {archiveButton}
                {cloneButton}
            </DropdownMenu>
        </Dropdown>

        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        const { message } = this.state
        const customFields = this.props.custom_fields
        const customForm = customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

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

                        {dropdownMenu}
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
                                            <Label for="expense_date">Date(*):</Label>
                                            <Input className={this.hasErrorFor('expense_date') ? 'is-invalid' : ''}
                                                value={this.state.expense_date} type="date" id="expense_date"
                                                name="date"
                                                onChange={this.handleInput}/>
                                            {this.renderErrorFor('expense_date')}
                                        </FormGroup>

                                        <FormGroup className="mr-2">
                                            <Label for="date">Category(*):</Label>
                                            <Input className={this.hasErrorFor('category_id') ? 'is-invalid' : ''}
                                                value={this.state.category_id} type="select" id="category_id"
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
                                                <Col md={4}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">Payment Type</Label>
                                                        <PaymentTypeDropdown payment_type={this.state.payment_type_id}
                                                            handleInputChanges={this.handleInput}
                                                            name="payment_type_id"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">Date</Label>
                                                        <Input value={this.state.payment_date} type="date"
                                                            onChange={this.handleInput}
                                                            name="payment_date" id="examplePassword"
                                                            placeholder="password placeholder"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">Transaction Reference</Label>
                                                        <Input value={this.state.transaction_reference} type="text"
                                                            name="transaction_reference"
                                                            onChange={this.handleInput} id="transaction_reference"
                                                            placeholder="password placeholder"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Collapse>
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="1">
                                <Card>
                                    <CardHeader>Notes</CardHeader>
                                    <CardBody>
                                        <FormGroup className="mb-3">
                                            <Label>Public Notes</Label>
                                            <Input value={this.state.public_notes}
                                                className={this.hasErrorFor('public_notes') ? 'is-invalid' : ''}
                                                type="textarea" name="public_notes"
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('public_notes')}
                                        </FormGroup>

                                        <FormGroup className="mb-3">
                                            <Label>Private Notes</Label>
                                            <Input value={this.state.private_notes}
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

export default EditExpense
