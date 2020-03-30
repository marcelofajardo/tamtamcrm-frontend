import React, { Component } from 'react'
import axios from 'axios'
import {
    Button,
    Col, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink,
    Row, TabContent, TabPane
} from 'reactstrap'
import 'react-dates/lib/css/_datepicker.css'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import Details from '../orders/Details'
import Items from '../orders/Items'
import OrderModel from '../models/OrderModel'
import { CalculateLineTotals, CalculateSurcharges, CalculateTotal } from '../common/InvoiceCalculations'
import CustomFieldsForm from '../common/CustomFieldsForm'
import InvoiceSettings from '../common/InvoiceSettings'
import Notes from '../common/Notes'
import DropdownMenuBuilder from '../common/DropdownMenuBuilder'
import AddButtons from '../common/AddButtons'
import Contacts from '../credits/Contacts'
import EmailEditor from '../common/EmailEditorForm'

export default class EditOrder extends Component {
    constructor (props) {
        super(props)

        const data = this.props.order ? this.props.order : null
        this.orderModel = new OrderModel(data, this.props.customers)
        this.initialState = this.orderModel.fields
        this.orderModel.task_id = this.props.task_id
        this.state = this.initialState

        this.updateData = this.updateData.bind(this)
        this.saveData = this.saveData.bind(this)
        this.setTotal = this.setTotal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.buildForm = this.buildForm.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleAddFiled = this.handleAddFiled.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.updatePriceData = this.updatePriceData.bind(this)
        this.calculateTotals = this.calculateTotals.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.handleContactChange = this.handleContactChange.bind(this)
        this.handleSurcharge = this.handleSurcharge.bind(this)
        this.calculateSurcharges = this.calculateSurcharges.bind(this)
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
        this.handleTaskChange = this.handleTaskChange.bind(this)

        this.total = 0
        const account_id = JSON.parse(localStorage.getItem('appState')).user.account_id
        const user_account = JSON.parse(localStorage.getItem('appState')).accounts.filter(account => account.account_id === parseInt(account_id))
        this.settings = user_account[0].account.settings
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentDidMount () {
        /* if (!this.state.id) {
            if (Object.prototype.hasOwnProperty.call(localStorage, 'orderForm')) {
                const storedValues = JSON.parse(localStorage.getItem('orderForm'))
                this.setState({ ...storedValues }, () => console.log('new state', this.state))
            }
        } */

        if (this.props.task_id) {
            this.handleTaskChange()
        }

        if (this.props.order && this.props.order.customer_id) {
            const contacts = this.orderModel.contacts
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

    handleClick () {
        axios.post(`/api/tasks/products/${this.props.task_id}`, {
            products: this.state.selectedProducts
        })
            .then((response) => {
                this.setState({ success: true })
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleMultiSelect (e) {
        this.setState({ selectedProducts: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    handleContactChange (e) {
        const invitations = this.orderModel.buildInvitations(e.target.value, e.target.checked)
        // update the state with the new array of options
        this.setState({ invitations: invitations }, () => console.log('invitations', invitations))
    }

    handleInput (e) {
        if (e.target.name === 'customer_id') {
            const customer = this.orderModel.customerChange(e.target.value)

            this.setState({
                customerName: customer.name,
                contacts: customer.contacts,
                address: customer.address
            }, () => localStorage.setItem('orderForm', JSON.stringify(this.state)))
        }

        if (e.target.name === 'tax') {
            const name = e.target.options[e.target.selectedIndex].getAttribute('data-name')
            const rate = e.target.options[e.target.selectedIndex].getAttribute('data-rate')

            this.setState({
                tax: rate,
                tax_rate_name: name
            }, () => {
                localStorage.setItem('orderForm', JSON.stringify(this.state))
                this.calculateTotals()
            })

            return
        }

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        this.setState({
            [e.target.name]: value
        }, () => localStorage.setItem('orderForm', JSON.stringify(this.state)))
    }

    handleSurcharge (e) {
        const value = (!e.target.value) ? ('') : ((e.target.type === 'checkbox') ? (e.target.checked) : (parseFloat(e.target.value)))

        this.setState({
            [e.target.name]: value
        }, () => this.calculateSurcharges())
    }

    calculateSurcharges (x) {
        const surcharge_totals = CalculateSurcharges({ surcharges: this.state })

        this.setState({
            total_custom_values: surcharge_totals.total_custom_values,
            total_custom_tax: surcharge_totals.total_custom_tax
        }, () => this.calculateTotals())
    }

    updateData (rowData) {
        this.setState(prevState => ({
            data: [...prevState.data, rowData]
        }), () => localStorage.setItem('orderForm', JSON.stringify(this.state)))
    }

    calculateTotals () {
        const totals = CalculateTotal({ invoice: this.state })

        this.setState({
            total: totals.total,
            discount_total: totals.discount_total,
            tax_total: totals.tax_total,
            sub_total: totals.sub_total
        }, () => localStorage.setItem('orderForm', JSON.stringify(this.state)))
    }

    updatePriceData (index) {
        const data = this.state.data.slice()
        data[index] = CalculateLineTotals({ currentRow: data[index], settings: this.settings, invoice: this.state })

        this.setState({ data: data }, () => localStorage.setItem('orderForm', JSON.stringify(this.state)))
    }

    handleFieldChange (data, row) {
        this.setState({ data: data }, () => {
            this.calculateTotals()
            this.updatePriceData(row)
        })
    }

    handleAddFiled () {
        const items = this.orderModel.addItem()
        this.setState({ line_items: items })
    }

    handleDelete (idx) {
        const items = this.orderModel.removeItem(idx)
        this.setState({ line_items: items })
    }

    setTotal (total) {
        this.total = total
    }

    handleTaskChange () {
        axios.get(`/api/products/tasks/${this.props.task_id}/1,2`)
            .then((r) => {
                this.setState(r.data)
                this.orderModel = new OrderModel(r.data, this.props.customers)
                const contacts = this.orderModel.contacts
                this.setState({ contacts: contacts })
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    getFormData () {
        return {
            is_amount_discount: true,
            design_id: this.state.design_id,
            tax_rate: this.state.tax,
            tax_rate_name: this.state.tax_rate_name,
            task_id: this.props.task_id,
            due_date: this.state.due_date,
            customer_id: this.state.customer_id,
            line_items: this.state.data,
            total: this.state.total,
            balance: this.props.credit && this.props.credit.balance ? this.props.credit.balance : this.state.total,
            sub_total: this.state.sub_total,
            tax_total: this.state.tax_total,
            discount_total: this.state.discount_total,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            terms: this.state.terms,
            footer: this.state.footer,
            po_number: this.state.po_number,
            date: this.state.date,
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
        this.orderModel.save(this.getFormData()).then(response => {
            if (!response) {
                this.setState({ errors: this.orderModel.errors, message: this.orderModel.error_message })
                return
            }

            if (!this.state.id) {
                const firstInvoice = response
                const allInvoices = this.props.orders
                allInvoices.push(firstInvoice)
                this.props.action(allInvoices)
                localStorage.removeItem('orderForm')
                this.setState(this.initialState)
                return
            }

            const index = this.props.credits.findIndex(credit => credit.id === this.state.id)
            this.props.credits[index] = response
            this.props.action(this.props.credits)
        })
    }

    buildForm () {
        const successMessage = this.state.showSuccessMessage !== false && this.state.showSuccessMessage !== ''
            ? <SuccessMessage message={this.state.showSuccessMessage}/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

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
            <NavItem>
                <NavLink
                    className={this.state.activeTab === '5' ? 'active' : ''}
                    onClick={() => {
                        this.toggleTab('5')
                    }}>
                    Documents
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                    className={this.state.activeTab === '6' ? 'active' : ''}
                    onClick={() => {
                        this.toggleTab('6')
                    }}>
                    Email
                </NavLink>
            </NavItem>
        </Nav>

        const details = <Details handleInput={this.handleInput}
            customers={this.props.customers}
            errors={this.state.errors} order={this.state}
            address={this.state.address} customerName={this.state.customerName}/>

        const custom = <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
            custom_value2={this.state.custom_value2}
            custom_value3={this.state.custom_value3}
            custom_value4={this.state.custom_value4}
            custom_fields={this.props.custom_fields}/>

        const contacts = <Contacts errors={this.state.errors} contacts={this.state.contacts}
            invitations={this.state.invitations} handleContactChange={this.handleContactChange}/>

        const settings = <InvoiceSettings handleSurcharge={this.handleSurcharge} settings={this.state}
            errors={this.state.errors} handleInput={this.handleInput}
            discount={this.state.discount} design_id={this.state.design_id}/>

        const items = <Items order={this.state} errors={this.state.errors} handleFieldChange={this.handleFieldChange}
            handleAddFiled={this.handleAddFiled} setTotal={this.setTotal}
            handleDelete={this.handleDelete}/>

        const notes = <Notes private_notes={this.state.private_notes} public_notes={this.state.public_notes}
            terms={this.state.terms} footer={this.state.footer} errors={this.state.errors}
            handleInput={this.handleInput}/>

        const email_editor = this.state.id
            ? <EmailEditor template="email_template_order" show_editor={true} entity="order"
                entity_id={this.state.id}/> : null

        const dropdownMenu = this.state.id
            ? <DropdownMenuBuilder formData={this.getFormData()}
                model={this.orderModel}
                task_id={this.props.task_id}/> : null

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

                    <TabPane tabId="5"/>

                    <TabPane tabId="6">
                        {email_editor}
                    </TabPane>
                </TabContent>
            </React.Fragment>

            : <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggleTab('1')
                            }}>
                            Invoice
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggleTab('2')
                            }}>
                            Email
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
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

                            <Col md={6}/>
                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                        {email_editor}
                    </TabPane>
                </TabContent>
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
                    <Modal isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}
                        size="lg">
                        <ModalHeader toggle={this.toggle}>
                            Credit
                        </ModalHeader>

                        <ModalBody>
                            {form}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.saveData}>Save</Button>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
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
