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
    Label,
    Row,
    Col
} from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import DynamicOptionList from './DynamicOptionList'

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
                                return (
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {customers[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="customers"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(customers[idx], { data_id: idx, data_entity: 'customers' })}
                                                key={customers[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {product[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="product"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(product[idx], { data_id: idx, data_entity: 'product' })}
                                                key={product[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {invoices[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="invoices"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(invoices[idx], { data_id: idx, data_entity: 'invoices' })}
                                                key={invoices[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {payments[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="payments"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(payments[idx], { data_id: idx, data_entity: 'payments' })}
                                                key={payments[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {companies[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="companies"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(companies[idx], { data_id: idx, data_entity: 'companies' })}
                                                key={companies[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {quotes[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="quotes"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(quotes[idx], { data_id: idx, data_entity: 'quotes' })}
                                                key={quotes[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {credits[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="credits"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(credits[idx], { data_id: idx, data_entity: 'credits' })}
                                                key={credits[idx].options.length} />
                                        </div>
                                        }
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
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
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
                                            </Col>
                                            <Col md={6}>
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
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {tasks[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="tasks"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(tasks[idx], { data_id: idx, data_entity: 'tasks' })}
                                                key={tasks[idx].options.length} />
                                        </div>
                                        }
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

        if (expenses && this.modules.expenses === true) {
            tabContent.push(<TabPane tabId={String(tabCounter)}>
                <Card>
                    <CardHeader>Expenses</CardHeader>
                    <CardBody>
                        {
                            tasks.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return (
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label htmlFor={ageId}>Label</Label>
                                                    <Input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        data-entity="expenses"
                                                        id={ageId}
                                                        data-field="label"
                                                        onChange={this.handleChange}
                                                        value={expenses[idx].label}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="mb-4" key={idx}>
                                                    <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                                    <Input
                                                        type="select"
                                                        name={catId}
                                                        data-id={idx}
                                                        data-entity="expenses"
                                                        id={catId}
                                                        data-field="type"
                                                        onChange={this.handleChange}
                                                        value={expenses[idx].type}
                                                    >
                                                        <option value='text'>Text</option>
                                                        <option value='textarea'>Textarea</option>
                                                        <option value='select'>Select List</option>
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {expenses[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="expenses"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(expenses[idx], { data_id: idx, data_entity: 'expenses' })}
                                                key={expenses[idx].options.length} />
                                        </div>
                                        }
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
                            tasks.map((val, idx) => {
                                const catId = `custom_value${idx}`
                                const ageId = `age-${idx}`
                                return (
                                    <Form className="clearfix" key={idx}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label htmlFor={ageId}>Label</Label>
                                                    <Input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        data-entity="orders"
                                                        id={ageId}
                                                        data-field="label"
                                                        onChange={this.handleChange}
                                                        value={orders[idx].label}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="mb-4" key={idx}>
                                                    <Label htmlFor={catId}>{`Custom Field #${idx + 1}`}</Label>
                                                    <Input
                                                        type="select"
                                                        name={catId}
                                                        data-id={idx}
                                                        data-entity="orders"
                                                        id={catId}
                                                        data-field="type"
                                                        onChange={this.handleChange}
                                                        value={orders[idx].type}
                                                    >
                                                        <option value='text'>Text</option>
                                                        <option value='textarea'>Textarea</option>
                                                        <option value='select'>Select List</option>
                                                        <option value='switch'>Switch</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {orders[idx].type === 'select' &&
                                        <div className="row col-12">
                                            <DynamicOptionList showCorrectColumn={false}
                                                data-entity="orders"
                                                data-id={idx}
                                                canHaveOptionCorrect={false}
                                                canHaveOptionValue={true}
                                                // data={this.props.preview.state.data}
                                                updateElement={this.handleOptionChange}
                                                // preview={this.props.preview}
                                                element={Object.assign(orders[idx], { data_id: idx, data_entity: 'orders' })}
                                                key={orders[idx].options.length} />
                                        </div>
                                        }
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

                <TabContent activeTab={this.state.activeTab} >
                    {tabContent}
                    <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default CustomFieldSettings
