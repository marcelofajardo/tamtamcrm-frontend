import React, { Component } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavLink,
    Form,
    NavItem,
    Nav,
    TabPane,
    TabContent,
    FormGroup,
    Input,
    Label
} from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

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
            }, { name: 'custom_value4', label: '' }]
        }

        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getSettings = this.getSettings.bind(this)
    }

    componentDidMount () {
        this.getSettings()
    }

    getSettings () {
        axios.get('api/accounts/fields/getAllCustomFields')
            .then((r) => {
                if (r.data.Customer && Object.keys(r.data)) {
                    this.setState({
                        product: r.data.Product,
                        customers: r.data.Customer,
                        payments: r.data.Payment,
                        invoices: r.data.Invoice,
                        companies: r.data.Company,
                        quotes: r.data.Quote
                        // credits: r.data.Credit,
                        // tasks: r.data.Task
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
    }

    handleSubmit (e) {
        const fields = {}
        fields.Product = this.state.product
        fields.Customer = this.state.customers
        fields.Company = this.state.companies
        fields.Payment = this.state.payments
        fields.Invoice = this.state.invoices
        fields.Quote = this.state.quotes
        fields.Task = this.state.tasks
        fields.Credit = this.state.credits

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
        const { customers, product, invoices, payments, companies, quotes, credits, tasks } = this.state
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                data-entity="customers"
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={customers[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>

                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="customers"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={customers[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                data-entity="product"
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={product[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>
                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="product"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={product[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                id={catId}
                                                data-entity="invoices"
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={invoices[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>
                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="invoices"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={invoices[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <label htmlFor={catId}>{`Custom Field #${idx + 1}`}</label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                data-entity="payments"
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={payments[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>
                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="payments"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={payments[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-entity="companies"
                                                data-id={idx}
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={companies[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>
                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="companies"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={companies[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <label htmlFor={catId}>{`Custom Field #${idx + 1}`}</label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                data-entity="quotes"
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={quotes[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>
                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="quotes"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={quotes[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                data-entity="credits"
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={credits[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>

                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="credits"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={credits[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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
                                return (
                                    <Form key={idx} inline>
                                        <FormGroup className="mb-4" key={idx}>
                                            <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                            <Input
                                                type="select"
                                                name={catId}
                                                data-id={idx}
                                                data-entity="tasks"
                                                id={catId}
                                                data-field="type"
                                                onChange={this.handleChange}
                                                value={tasks[idx].type}
                                            >
                                                <option value='text'>Text</option>
                                                <option value='textarea'>Textarea</option>
                                                <option value='select'>Select List</option>
                                                <option value='checkbox'>Switch</option>
                                            </Input>

                                            <Label htmlFor={ageId}>Label</Label>
                                            <Input
                                                type="text"
                                                name={ageId}
                                                data-id={idx}
                                                data-entity="tasks"
                                                id={ageId}
                                                data-field="label"
                                                onChange={this.handleChange}
                                                value={tasks[idx].label}
                                            />
                                        </FormGroup>
                                    </Form>
                                )
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

        return (
            <React.Fragment>
                <ToastContainer/>

                <Nav tabs>
                    {tabItems}
                </Nav>

                <TabContent activeTab={this.state.activeTab} >
                    {tabContent}
                    <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default CustomFieldSettings
