import React, { Component } from 'react'
import axios from 'axios'
import {
    Form,
    FormGroup,
    Label,
    CustomInput,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardHeader,
    CardBody,
    Button,
    Modal, ModalBody, ModalFooter, ModalHeader

} from 'reactstrap'

class ModuleSettings extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: localStorage.getItem('account_id'),
            activeTab: '1',
            showConfirm: false,
            modules: Object.prototype.hasOwnProperty.call(localStorage, 'modules') ? JSON.parse(localStorage.getItem('modules')) : {
                recurringInvoices: false,
                credits: false,
                leads: false,
                deals: false,
                products: false,
                invoices: false,
                payments: false,
                quotes: false,
                expenses: false,
                events: false,
                customers: true,
                companies: true,
                projects: false,
                cases: false,
                tasks: false,
                recurringExpenses: false,
                recurringTasks: false
            },
            moduleTypes: [
                {
                    id: 'recurringInvoices',
                    value: 1,
                    label: 'Recurring Invoices',
                    isChecked: false
                },
                {
                    id: 'recurringQuotes',
                    value: 1,
                    label: 'Recurring Quotes',
                    isChecked: false
                },
                {
                    id: 'credits',
                    value: 2,
                    label: 'Credits',
                    isChecked: false
                },
                {
                    id: 'quotes',
                    value: 4,
                    label: 'Quotes',
                    isChecked: false
                },
                {
                    id: 'products',
                    value: 4,
                    label: 'Products',
                    isChecked: false
                },
                {
                    id: 'leads',
                    value: 4,
                    label: 'Leads',
                    isChecked: false
                },
                {
                    id: 'events',
                    value: 4,
                    label: 'Events',
                    isChecked: false
                },
                {
                    id: 'deals',
                    value: 4,
                    label: 'Deals',
                    isChecked: false
                },
                { id: 'tasks', value: 8, label: 'Tasks', isChecked: false },
                {
                    id: 'expenses',
                    value: 16,
                    label: 'Expenses',
                    isChecked: false
                },
                {
                    id: 'projects',
                    value: 32,
                    label: 'Projects',
                    isChecked: false
                },
                {
                    id: 'companies',
                    value: 64,
                    label: 'Vendors',
                    isChecked: false
                },
                {
                    id: 'cases',
                    value: 128,
                    label: 'Cases',
                    isChecked: false
                },
                {
                    id: 'recurringExpenses',
                    value: 512,
                    label: 'Recurring Expenses',
                    isChecked: false
                },
                {
                    id: 'recurringTasks',
                    value: 1024,
                    label: 'Recurring Tasks',
                    isChecked: false
                },
                {
                    id: 'tasks',
                    value: 1024,
                    label: 'Tasks',
                    isChecked: false
                },
                {
                    id: 'payments',
                    value: 1024,
                    label: 'Payments',
                    isChecked: false
                },
                {
                    id: 'invoices',
                    value: 1024,
                    label: 'Invoices',
                    isChecked: false
                }
            ]
        }

        this.deleteAccount = this.deleteAccount.bind(this)
        this.customInputSwitched = this.customInputSwitched.bind(this)
        this.handleAllChecked = this.handleAllChecked.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    deleteAccount () {
        const url = `/api/account/${this.state.id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                // const arrExpenses = [...self.props.expenses]
                // const index = arrExpenses.findIndex(expense => expense.id === id)
                // arrExpenses.splice(index, 1)
                // self.props.updateExpenses(arrExpenses)
            })
            .catch(function (error) {
                alert(error)
            })
    }

    handleAllChecked (event) {
        const modules = this.state.modules
        Object.keys(modules).forEach(module => modules[module] = event.target.checked)
        this.setState({ modules: modules }, () => localStorage.setItem('modules', JSON.stringify(this.state.modules)))
    }

    customInputSwitched (buttonName, e) {
        const name = e.target.id
        const checked = e.target.checked

        this.setState(prevState => ({
            modules: {
                ...prevState.modules,
                [name]: checked
            }
        }), () => localStorage.setItem('modules', JSON.stringify(this.state.modules)))
    }

    render () {
        return (
            <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggleTab('1')
                            }}>
                            Overview
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggleTab('2')
                            }}>
                            Enable Modules
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Card>
                            <CardHeader>Account Management</CardHeader>
                            <CardBody>
                                <Button onClick={() => this.setState({ showConfirm: true })} color="danger" size="lg" block>Delete Account</Button>
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="2">
                        <Card>
                            <CardHeader>Enable Modules</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleCheckbox">Switches <input type="checkbox" onClick={this.handleAllChecked}/>Check
                                            all </Label>
                                        {this.state.moduleTypes.map((module, index) => {
                                            const isChecked = this.state.modules[module.id]

                                            return (
                                                <div key={index}>
                                                    <CustomInput
                                                        checked={isChecked}
                                                        type="switch"
                                                        id={module.id}
                                                        name="customSwitch"
                                                        label={module.label}
                                                        onChange={this.customInputSwitched.bind(this, module.value)}
                                                    />
                                                </div>
                                            )
                                        }
                                        )}
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>

                <Modal isOpen={this.state.showConfirm} fade="false" toggle={() => this.setState({ showConfirm: false })}>
                    <ModalHeader toggle={() => this.setState({ showConfirm: false })}>Are you sure?</ModalHeader>
                    <ModalBody>
                        <p>This action cannot be reversed.</p>
                    </ModalBody>
                    <ModalFooter>

                        <Button onClick={() => this.setState({ showConfirm: false })}>Cancel</Button>
                        <Button onClick={this.deleteAccount} color="danger">Delete</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>

        )
    }
}

export default ModuleSettings
