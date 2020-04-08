import React, { Component } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavLink,
    NavItem,
    Nav,
    TabPane,
    TabContent
} from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import CustomFieldSettingsForm from './CustomFieldSettingsForm'

class CustomFieldSettings extends Component {
    constructor (props) {
        super(props)

        this.modules = JSON.parse(localStorage.getItem('modules'))

        this.state = {
            activeTab: '1',
            quotes: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            companies: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            customers: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            product: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            invoices: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            payments: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            tasks: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            credits: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            expenses: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }],
            orders: [{ name: 'custom_value1', label: '' }, { name: 'custom_value2', label: '' }, {
                name: 'custom_value3',
                label: ''
            }, { name: 'custom_value4', label: '' }]
        }

        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getSettings = this.getSettings.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    componentDidMount () {
        this.getSettings()
    }

    getSettings () {
        axios.get('api/accounts/fields/getAllCustomFields')
            .then((r) => {
                if (r.data.Customer && Object.keys(r.data)) {
                    this.setState({
                        // orders: r.data.Order,
                        expenses: r.data.Expense,
                        product: r.data.Product,
                        customers: r.data.Customer,
                        payments: r.data.Payment,
                        invoices: r.data.Invoice,
                        companies: r.data.Company,
                        quotes: r.data.Quote,
                        credits: r.data.Credit,
                        tasks: r.data.Task
                    })
                    console.log('response', r.data.Product)
                }
            })
            .catch((e) => {
                toast.error('There was an issue updating the settings')
            })
    }

    handleChange (e) {
        const entity = e.target.dataset.entity
        const id = e.target.dataset.id
        const className = e.target.dataset.field
        const value = e.target.value

        if (['type', 'label'].includes(className)) {
            const products = [...this.state[entity]]
            products[id][className] = value
            this.setState({ [entity]: products }, () => console.log(this.state))
        } else {
            // this.setState({ [e.target.name]: e.target.value })
        }

        if (className === 'type' && value === 'select' && !this.state[entity].options) {
            const products = [...this.state[entity]]
            products[id].options = [{ value: '', text: '' }]
            this.setState({ [entity]: products }, () => console.log(this.state))
        }
    }

    handleOptionChange (e) {
        console.log('entity', e)
        const entity = e.data_entity
        const id = e.data_id

        const products = [...this.state[entity]]
        products[id].options = e.options
        this.setState({ [entity]: products }, () => console.log(this.state))
        console.log('element', e)
    }

    handleSubmit (e) {
        const fields = {}
        fields.Order = this.state.orders
        fields.Product = this.state.product
        fields.Customer = this.state.customers
        fields.Company = this.state.companies
        fields.Payment = this.state.payments
        fields.Invoice = this.state.invoices
        fields.Quote = this.state.quotes
        fields.Task = this.state.tasks
        fields.Credit = this.state.credits
        fields.Expense = this.state.expenses

        axios.post('/api/accounts/fields', {
            fields: JSON.stringify(fields)
        }).then((response) => {
            toast.success('Settings updated successfully')
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

    toggle (e) {
        const tab = String(e.target.dataset.id)
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    render () {
        const { customers, product, invoices, payments, companies, quotes, credits, tasks, expenses, orders } = this.state
        let tabCounter = 1
        const tabContent = []
        const tabItems = []

        if (customers && this.modules.customers === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Customers</CardHeader>
                    <CardBody>
                        {
                            customers.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={customers[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="customers" type={customers[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={customers[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Customers
                </NavLink>
            </NavItem>)
            tabCounter++
        }

        if (product && this.modules.products === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Products</CardHeader>
                    <CardBody>
                        {
                            product.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={product[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="product" type={product[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={product[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Products
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (invoices && this.modules.invoices === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Invoice</CardHeader>
                    <CardBody>
                        {
                            invoices.map((val, idx) => {
                                const catId = `custom_name${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={invoices[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="invoices" type={invoices[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={invoices[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Invoices
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (payments && this.modules.payments === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Payments</CardHeader>
                    <CardBody>
                        {
                            payments.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={payments[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="payments" type={payments[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={payments[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Payments
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (companies && this.modules.companies === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Companies</CardHeader>
                    <CardBody>
                        {
                            companies.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={companies[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="companies" type={companies[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={companies[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Companies
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (quotes && this.modules.quotes === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Quotes</CardHeader>
                    <CardBody>
                        {
                            quotes.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={quotes[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="quotes" type={quotes[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={quotes[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Quotes
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (credits && this.modules.credits === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Credits</CardHeader>
                    <CardBody>
                        {
                            credits.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={credits[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="credits" type={credits[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={credits[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    data-id={tabCounter}
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    onClick={this.toggle}>
                    Credits
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (tasks && this.modules.tasks === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Tasks</CardHeader>
                    <CardBody>
                        {
                            tasks.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={tasks[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="tasks" type={tasks[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={tasks[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    data-id={tabCounter}
                    onClick={this.toggle}>
                    Tasks
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (expenses && this.modules.expenses === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Expenses</CardHeader>
                    <CardBody>
                        {
                            expenses.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={expenses[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="expenses" type={expenses[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={expenses[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    data-id={tabCounter}
                    onClick={this.toggle}>
                    Expenses
                </NavLink>
            </NavItem>)

            tabCounter++
        }

        if (orders && this.modules.orders === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Orders</CardHeader>
                    <CardBody>
                        {
                            orders.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return <CustomFieldSettingsForm idx={idx} age={ageId} obj={orders[idx]}
                                    handleOptionChange={this.handleOptionChange}
                                    entity="orders" type={orders[idx].type}
                                    handleChange={this.handleChange} catId={catId}
                                    label={orders[idx].label}/>
                            })
                        }
                    </CardBody>
                </Card>
            </TabPane>)

            tabItems.push(<NavItem>
                <NavLink
                    className={this.state.activeTab === String(tabCounter) ? 'active' : ''}
                    data-id={tabCounter}
                    onClick={this.toggle}>
                    Orders
                </NavLink>
            </NavItem>)
        }

        return (
            <React.Fragment>
                <ToastContainer/>

                <Nav tabs>
                    {tabItems}
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    {tabContent}
                    <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default CustomFieldSettings
