import React, { Component } from 'react'
import FormBuilder from './FormBuilder'
import { Button, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

class NumberSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            activeTab: '1',
            id: localStorage.getItem('account_id'),
            settings: {}
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

    handleSubmit (e) {
        const formData = new FormData()
        formData.append('settings', JSON.stringify(this.state.settings))
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
                    name: 'recurring_number_prefix',
                    label: 'Recurring Prefix',
                    type: 'text',
                    placeholder: 'Recurring Prefix',
                    value: settings.recurring_number_prefix,
                    group: 1
                },
                {
                    name: 'counter_padding',
                    label: 'Counter Padding',
                    type: 'text',
                    placeholder: 'Counter Padding',
                    value: settings.counter_padding
                }
            ]
        ]

        return formFields
    }

    getInvoiceFields () {
        const settings = this.state.settings

        console.log('settings', settings)

        const formFields = [
            [
                {
                    name: 'invoice_number_pattern',
                    label: 'Invoice Number Pattern',
                    type: 'text',
                    placeholder: 'Invoice Number Pattern',
                    value: settings.invoice_number_pattern,
                    group: 1
                },
                {
                    name: 'invoice_number_counter',
                    label: 'Invoice Counter',
                    type: 'text',
                    placeholder: 'Invoice Counter',
                    value: settings.invoice_number_counter
                },
            ]
        ]

        return formFields
    }

    getOrderFields () {
        const settings = this.state.settings

        console.log('settings', settings)

        const formFields = [
            [
                {
                    name: 'order_number_pattern',
                    label: 'Order Number Pattern',
                    type: 'text',
                    placeholder: 'Order Number Pattern',
                    value: settings.order_number_pattern,
                    group: 1
                },
                {
                    name: 'order_number_counter',
                    label: 'Order Counter',
                    type: 'text',
                    placeholder: 'Order Counter',
                    value: settings.order_number_counter
                },
            ]
        ]

        return formFields
    }

    getQuoteFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'quote_number_pattern',
                    label: 'Quote Number Pattern',
                    type: 'text',
                    placeholder: 'Quote Number Pattern',
                    value: settings.quote_number_pattern,
                    group: 1
                },
                {
                    name: 'quote_number_counter',
                    label: 'Quote Counter',
                    type: 'text',
                    placeholder: 'Quote Counter',
                    value: settings.quote_number_counter
                },
                {
                    name: 'quote_design_id',
                    label: 'Quote Design',
                    type: 'select',
                    value: settings.quote_design_id,
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
                }
            ]
        ]

        return formFields
    }

    getCreditFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'credit_number_pattern',
                    label: 'Credit Number Pattern',
                    type: 'text',
                    placeholder: 'Credit Number Pattern',
                    value: settings.credit_number_pattern,
                    group: 1
                },
                {
                    name: 'credit_number_counter',
                    label: 'Credit Counter',
                    type: 'text',
                    placeholder: 'Credit Counter',
                    value: settings.credit_number_counter
                }
                // {
                //     name: 'credit_design_id',
                //     label: 'Credit Design',
                //     type: 'select',
                //     value: settings.credit_design_id,
                //     options: [
                //         {
                //             value: '1',
                //             text: 'Clean'
                //         },
                //         {
                //             value: '2',
                //             text: 'Bold'
                //         },
                //         {
                //             value: '3',
                //             text: 'Modern'
                //         },
                //         {
                //             value: '4',
                //             text: 'Plain'
                //         }
                //     ],
                //     group: 1
                // }
            ]
        ]

        return formFields
    }

    getPaymentFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'payment_number_counter',
                    label: 'Payment Counter',
                    type: 'text',
                    placeholder: 'Payment Counter',
                    value: settings.payment_number_counter
                },
                {
                    name: 'payment_terms',
                    label: 'Payment Terms',
                    type: 'select',
                    placeholder: 'Payment Terms',
                    value: settings.payment_terms,
                    options: [
                        {
                            value: '1',
                            text: 'Yes'
                        },
                        {
                            value: '0',
                            text: 'No'
                        }
                    ]
                }
            ]
        ]

        return formFields
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
                            Invoices
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('3')
                            }}>
                            Quotes
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '4' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('4')
                            }}>
                            Payments
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '5' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('5')
                            }}>
                            Credits
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '6' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('6')
                            }}>
                            Orders
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Card>
                            <CardHeader>Number Settings</CardHeader>
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
                            <CardHeader>Invoice Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getInvoiceFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="3">
                        <Card>
                            <CardHeader>Quote Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getQuoteFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="4">
                        <Card>
                            <CardHeader>Payment Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getPaymentFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="5">
                        <Card>
                            <CardHeader>Credit Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getCreditFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="6">
                        <Card>
                            <CardHeader>Order Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getOrderFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>
                    <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                </TabContent>
            </React.Fragment>
        ) : null
    }
}

export default NumberSettings
