import React, { Component } from 'react'
import FormBuilder from './FormBuilder'
import { Button, Card, CardHeader, CardBody, NavLink, Nav, NavItem, TabContent, TabPane } from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export default class WorkflowSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: localStorage.getItem('account_id'),
            settings: {},
            activeTab: '1'
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

    getInvoiceFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'auto_email_invoice',
                    label: 'Auto Email',
                    type: 'switch',
                    value: settings.auto_email_invoice,
                    group: 1
                },
                {
                    name: 'auto_archive_invoice',
                    label: 'Auto Archive',
                    type: 'switch',
                    value: settings.auto_archive_invoice,
                    group: 1
                }
            ]
        ]

        return formFields
    }

    getLeadFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'auto_email_lead',
                    label: 'Auto Email',
                    type: 'switch',
                    value: settings.auto_email_lead,
                    group: 1
                },
                {
                    name: 'auto_archive_lead',
                    label: 'Auto Archive',
                    type: 'switch',
                    value: settings.auto_archive_lead,
                    group: 1
                }
            ]
        ]

        return formFields
    }

    getQuoteFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'auto_email_quote',
                    label: 'Auto Email',
                    type: 'switch',
                    value: settings.auto_email_quote,
                    group: 1
                },
                {
                    name: 'auto_archive_quote',
                    label: 'Auto Archive',
                    type: 'switch',
                    value: settings.auto_archive_quote,
                    group: 1
                },
                {
                    name: 'auto_convert_quote',
                    label: 'Auto Convert',
                    type: 'switch',
                    value: settings.auto_convert_quote,
                    group: 1
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
                            Invoices
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('2')
                            }}>
                            Quotes
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('3')
                            }}>
                            Leads
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
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

                    <TabPane tabId="2">
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

                    <TabPane tabId="3">
                        <Card>
                            <CardHeader>Lead Settings</CardHeader>
                            <CardBody>
                                <FormBuilder
                                    handleChange={this.handleSettingsChange}
                                    formFieldsRows={this.getLeadFields()}
                                />
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>

                <Button color="primary" onClick={this.handleSubmit}>Save</Button>

            </React.Fragment>
        ) : null
    }
}
