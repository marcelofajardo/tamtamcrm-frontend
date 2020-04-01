import React, { Component } from 'react'
import FormBuilder from './FormBuilder'
import { Button, Card, CardHeader, CardBody, NavLink, Nav, NavItem, TabContent, TabPane } from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { credit_pdf_fields } from '../models/CreditModel'
import { quote_pdf_fields } from '../models/QuoteModel'
import { invoice_pdf_fields } from '../models/InvoiceModel'
import PdfFields from './PdfFields'

class InvoiceSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: localStorage.getItem('account_id'),
            settings: {},
            activeTab: '1'
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this)
        this.handleColumnChange = this.handleColumnChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAccount = this.getAccount.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount () {
        this.getAccount()
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
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

    handleColumnChange (values) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                pdf_variables: values
            }
        }), () => this.handleSubmit())
    }

    handleSubmit () {
        const { settings } = this.state
        const formData = new FormData()
        formData.append('settings', JSON.stringify(settings))
        formData.append('_method', 'PUT')

        axios.post(`/api/accounts/${this.state.id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                toast.success('Settings updated successfully')
            })
            .catch((error) => {
                console.error(error)
                toast.error('There was an issue updating the settings')
            })
    }

    getSettingFields () {
        const settings = this.state.settings

        console.log('settings', settings)

        const formFields = [
            [
                {
                    name: 'invoice_design_id',
                    label: 'Invoice Design',
                    type: 'select',
                    value: settings.invoice_design_id,
                    options: [
                        {
                            value: '1',
                            text: 'Clean'
                        },
                        {
                            value: '2',
                            text: 'Bold'
                        },
                        {
                            value: '3',
                            text: 'Modern'
                        },
                        {
                            value: '4',
                            text: 'Plain'
                        }
                    ],
                    group: 1
                },
                {
                    name: 'page_size',
                    label: 'Page Size',
                    type: 'select',
                    value: settings.page_size,
                    options: [
                        {
                            value: 'A1',
                            text: 'A1'
                        },
                        {
                            value: 'A2',
                            text: 'A2'
                        },
                        {
                            value: 'A3',
                            text: 'A3'
                        },
                        {
                            value: 'A4',
                            text: 'A4'
                        },
                        {
                            value: 'A5',
                            text: 'A5'
                        },
                        {
                            value: 'A6',
                            text: 'A6'
                        }
                    ],
                    group: 1
                }
            ]
        ]

        return formFields
    }

    getCustomerFields () {
        return ['$client.name', '$client.id_number', '$client.vat_number', '$client.address1', '$client.address2', '$client.city_state_postal',
            '$client.postal_city_state', '$client.country', '$client.email', '$client.client1', '$client.client2', '$client.client3',
            '$client.client4'
        ]
    }

    getAccountFields () {
        return [
            '$company.name', '$company.id_number', '$client.vat_number', '$company.website', '$client.email', '$company.company1',
            '$company.company2', '$company.company3', '$company.company4'
        ]
    }

    getInvoiceFields () {
        return invoice_pdf_fields
    }

    getQuoteFields () {
        return quote_pdf_fields
    }

    getCreditFields () {
        return credit_pdf_fields
    }

    getProductFields () {
        return []
    }

    getTaskFields () {
        return []
    }

    render () {
        return this.state.loaded === true ? (
            <React.Fragment>
                <ToastContainer/>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('1')
                            }}>
                            Settings
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('2')
                            }}>
                            Invoice Settings
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('3')
                            }}>
                            Customer
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '4' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('4')
                            }}>
                            Account
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '5' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('5')
                            }}>
                            Invoice
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '6' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('6')
                            }}>
                            Quote
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '7' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('7')
                            }}>
                            Credit
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '8' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('8')
                            }}>
                            Product
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '9' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('9')
                            }}>
                            Task
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Card>
                            <CardHeader>Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getSettingFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="2">
                        <Card>
                            <CardHeader>Invoice Options</CardHeader>
                            <CardBody/>
                        </Card>
                    </TabPane>

                    <TabPane tabId="3">
                        <Card>
                            <CardHeader>Customer</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="client_details" columns={this.getCustomerFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="4">
                        <Card>
                            <CardHeader>Account</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="company_details" columns={this.getAccountFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="5">
                        <Card>
                            <CardHeader>Invoice</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="invoice_details" columns={this.getInvoiceFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="6">
                        <Card>
                            <CardHeader>Quote</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="quote_details" columns={this.getQuoteFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="7">
                        <Card>
                            <CardHeader>Credit</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="credit_details" columns={this.getCreditFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="8">
                        <Card>
                            <CardHeader>Product</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="product_columns" columns={this.getProductFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="9">
                        <Card>
                            <CardHeader>Task</CardHeader>
                            <CardBody>
                                <PdfFields onChange2={this.handleColumnChange} settings={this.state.settings} section="task_columns" columns={this.getTaskFields()}
                                    ignored_columns={this.state.settings.pdf_variables}/>
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>

                <Button color="primary" onClick={this.handleSubmit}>Save</Button>

            </React.Fragment>
        ) : null
    }
}

export default InvoiceSettings
