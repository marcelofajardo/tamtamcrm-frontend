import React, { Component } from 'react'
import FormBuilder from './FormBuilder'
import {
    Button,
    Input,
    FormGroup,
    Label,
    Form,
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent, TabPane
} from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

class TemplateSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: localStorage.getItem('account_id'),
            loaded: false,
            settings: {
                email_template_payment: '',
                email_subject_payment: '',
                email_template_quote: '',
                email_subject_quote: '',
                email_template_statement: '',
                email_subject_statement: '',
                email_template_reminder1: '',
                email_subject_reminder1: '',
                email_template_reminder2: '',
                email_subject_reminder2: '',
                email_template_reminder3: '',
                email_subject_reminder3: '',
                email_subject_invoice: '',
                email_template_invoice: ''
            },
            activeTab: '1',
            template_type: 'invoice',
            company_logo: null
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAccount = this.getAccount.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount () {
        this.getAccount()
    }

    getAccount () {
        axios.get(`api/accounts/${this.state.id}`)
            .then((r) => {
                this.setState({
                    loaded: true,
                    settings: r.data.settings
                })
            })
            .catch((e) => {
                toast.error('There was an issue updating the settings')
            })
    }

    getPreview () {
        axios.get(`api/accounts/${this.state.id}`)
            .then((r) => {
                this.setState({
                    loaded: true,
                    settings: r.data.settings
                })
            })
            .catch((e) => {
                toast.error('There was an issue updating the settings')
            })
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSettingsChange (event) {
        const name = event.target.name
        const value = event.target.value

        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                [name]: value
            }
        }))
    }

    handleFileChange (e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleSubmit (e) {
        const formData = new FormData()
        formData.append('settings', JSON.stringify(this.state.settings))
        formData.append('company_logo', this.state.company_logo)
        formData.append('_method', 'PUT')

        axios.post('/api/accounts/1', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                toast.success('Settings updated successfully')
            })
            .catch((error) => {
                // this.setState({
                //     errors: error.response.data.errors
                // })
            })
    }

    getFormFields () {
        const settings = this.state.settings
        const formFields = []
        formFields.invoice = []

        const invoiceFields = [
            {
                name: 'email_subject_invoice',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_invoice,
                group: 1
            },
            {
                name: 'email_template_invoice',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_invoice,
                group: 1
            }
        ]

        const paymentFields = [
            {
                name: 'email_subject_payment',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_payment,
                group: 1
            },
            {
                name: 'email_template_payment',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_payment,
                group: 1
            }
        ]

        const quoteFields = [
            {
                name: 'email_subject_quote',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_quote,
                group: 1
            },
            {
                name: 'email_template_quote',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_quote,
                group: 1
            }
        ]

        const creditFields = [
            {
                name: 'email_subject_statement',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_statement,
                group: 1
            },
            {
                name: 'email_template_statement',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_statement,
                group: 1
            }
        ]

        const firstFields = [
            {
                name: 'email_subject_reminder1',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_reminder1,
                group: 1
            },
            {
                name: 'email_template_reminder1',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_reminder1,
                group: 1
            }
        ]

        const secondFields = [
            {
                name: 'email_subject_reminder2',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_reminder2,
                group: 1
            },
            {
                name: 'email_template_reminder2',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_reminder2,
                group: 1
            }
        ]

        const thirdFields = [
            {
                name: 'email_subject_reminder3',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_reminder3,
                group: 1
            },
            {
                name: 'email_template_reminder3',
                label: 'Body',
                type: 'text',
                placeholder: 'Website',
                value: settings.email_template_reminder3,
                group: 1
            }
        ]

        formFields.invoice = invoiceFields
        formFields.payment = paymentFields
        formFields.quote = quoteFields
        formFields.credit = creditFields
        formFields.first = firstFields
        formFields.second = secondFields
        formFields.third = thirdFields

        return formFields
    }

    render () {
        const allFields = this.getFormFields()
        const sectionFields = allFields[this.state.template_type]
        const test = []
        test.push(sectionFields)

        const form = <FormBuilder
            handleChange={this.handleSettingsChange}
            formFieldsRows={test}
            handleSubmit={this.handleSubmit}
            submitBtnTitle="Calculate"
        />

        return (
            <React.Fragment>
                <ToastContainer/>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => { this.toggle('1') }}>
                            Edit
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => { this.toggle('2') }}>
                            Preview
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">

                        <Card>
                            <CardHeader>{this.state.template_type}</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Template</Label>
                                        <Input type="select"
                                            name="template_type"
                                            onChange={this.handleChange}
                                        >
                                            <option value="invoice">Invoice</option>
                                            <option value="quote">Quote</option>
                                            <option value="credit">Credit</option>
                                            <option value="payment">Payment</option>
                                            <option value="first">First Reminder</option>
                                            <option value="second">Second Reminder</option>
                                            <option value="third">Third Reminder</option>
                                        </Input>
                                    </FormGroup>

                                    {form}
                                    <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="2">

                        <Card>
                            <CardHeader>Preview</CardHeader>
                            <CardBody>
                                preview
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default TemplateSettings
