import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import axios from 'axios'
import Contact from '../common/Contact'
import AddButtons from '../common/AddButtons'
import SettingsForm from './SettingsForm'
import AddressForm from './AddressForm'
import DetailsForm from './DetailsForm'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'

class AddCompany extends React.Component {
    constructor (props) {
        super(props)

        this.initialState = {
            modal: false,
            name: '',
            website: '',
            phone_number: '',
            email: '',
            address_1: '',
            currency_id: null,
            assigned_user_id: null,
            industry_id: '',
            country_id: null,
            company_logo: null,
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            private_notes: '',
            address_2: '',
            town: '',
            city: '',
            postcode: '',
            loading: false,
            errors: [],
            contacts: [],
            selectedUsers: [],
            message: '',
            activeTab: '1'
        }

        this.state = this.initialState
        this.toggle = this.toggle.bind(this)
        this.updateContacts = this.updateContacts.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'companyForm')) {
            const storedValues = JSON.parse(localStorage.getItem('companyForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => localStorage.setItem('companyForm', JSON.stringify(this.state)))
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleFileChange (e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    handleMultiSelect (e) {
        this.setState({ selectedUsers: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    updateContacts (contacts) {
        this.setState({ contacts: contacts })
    }

    handleClick () {
        const formData = new FormData()
        formData.append('company_logo', this.state.company_logo)
        formData.append('name', this.state.name)
        formData.append('website', this.state.website)
        formData.append('phone_number', this.state.phone_number)
        formData.append('email', this.state.email)
        formData.append('address_1', this.state.address_1)
        formData.append('address_2', this.state.address_2)
        formData.append('town', this.state.town)
        formData.append('city', this.state.city)
        formData.append('postcode', this.state.postcode)
        formData.append('country_id', this.state.country_id)
        formData.append('contacts', JSON.stringify(this.state.contacts))
        formData.append('currency_id', this.state.currency_id)
        formData.append('industry_id', this.state.industry_id)
        formData.append('assigned_user_id', this.state.assigned_user_id)
        formData.append('private_notes', this.state.private_notes)
        formData.append('custom_value1', this.state.custom_value1)
        formData.append('custom_value2', this.state.custom_value2)
        formData.append('custom_value3', this.state.custom_value3)
        formData.append('custom_value4', this.state.custom_value4)

        axios.post('/api/companies', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const newUser = response.data
                this.props.brands.push(newUser)
                this.props.action(this.props.brands)
                localStorage.removeItem('companyForm')
                this.setState(this.initialState)
                this.toggle()
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

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState(this.initialState, () => localStorage.removeItem('companyForm'))
            }
        })
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Company
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '1' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('1')
                                    }}>
                                    Company
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '2' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('2')
                                    }}>
                                    Contacts
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '3' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('3')
                                    }}>
                                    Address
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '4' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('4')
                                    }}>
                                    Settings
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <DetailsForm errors={this.state.errors} handleInput={this.handleInput}
                                    name={this.state.name} website={this.state.website}
                                    phone_number={this.state.phone_number} email={this.state.email}
                                    handleFileChange={this.handleFileChange}/>

                                <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                                    custom_value2={this.state.custom_value2}
                                    custom_value3={this.state.custom_value3}
                                    custom_value4={this.state.custom_value4}
                                    custom_fields={this.props.custom_fields}/>
                            </TabPane>

                            <TabPane tabId="2">

                                <Card>
                                    <CardHeader>
                                        <Contact onChange={this.updateContacts}/>
                                    </CardHeader>

                                    <CardBody/>
                                </Card>
                            </TabPane>

                            <TabPane tabId="3">
                                <AddressForm errors={this.state.errors} address_1={this.state.address_1}
                                    address_2={this.state.address_2} handleInput={this.handleInput}
                                    town={this.state.town} city={this.state.city}
                                    postcode={this.state.postcode} country_id={this.state.country_id}/>
                            </TabPane>

                            <TabPane tabId="4">
                                <SettingsForm errors={this.state.errors} currency_id={this.state.currency_id}
                                    industry_id={this.state.industry_id}
                                    assigned_user_id={this.state.assigned_user_id}
                                    handleInput={this.handleInput}/>

                                <Notes handleInput={this.handleInput} errors={this.state.errors}
                                    private_notes={this.state.private_notes}/>
                            </TabPane>
                        </TabContent>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AddCompany
