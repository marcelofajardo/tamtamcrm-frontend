import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    CustomInput
} from 'reactstrap'

class ModuleSettings extends Component {
    constructor (props) {
        super(props)
        this.state = {
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

        this.customInputSwitched = this.customInputSwitched.bind(this)
        this.handleAllChecked = this.handleAllChecked.bind(this)
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
            <div>
                <p>Start editing to see some magic happen :)</p>
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
                {this.state.log}
            </div>
        )
    }
}

export default ModuleSettings
