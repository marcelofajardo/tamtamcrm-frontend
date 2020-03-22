import React, { Component } from 'react'
import axios from 'axios'
import {
    Button,
    Col,
    DropdownItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import AddButtons from '../common/AddButtons'
import Details from './Details'
import Contacts from './Contacts'
import Items from './Items'
import Documents from './Documents'
import QuoteDropdownMenu from './QuoteDropdownMenu'
import Notes from '../common/Notes'
import CustomFieldsForm from '../common/CustomFieldsForm'
import InvoiceSettings from '../common/InvoiceSettings'

class EditInvoice extends Component {
    constructor (props, context) {
        super(props, context)

        this.state = {
            invitations: this.props.invoice && this.props.invoice.invitations && this.props.invoice.invitations.length ? this.props.invoice.invitations : [],
            customer_id: this.props.invoice && this.props.invoice.customer_id ? this.props.invoice.customer_id : null,
            contacts: [],
            due_date: this.props.invoice && this.props.invoice.due_date && this.props.invoice.due_date.length ? moment(this.props.invoice.due_date).format('YYYY-MM-DD') : moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            quantity: '',
            finance_type: this.props.finance_type ? this.props.finance_type : 1,
            invoice_id: this.props.invoice && this.props.invoice.id ? this.props.invoice.id : null,
            lines: [],
            address: {},
            customerName: '',
            tax_rate_name: '',
            tax_rate: this.props.invoice && this.props.invoice.tax_rate ? this.props.invoice.tax_rate : 0,
            company_id: this.props.invoice && this.props.invoice.company_id ? this.props.invoice.company_id : null,
            status_id: this.props.invoice && this.props.invoice.status_id ? parseInt(this.props.invoice.status_id) : 1,
            customers: this.props.customers,
            tasks: [],
            errors: [],
            total: this.props.invoice && this.props.invoice.total ? this.props.invoice.total : 0,
            discount_total: this.props.invoice && this.props.invoice.discount_total ? this.props.invoice.discount_total : 0,
            tax_total: this.props.invoice && this.props.invoice.tax_total ? this.props.invoice.tax_total : 0,
            sub_total: this.props.invoice && this.props.invoice.sub_total ? this.props.invoice.sub_total : 0,
            data: this.props.invoice && this.props.invoice.line_items ? this.props.invoice.line_items : [],
            date: this.props.invoice && this.props.invoice.date ? this.props.invoice.date : moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            partial: this.props.invoice && this.props.invoice.partial ? this.props.invoice.partial : 0,
            has_partial: false,
            partial_due_date: this.props.invoice && this.props.invoice.partial_due_date ? this.props.invoice.partial_due_date : null,
            public_notes: this.props.invoice && this.props.invoice.public_notes ? this.props.invoice.public_notes : null,
            private_notes: this.props.invoice && this.props.invoice.private_notes ? this.props.invoice.private_notes : null,
            terms: this.props.invoice && this.props.invoice.terms ? this.props.invoice.terms : null,
            footer: this.props.invoice && this.props.invoice.footer ? this.props.invoice.footer : null,
            visible: 'collapse',
            custom_value1: this.props.invoice ? this.props.invoice.custom_value1 : '',
            custom_value2: this.props.invoice ? this.props.invoice.custom_value2 : '',
            custom_value3: this.props.invoice ? this.props.invoice.custom_value3 : '',
            custom_value4: this.props.invoice ? this.props.invoice.custom_value4 : '',
            custom_surcharge_tax1: this.props.invoice ? this.props.invoice.custom_surcharge_tax1 : false,
            custom_surcharge_tax2: this.props.invoice ? this.props.invoice.custom_surcharge_tax2 : false,
            custom_surcharge_tax3: this.props.invoice ? this.props.invoice.custom_surcharge_tax3 : false,
            custom_surcharge_tax4: this.props.invoice ? this.props.invoice.custom_surcharge_tax4 : false,
            custom_surcharge1: this.props.invoice ? this.props.invoice.custom_surcharge1 : 0,
            custom_surcharge2: this.props.invoice ? this.props.invoice.custom_surcharge2 : 0,
            custom_surcharge3: this.props.invoice ? this.props.invoice.custom_surcharge3 : 0,
            custom_surcharge4: this.props.invoice ? this.props.invoice.custom_surcharge4 : 0,
            tax: 0,
            discount: 0,
            total_custom_values: 0,
            total_custom_tax: 0,
            recurring: '',
            activeTab: '1',
            po_number: this.props.invoice && this.props.invoice.po_number ? this.props.invoice.po_number : '',
            design_id: this.props.invoice && this.props.invoice.design_id ? this.props.invoice.design_id : null,
            success: false,
            showSuccessMessage: false,
            showErrorMessage: false,
            width: window.innerWidth
        }

        this.updateData = this.updateData.bind(this)
        this.saveData = this.saveData.bind(this)
        this.setTotal = this.setTotal.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleTaskChange = this.handleTaskChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.buildForm = this.buildForm.bind(this)
        this.createInvoice = this.createInvoice.bind(this)
        this.setRecurring = this.setRecurring.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleAddFiled = this.handleAddFiled.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.updatePriceData = this.updatePriceData.bind(this)
        this.calculateTotals = this.calculateTotals.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.handleContactChange = this.handleContactChange.bind(this)
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
        this.handleSurcharge = this.handleSurcharge.bind(this)
        this.calculateSurcharges = this.calculateSurcharges.bind(this)

        this.total = 0
        const account_id = JSON.parse(localStorage.getItem('appState')).user.account_id
        const user_account = JSON.parse(localStorage.getItem('appState')).accounts.filter(account => account.account_id === parseInt(account_id))
        this.settings = user_account[0].account.settings
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentDidMount () {
        if (this.props.task_id || this.props.invoice_id) {
            this.loadInvoice()
        } else {
            if (Object.prototype.hasOwnProperty.call(localStorage, 'quoteForm')) {
                const storedValues = JSON.parse(localStorage.getItem('quoteForm'))
                this.setState({ ...storedValues }, () => console.log('new state', this.state))
            }
        }

        if (this.props.invoice && this.props.invoice.customer_id) {
            const index = this.props.customers.findIndex(customer => customer.id === this.props.invoice.customer_id)
            const customer = this.props.customers[index]
            const contacts = customer.contacts ? customer.contacts : []
            this.setState({ contacts: contacts })
        }
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount () {
        window.removeEventListener('resize', this.handleWindowSizeChange)
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleWindowSizeChange () {
        this.setState({ width: window.innerWidth })
    }

    handleContactChange (e) {
        const invitations = this.state.invitations

        const contact = e.target.value

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            invitations.push({ client_contact_id: contact })
        } else {
            // or remove the value from the unchecked checkbox from the array
            const index = invitations.findIndex(contact => contact.client_contact_id === contact)
            invitations.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ invitations: invitations }, () => localStorage.setItem('quoteForm', JSON.stringify(this.state)))
    }

    handleInput (e) {
        if (e.target.name === 'customer_id') {
            const index = this.state.customers.findIndex(customer => customer.id === parseInt(e.target.value))
            const customer = this.state.customers[index]

            const contacts = customer.contacts ? customer.contacts : []

            this.setState({
                customerName: customer.name,
                contacts: contacts
            }, () => localStorage.setItem('invoiceForm', JSON.stringify(this.state)))

            if (customer.billing) {
                const address = customer.billing
                const objAddress = {
                    line1: address.address_1,
                    town: address.address_2,
                    county: address.city,
                    country: 'United Kingdom'
                }
                this.setState({ address: objAddress }, () => localStorage.setItem('invoiceForm', JSON.stringify(this.state)))
            }
        }

        if (e.target.name === 'tax') {
            const name = e.target.options[e.target.selectedIndex].getAttribute('data-name')
            const rate = e.target.options[e.target.selectedIndex].getAttribute('data-rate')

            this.setState({
                tax: rate,
                tax_rate_name: name
            }, () => {
                localStorage.setItem('invoiceForm', JSON.stringify(this.state))
                this.calculateTotals()
            })

            return
        }

        if (e.target.name === 'partial') {
            const has_partial = e.target.value.trim() !== ''
            this.setState({ has_partial: has_partial, partial: e.target.value })
            return
        }

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        this.setState({
            [e.target.name]: value
        }, () => localStorage.setItem('invoiceForm', JSON.stringify(this.state)))
    }

    handleSurcharge (e) {
        const value = (!e.target.value) ? ('') : ((e.target.type === 'checkbox') ? (e.target.checked) : (parseFloat(e.target.value)))

        this.setState({
            [e.target.name]: value
        }, () => this.calculateSurcharges())
    }

    calculateSurcharges (x) {
        let total = 0
        let tax_total = 0
        const tax = parseFloat(this.state.tax)

        if (this.state.custom_surcharge1 && this.state.custom_surcharge1 > 0) {
            total += this.state.custom_surcharge1
        }

        if (this.state.custom_surcharge1 && this.state.custom_surcharge1 > 0 && this.state.custom_surcharge_tax1 === true && tax > 0) {
            tax_total += this.state.custom_surcharge1 * (tax / 100)
        }

        if (this.state.custom_surcharge2 && this.state.custom_surcharge2 > 0) {
            total += this.state.custom_surcharge2
        }

        if (this.state.custom_surcharge2 && this.state.custom_surcharge2 > 0 && this.state.custom_surcharge_tax2 === true && tax > 0) {
            tax_total += this.state.custom_surcharge2 * (tax / 100)
        }

        if (this.state.custom_surcharge3 && this.state.custom_surcharge3 > 0) {
            total += this.state.custom_surcharge3
        }

        if (this.state.custom_surcharge3 && this.state.custom_surcharge3 > 0 && this.state.custom_surcharge_tax3 === true && tax > 0) {
            tax_total += this.state.custom_surcharge3 * (tax / 100)
        }

        if (this.state.custom_surcharge4 && this.state.custom_surcharge4 > 0) {
            total += this.state.custom_surcharge4
        }

        if (this.state.custom_surcharge4 && this.state.custom_surcharge4 > 0 && this.state.custom_surcharge_tax4 === true && tax > 0) {
            tax_total += this.state.custom_surcharge4 * (tax / 100)
        }

        this.setState({ total_custom_values: total, total_custom_tax: tax_total }, () => this.calculateTotals())
    }

    handleTaskChange (e) {
        axios.get(`/api/products/tasks/${this.props.task_id}/1`)
            .then((r) => {
                const arrLines = []
                let total = 0

                if (r.data && r.data.length) {
                    r.data.map((product) => {
                        const objLine = {
                            quantity: product.quantity,
                            product_id: product.product_id,
                            unit_price: product.price,
                            unit_discount: product.unit_discount,
                            unit_tax: product.unit_tax,
                            order_id: product.order_id
                        }

                        total += parseFloat(product.price)
                        arrLines.push(objLine)
                    })
                }

                this.setState({
                    data: arrLines,
                    total: total
                }, () => localStorage.setItem('quoteForm', JSON.stringify(this.state)))
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    loadInvoice () {
        const url = this.props.task_id ? `/api/quotes/task/${this.props.task_id}` : `/api/quote/${this.state.invoice_id}`

        axios.get(url)
            .then((r) => {
                if (r.data) {
                    this.setState({
                        data: r.data.line_items,
                        due_date: moment(r.data.due_date).format('YYYY-MM-DD'),
                        invoice_id: r.data.id,
                        customer_id: r.data.customer_id,
                        company_id: r.data.company_id,
                        public_notes: r.data.public_notes,
                        private_notes: r.data.private_notes,
                        terms: r.data.terms,
                        footer: r.data.footer,
                        status: r.data.status_id
                    })
                }
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    public_notes: '',
                    tax: null,
                    tax_rate_name: '',
                    private_notes: '',
                    custom_surcharge1: null,
                    custom_surcharge2: null,
                    custom_surcharge3: null,
                    custom_surcharge4: null,
                    custom_surcharge_tax1: null,
                    custom_surcharge_tax2: null,
                    custom_surcharge_tax3: null,
                    custom_surcharge_tax4: null,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    terms: '',
                    footer: '',
                    partial: 0,
                    partial_due_date: null,
                    invoice_id: null,
                    customer_id: null,
                    company_id: null,
                    status_id: null,
                    data: [],
                    invitations: []
                }, () => localStorage.removeItem('quoteForm'))
            }
        })
    }

    updateData (rowData) {
        this.setState(prevState => ({
            data: [...prevState.data, rowData]
        }))
    }

    calculateTotals () {
        let total = 0
        let discount_total = 0
        let tax_total = 0
        let sub_total = 0
        let lexieTotal = 0

        this.state.data.map((product) => {
            const quantity = product.quantity === 0 ? 1 : product.quantity

            const line_total = product.unit_price * quantity
            total += line_total
            sub_total += line_total
            lexieTotal += line_total

            if (product.unit_discount > 0 && this.state.discount === 0) {
                const n = parseFloat(total)
                const percentage = n * product.unit_discount / 100
                discount_total += percentage
                lexieTotal -= discount_total
            }

            if (product.unit_tax > 0 && this.state.tax === 0) {
                const tax_percentage = lexieTotal * product.unit_tax / 100
                tax_total += tax_percentage
            }
        })

        if (this.state.tax > 0) {
            const a_total = this.state.total_custom_values > 0 ? parseFloat(this.state.total_custom_values) + parseFloat(this.state.total) : parseFloat(this.state.total)
            const tax_percentage = parseFloat(a_total) * parseFloat(this.state.tax) / 100
            tax_total += tax_percentage
        }

        if (this.state.discount > 0) {
            const discount_percentage = parseFloat(this.state.total) * parseFloat(this.state.discount) / 100
            total -= discount_percentage
        }

        this.setState({
            total: total,
            discount_total: discount_total,
            tax_total: tax_total,
            sub_total: sub_total
        }, () => localStorage.setItem('invoiceForm', JSON.stringify(this.state)))
    }

    updatePriceData (index) {
        const data = this.state.data.slice()
        const currentRow = data[index]
        const price = currentRow.unit_price
        let lexieTotal = 0

        if (price < 0) {
            return false
        }

        let total = price
        const unit_discount = currentRow.unit_discount
        const unit_tax = currentRow.unit_tax
        const uses_inclusive_taxes = this.settings.inclusive_taxes

        const quantity = currentRow.quantity

        if (quantity > 0) {
            total = price * quantity
            lexieTotal += price * quantity
        }

        if (unit_discount > 0 && this.state.discount === 0) {
            const n = parseFloat(total)
            //
            const percentage = n * unit_discount / 100
            lexieTotal -= percentage
        }

        if (unit_tax > 0 && this.state.tax === 0) {
            const tax_percentage = lexieTotal * unit_tax / 100
            currentRow.tax_total = tax_percentage

            if (uses_inclusive_taxes === false) {
                total += tax_percentage
            }
        }

        currentRow.sub_total = total

        this.setState({ data: data }, () => localStorage.setItem('quoteForm', JSON.stringify(this.state)))
    }

    handleFieldChange (data, row) {
        this.setState({ data: data }, () => {
            this.calculateTotals()
            this.updatePriceData(row)
        })
    }

    handleAddFiled () {
        this.setState((prevState, props) => {
            return {
                data: this.state.data.concat({
                    unit_discount: 0,
                    unit_tax: 0,
                    quantity: 0,
                    unit_price: 0,
                    product_id: 0
                })
            }
        })
    }

    handleDelete (idx) {
        if (this.state.data[idx] && this.state.data[idx].order_id) {
            axios.put(`/api/orders/${this.state.data[idx].order_id}`, { status: 1 })
                .then((response) => {
                    this.setState({
                        showSuccessMessage: true,
                        showErrorMessage: false
                    })
                })
                .catch((error) => {
                    this.setState({
                        errors: error.response.data.errors,
                        showErrorMessage: true,
                        showSuccessMessage: false
                    })

                    console.warn(error)
                })
        }

        const newTasks = this.state.data.filter((task, tIndex) => {
            return idx !== tIndex
        })

        this.setState({ data: newTasks })
    }

    setTotal (total) {
        this.total = total
    }

    getFormData () {
        return {
            is_amount_discount: true,
            design_id: this.state.design_id,
            tax_rate: this.state.tax,
            tax_rate_name: this.state.tax_rate_name,
            is_recurring: this.state.is_recurring,
            invoice_id: this.state.invoice_id,
            task_id: this.props.task_id,
            due_date: this.state.due_date,
            customer_id: this.state.customer_id,
            company_id: this.state.company_id,
            line_items: this.state.data,
            total: this.state.total,
            balance: this.props.invoice && this.props.invoice.balance ? this.props.invoice.balance : this.state.total,
            po_number: this.state.po_number,
            sub_total: this.state.sub_total,
            tax_total: this.state.tax_total,
            discount_total: this.state.discount_total,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            terms: this.state.terms,
            footer: this.state.footer,
            date: this.state.date,
            partial: this.state.partial,
            partial_due_date: this.state.partial_due_date,
            recurring: this.state.recurring,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            custom_surcharge1: this.state.custom_surcharge1,
            custom_surcharge_tax1: this.state.custom_surcharge_tax1,
            custom_surcharge2: this.state.custom_surcharge2,
            custom_surcharge_tax2: this.state.custom_surcharge_tax2,
            custom_surcharge3: this.state.custom_surcharge3,
            custom_surcharge_tax3: this.state.custom_surcharge_tax3,
            custom_surcharge4: this.state.custom_surcharge4,
            custom_surcharge_tax4: this.state.custom_surcharge_tax4,
            invitations: this.state.invitations
        }
    }

    saveData () {
        const data = this.getFormData()

        if (!this.state.invoice_id) {
            return this.createInvoice(data)
        }

        axios.put(`/api/quote/${this.state.invoice_id}`, data)
            .then((response) => {
                const firstInvoice = response.data
                const allInvoices = this.props.invoices
                allInvoices.push(firstInvoice)
                localStorage.removeItem('quoteForm')
                this.setState({
                    success: true,
                    showSuccessMessage: true,
                    showErrorMessage: false
                })
                this.props.action(allInvoices)
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors,
                    showErrorMessage: true,
                    showSuccessMessage: false
                })

                console.warn(error)
            })
    }

    createInvoice (data) {
        axios.post('/api/quote', data)
            .then((response) => {
                const firstInvoice = response.data
                const allInvoices = this.props.invoices
                allInvoices.push(firstInvoice)
                this.props.action(allInvoices)
                localStorage.removeItem('quoteForm')
                this.setState({
                    showSuccessMessage: true,
                    showErrorMessage: false
                })
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors,
                    showErrorMessage: true,
                    showSuccessMessage: false
                })

                console.warn(error)
            })
    }

    setRecurring (recurring) {
        this.setState({ recurring: recurring })
    }

    buildForm () {
        const successMessage = this.state.showSuccessMessage !== false && this.state.showSuccessMessage !== ''
            ? <SuccessMessage message={this.state.showSuccessMessage}/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        const documentTabLink = this.state.invoice_id !== null ? <NavItem>
            <NavLink
                className={this.state.activeTab === '5' ? 'active' : ''}
                onClick={() => {
                    this.toggleTab('5')
                }}>
                Documents
            </NavLink>
        </NavItem> : null

        const tabs = <Nav tabs>
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
                    Contacts
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                    className={this.state.activeTab === '3' ? 'active' : ''}
                    onClick={() => {
                        this.toggleTab('3')
                    }}>
                    Items
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                    className={this.state.activeTab === '4' ? 'active' : ''}
                    onClick={() => {
                        this.toggleTab('4')
                    }}>
                    Notes
                </NavLink>
            </NavItem>
            {documentTabLink}
        </Nav>

        const details = <Details company_id={this.state.company_id} handleInput={this.handleInput}
            has_partial={this.state.has_partial}
            customer_id={this.state.customer_id} customers={this.props.customers}
            errors={this.state.errors} partial_due_date={this.state.partial_due_date}
            partial={this.state.partial} invoice={this.props.invoice}
            po_number={this.state.po_number} due_date={this.state.due_date} date={this.state.date}
            address={this.state.address} customerName={this.state.customerName} />

        const custom = <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
            custom_value2={this.state.custom_value2}
            custom_value3={this.state.custom_value3}
            custom_value4={this.state.custom_value4}
            custom_fields={this.props.custom_fields}/>

        const contacts = <Contacts errors={this.state.errors} contacts={this.state.contacts}
            invitations={this.state.invitations} handleContactChange={this.handleContactChange}/>

        const settings = <InvoiceSettings handleSurcharge={this.handleSurcharge} settings={this.state} errors={this.state.errors} handleInput={this.handleInput}
            discount={this.state.discount} design_id={this.state.design_id}/>

        const items = <Items errors={this.state.errors} handleFieldChange={this.handleFieldChange}
            handleAddFiled={this.handleAddFiled} setTotal={this.setTotal}
            handleDelete={this.handleDelete} discount_total={this.state.discount_total}
            sub_total={this.state.sub_total} tax_total={this.state.tax_total}
            total={this.state.total} data={this.state.data}
            total_custom_values={this.state.total_custom_values}
            total_custom_tax={this.state.total_custom_tax}/>

        const notes = <Notes private_notes={this.state.private_notes} public_notes={this.state.public_notes}
            terms={this.state.terms} footer={this.state.footer} errors={this.state.errors}
            handleInput={this.handleInput}/>

        const documents = <Documents invoice={this.props.invoice}/>

        const dropdownMenu = <QuoteDropdownMenu invoices={this.props.invoices} formData={this.getFormData()}
            invoice_id={this.props.invoice.id}
            task_id={this.state.task_id}
            handleTaskChange={this.handleTaskChange}
            action={this.props.action}
            status_id={this.props.invoice.status_id}/>

        const isMobile = this.state.width <= 500
        const form = isMobile
            ? <React.Fragment>

                {tabs}

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        {details}
                        {custom}
                    </TabPane>

                    <TabPane tabId="2">
                        {contacts}
                    </TabPane>

                    <TabPane tabId="3">
                        {settings}
                        {items}
                    </TabPane>

                    <TabPane tabId="4">
                        {notes}
                    </TabPane>

                    <TabPane tabId="5">
                        {documents}
                    </TabPane>
                </TabContent>
            </React.Fragment>

            : <React.Fragment>
                <Row form>
                    <Col md={6}>
                        {details}
                        {custom}
                    </Col>

                    <Col md={6}>
                        {contacts}
                        {settings}
                    </Col>
                </Row>
                {items}

                <Row form>
                    <Col md={6}>
                        {notes}
                    </Col>

                    <Col md={6}>
                        {documents}
                    </Col>
                </Row>
            </React.Fragment>

        return (
            <div>
                {dropdownMenu}
                {successMessage}
                {errorMessage}
                {form}

            </div>
        )
    }

    render () {
        const form = this.buildForm()
        const { success } = this.state
        const button = this.props.add === true ? <AddButtons toggle={this.toggle}/>
            : <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>

        if (this.props.modal) {
            return (
                <React.Fragment>
                    {button}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}
                        size="lg">
                        <ModalHeader toggle={this.toggle}>
                            Quote
                        </ModalHeader>

                        <ModalBody>
                            {form}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                            <Button color="success" onClick={this.saveData}>Save</Button>
                        </ModalFooter>
                    </Modal>
                </React.Fragment>
            )
        }

        return (
            <div>

                {success && <div className="alert alert-success" role="alert">
                    Products added to task successfully
                </div>}

                {form}
                <Button color="success" onClick={this.saveData}>Save</Button>
            </div>
        )
    }
}

export default EditInvoice
