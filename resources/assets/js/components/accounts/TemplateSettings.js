import React, { Component } from 'react'
import FormBuilder from './FormBuilder'
import parse from 'html-react-parser'
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
                email_template_invoice: '',
                email_subject_lead: '',
                email_template_lead: '',
                email_subject_order: '',
                email_template_order: ''
            },
            activeTab: '1',
            template_type: 'invoice',
            template_name: 'Invoice',
            company_logo: null,
            preview: []
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
        const subjectKey = `email_subject_${this.state.template_type}`
        const bodyKey = `email_template_${this.state.template_type}`

        const subject = !this.state.settings[subjectKey] ? 'Subject Here' : this.state.settings[subjectKey]
        const body = !this.state.settings[bodyKey] ? 'Body Here' : this.state.settings[bodyKey]

        axios.post('api/template', { subject: subject, body: body, template: bodyKey })
            .then((r) => {
                this.setState({
                    loaded: true,
                    preview: r.data
                })
            })
            .catch((e) => {
                toast.error('There was an issue updating the settings')
            })
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value })

        if (event.target.name === 'template_type') {
            const name = event.target[event.target.selectedIndex].getAttribute('data-name')
            this.setState({ template_name: name })
        }
    }

    handleSettingsChange (event) {
        const name = event.target.name
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

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
            this.setState({ activeTab: tab }, () => {
                if (this.state.activeTab === '2') {
                    this.getPreview()
                }
            })
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
                console.error(error)
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
                id: 'subject',
                name: 'email_subject_invoice',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_invoice,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_invoice',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_invoice,
                group: 1
            }
        ]

        const paymentFields = [
            {
                id: 'subject',
                name: 'email_subject_payment',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_payment,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_payment',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_payment,
                group: 1
            }
        ]

        const partialPaymentFields = [
            {
                id: 'subject',
                name: 'email_subject_payment_partial',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_payment_partial,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_payment_partial',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_payment_partial,
                group: 1
            }
        ]

        const quoteFields = [
            {
                id: 'subject',
                name: 'email_subject_quote',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_quote,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_quote',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_quote,
                group: 1
            }
        ]

        const creditFields = [
            {
                id: 'subject',
                name: 'email_subject_statement',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_statement,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_statement',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_statement,
                group: 1
            }
        ]

        const orderFields = [
            {
                id: 'subject',
                name: 'email_subject_order',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_order,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_order',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_order,
                group: 1
            }
        ]

        const endless = [
            {
                id: 'subject',
                name: 'email_subject_reminder_endless',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_reminder_endless,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_reminder_endless',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_reminder_endless,
                group: 1
            },
            {
                id: 'endless_reminder_frequency_id',
                name: 'endless_reminder_frequency_id',
                label: 'Schedule',
                type: 'select',
                options: [
                    {
                        value: '1',
                        text: 'Daily'
                    },
                    {
                        value: '2',
                        text: 'Weekly'
                    },
                    {
                        value: '3',
                        text: 'Every 2 weeks'
                    },
                    {
                        value: '4',
                        text: 'Every 4 weeks'
                    },
                    {
                        value: '5',
                        text: 'Monthly'
                    },
                    {
                        value: '6',
                        text: 'Every 2 months'
                    },
                    {
                        value: '7',
                        text: 'Every 3 months'
                    },
                    {
                        value: '8',
                        text: 'Every 4 months'
                    },
                    {
                        value: '9',
                        text: 'Every 6 months'
                    },
                    {
                        value: '10',
                        text: 'Annually'
                    },
                    {
                        value: '11',
                        text: 'Every 2 years'
                    },
                    {
                        value: '12',
                        text: 'Every 3 years'
                    }
                ],
                value: settings.endless_reminder_frequency_id
            },
            {
                id: 'late_fee_endless_amount',
                name: 'late_fee_endless_amount',
                label: 'Fee Amount',
                type: 'text',
                placeholder: 'Fee Amount',
                value: settings.late_fee_endless_amount,
                group: 1
            },
            {
                id: 'body',
                name: 'late_fee_endless_percent',
                label: 'Fee Percent',
                type: 'text',
                placeholder: 'Fee Percent',
                value: settings.late_fee_endless_percent,
                group: 1
            }
        ]

        const firstCustom = [
            {
                id: 'subject',
                name: 'email_subject_custom1',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_custom1,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_custom1',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_custom1,
                group: 1
            }
        ]

        const secondCustom = [
            {
                id: 'subject',
                name: 'email_subject_custom2',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_custom2,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_custom2',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_custom2,
                group: 1
            }
        ]

        const thirdCustom = [
            {
                id: 'subject',
                name: 'email_subject_custom3',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_custom3,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_custom3',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_custom3,
                group: 1
            }
        ]

        const firstFields = [
            {
                id: 'subject',
                name: 'email_subject_reminder1',
                label: 'Subject',
                type: 'text',
                placeholder: 'Name',
                value: settings.email_subject_reminder1,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_reminder1',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_reminder1,
                group: 1
            },
            {
                id: 'num_days_reminder1',
                name: 'num_days_reminder1',
                label: 'Days',
                type: 'text',
                placeholder: 'Days',
                value: settings.num_days_reminder1,
                group: 1
            },
            {
                id: 'schedule_reminder1',
                name: 'schedule_reminder1',
                label: 'Schedule',
                type: 'select',
                options: [
                    {
                        value: '1',
                        text: 'After Invoice Date'
                    },
                    {
                        value: '2',
                        text: 'Before Due Date'
                    },
                    {
                        value: '3',
                        text: 'After Due Date'
                    }
                ],
                value: settings.schedule_reminder1
            },
            {
                id: 'late_fee_amount1',
                name: 'late_fee_amount1',
                label: 'Late Fee Amount',
                type: 'text',
                placeholder: 'Late Fee Amount',
                value: settings.late_fee_amount1,
                group: 1
            },
            {
                id: 'enable_reminder1',
                name: 'enable_reminder1',
                label: 'Send Email',
                type: 'switch',
                placeholder: 'Send Email',
                value: settings.enable_reminder1,
                group: 1
            }
        ]

        const secondFields = [
            {
                id: 'subject',
                name: 'email_subject_reminder2',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_reminder2,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_reminder2',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Body',
                value: settings.email_template_reminder2,
                group: 1
            },
            {
                id: 'num_days_reminder2',
                name: 'num_days_reminder2',
                label: 'Days',
                type: 'text',
                placeholder: 'Days',
                value: settings.num_days_reminder2,
                group: 1
            },
            {
                id: 'schedule_reminder2',
                name: 'schedule_reminder2',
                label: 'Schedule',
                type: 'select',
                options: [
                    {
                        value: '1',
                        text: 'After Invoice Date'
                    },
                    {
                        value: '2',
                        text: 'Before Due Date'
                    },
                    {
                        value: '3',
                        text: 'After Due Date'
                    }
                ],
                value: settings.schedule_reminder2
            },
            {
                id: 'late_fee_amount2',
                name: 'late_fee_amount2',
                label: 'Late Fee Amount',
                type: 'text',
                placeholder: 'Late Fee Amount',
                value: settings.late_fee_amount2,
                group: 1
            },
            {
                id: 'enable_reminder2',
                name: 'enable_reminder2',
                label: 'Send Email',
                type: 'switch',
                placeholder: 'Send Email',
                value: settings.enable_reminder2,
                group: 1
            }
        ]

        const thirdFields = [
            {
                id: 'subject',
                name: 'email_subject_reminder3',
                label: 'Subject',
                type: 'text',
                placeholder: 'Subject',
                value: settings.email_subject_reminder3,
                group: 1
            },
            {
                id: 'body',
                name: 'email_template_reminder3',
                label: 'Body',
                type: 'textarea',
                placeholder: 'Website',
                value: settings.email_template_reminder3,
                group: 1
            },
            {
                id: 'num_days_reminder3',
                name: 'num_days_reminder3',
                label: 'Days',
                type: 'text',
                placeholder: 'Days',
                value: settings.num_days_reminder3,
                group: 1
            },
            {
                id: 'schedule_reminder3',
                name: 'schedule_reminder3',
                label: 'Schedule',
                type: 'select',
                options: [
                    {
                        value: '1',
                        text: 'After Invoice Date'
                    },
                    {
                        value: '2',
                        text: 'Before Due Date'
                    },
                    {
                        value: '3',
                        text: 'After Due Date'
                    }
                ],
                value: settings.schedule_reminder3
            },
            {
                id: 'late_fee_amount3',
                name: 'late_fee_amount3',
                label: 'Late Fee Amount',
                type: 'text',
                placeholder: 'Late Fee Amount',
                value: settings.late_fee_amount3,
                group: 1
            },
            {
                id: 'enable_reminder3',
                name: 'enable_reminder3',
                label: 'Send Email',
                type: 'switch',
                placeholder: 'Send Email',
                value: settings.enable_reminder3,
                group: 1
            }
        ]

        formFields.invoice = invoiceFields
        formFields.order = orderFields
        formFields.partial_payment = partialPaymentFields
        formFields.payment = paymentFields
        formFields.quote = quoteFields
        formFields.credit = creditFields
        formFields.first = firstFields
        formFields.second = secondFields
        formFields.third = thirdFields
        formFields.first_custom = firstCustom
        formFields.second_custom = secondCustom
        formFields.third_custom = thirdCustom
        formFields.endless = endless

        return formFields
    }

    _buildTemplate () {
        const allFields = this.getFormFields()
        const sectionFields = allFields[this.state.template_type]
        const test = []
        test.push(sectionFields)
        return test
    }

    render () {
        const test = this._buildTemplate()
        const form = <FormBuilder
            handleChange={this.handleSettingsChange}
            formFieldsRows={test}
            handleSubmit={this.handleSubmit}
            submitBtnTitle="Calculate"
        />

        const preview = Object.keys(this.state.preview).length ? <div className="col-12" style={{ height: '600px', overflowY: 'auto' }}>
            <div>Subject: {parse(this.state.preview.subject)}</div><div className="mt-5">{parse(this.state.preview.wrapper)}</div></div>
            : null

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
                            <CardHeader>{this.state.template_name}</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Template</Label>
                                        <Input type="select"
                                            name="template_type"
                                            onChange={this.handleChange}
                                        >
                                            <option data-name="Invoice" value="invoice">Invoice</option>
                                            <option data-name="Quote" value="quote">Quote</option>
                                            <option data-name="Credit" value="credit">Credit</option>
                                            <option data-name="Payment" value="payment">Payment</option>
                                            <option data-name="Partial Payment" value="partial_payment">Partial Payment</option>
                                            <option data-name="Order" value="order">Order</option>
                                            <option data-name="Endless" value="endless">EndLess</option>
                                            <option data-name="First Reminder" value="first">First Reminder</option>
                                            <option data-name="Second Reminder" value="second">Second Reminder</option>
                                            <option data-name="Third Reminder" value="third">Third Reminder</option>
                                            <option data-name="First Custom" value="first_custom">First Custom</option>
                                            <option data-name="Second Custom" value="second_custom">Second Custom</option>
                                            <option data-name="Third Custom" value="third_custom">Third Custom</option>
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
                                {preview}
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default TemplateSettings
