import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap'
import AddressForm from './AddressForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import CustomerForm from './CustomerForm'
import SettingsForm from './SettingsForm'
import {
    Card, CardBody, CardHeader
} from 'reactstrap'
import Contact from '../common/Contact'

export default function CustomerTabs (props) {
    const setBilling = e => {
        setBillingValues({
            ...billing,
            [e.target.name]: e.target.value
        })
    }

    // const setContacts = contacts => {
    //     setContactValues({ contacts: contacts })
    // }

    console.log('contacts', contacts)

    const setShipping = e => {
        setShippingValues({
            ...shipping,
            [e.target.name]: e.target.value
        })
    }

    const setSettings = e => {
        if (e.target.dataset && e.target.dataset.namespace === 'settings') {
            setSettingValues({
                ...settings,
                [e.target.name]: e.target.value
            })

            return
        }

        setCustomer(e)
    }

    const setCustomer = e => {
        setCustomerValues({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    const [errors, setErrors] = useState({})

    const updateForm = event => {
        const addresses = []
        var innerObj = {}
        innerObj.billing = billing
        innerObj.shipping = shipping
        addresses.push(innerObj)

        axios.put(`/api/customers/${props.customer.id}`,
            {
                first_name: customer.first_name,
                last_name: customer.last_name,
                email: customer.email,
                phone: customer.phone,
                job_title: customer.job_title,
                company_id: customer.company_id,
                description: customer.description,
                customer_type: customer.customer_type,
                currency_id: customer.currency_id,
                assigned_user: customer.assigned_user,
                default_payment_method: customer.default_payment_method,
                group_settings_id: customer.group_settings_id,
                custom_value1: customer.custom_value1,
                custom_value2: customer.custom_value2,
                custom_value3: customer.custom_value3,
                custom_value4: customer.custom_value4,
                addresses: addresses,
                contacts: contacts,
                settings: settings
            }
        ).then(response => {
            if (props.customers && props.customers.length) {
                const index = props.customers.findIndex(customer => parseInt(customer.id) === props.customer.id)
                props.customers[index] = response.data
                props.action(props.customers)
                props.toggle()
            }
        })
            .catch((error) => {
                setErrors(error.response.data.errors)
            })
    }

    const submitForm = e => {
        const addresses = []
        var innerObj = {}
        innerObj.billing = billing
        innerObj.shipping = shipping
        addresses.push(innerObj)

        axios.post('/api/customers', {
            first_name: customer.first_name,
            group_settings_id: customer.group_settings_id,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone,
            job_title: customer.job_title,
            company_id: customer.company_id,
            description: customer.description,
            customer_type: customer.customer_type,
            currency_id: customer.currency_id,
            assigned_user: customer.assigned_user,
            default_payment_method: customer.default_payment_method,
            custom_value1: customer.custom_value1,
            custom_value2: customer.custom_value2,
            custom_value3: customer.custom_value3,
            custom_value4: customer.custom_value4,
            addresses: addresses,
            contacts: contacts,
            settings: settings
        })
            .then((response) => {
                const newCustomer = response.data
                props.customers.push(newCustomer)
                props.action(props.customers)
                toast.success('user mappings updated successfully')
                props.toggle()
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
                toast.error('Unable to update user mappings')
            })
    }

    const [activeTab, setActiveTab] = useState('1')

    // const [contacts, setContactValues] = useState({
    //     contacts: props.customer && props.customer.contacts ? props.customer.contacts : []
    // }, () => {
    //     console.log('contacts 22', contacts)
    // })

    const [contacts, setContacts] = useState(props.customer && props.customer.contacts ? props.customer.contacts : []);

    const [customer, setCustomerValues] = useState({
        first_name: props.customer ? props.customer.name.split(' ').slice(0, -1).join(' ') : '',
        last_name: props.customer ? props.customer.name.split(' ').slice(-1).join(' ') : '',
        email: props.customer ? props.customer.email : '',
        job_title: props.customer ? props.customer.job_title : '',
        company_id: props.customer ? props.customer.company_id : '',
        phone: props.customer ? props.customer.phone : '',
        customer_type: props.customer ? props.customer.customer_type : '',
        group_settings_id: props.customer ? props.customer.group_settings_id : null,
        currency_id: props.customer ? props.customer.currency_id : '',
        default_payment_method: props.customer ? props.customer.default_payment_method : '',
        assigned_user: props.customer ? props.customer.assigned_user : '',
        custom_value1: props.customer ? props.customer.custom_value1 : '',
        custom_value2: props.customer ? props.customer.custom_value2 : '',
        custom_value3: props.customer ? props.customer.custom_value3 : '',
        custom_value4: props.customer ? props.customer.custom_value4 : ''
    })

    const [settings, setSettingValues] = useState({
        payment_terms: props.customer ? props.customer.settings.payment_terms : ''
    })

    const [billing, setBillingValues] = useState({
        address_1: props.customer && props.customer.billing ? props.customer.billing.address_1 : '',
        address_2: props.customer && props.customer.billing ? props.customer.billing.address_2 : '',
        zip: props.customer && props.customer.billing ? props.customer.billing.zip : '',
        city: props.customer && props.customer.billing ? props.customer.billing.city : '',
        country_id: props.customer && props.customer.billing ? props.customer.billing.country_id : 225
    })

    const [shipping, setShippingValues] = useState({
        address_1: props.customer && props.customer.shipping ? props.customer.shipping.address_1 : '',
        address_2: props.customer && props.customer.shipping ? props.customer.shipping.address_2 : '',
        zip: props.customer && props.customer.shipping ? props.customer.shipping.zip : '',
        city: props.customer && props.customer.shipping ? props.customer.shipping.city : '',
        country_id: props.customer && props.customer.shipping ? props.customer.shipping.country_id : 225
    })

    const method = props.type === 'add' ? submitForm : updateForm

    return (
        <React.Fragment>
            <Nav tabs>
                <NavItem>
                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                        Details
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        Contacts
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                        Settings
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={activeTab === '4' ? 'active' : ''} onClick={() => setActiveTab('4')}>
                        Billing Address
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={activeTab == '5' ? 'active' : ''} onClick={() => setActiveTab('5')}>
                       Shipping Address
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <CustomerForm custom_fields={props.custom_fields} errors={errors} onChange={setCustomer} customer={customer}/>
                </TabPane>

                <TabPane tabId="2">
                    <Contact errors={errors} onChange={setContacts} contacts={contacts}/>
                </TabPane>

                <TabPane tabId="3">
                    <SettingsForm onChange={setSettings} customer={customer} settings={settings}/>
                </TabPane>

                <TabPane tabId="4">
                    <Card>
                        <CardHeader>Addresses</CardHeader>
                        <CardBody>
                            <AddressForm errors={errors} onChange={setBilling} customer={billing}/>
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane tabId="5">
                    <Card>
                        <CardHeader>Addresses</CardHeader>
                        <CardBody>
                            <AddressForm onChange={setShipping} customer={shipping}/>
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>

            <Button color="primary" onClick={method}>Send </Button>
        </React.Fragment>
    )
}
