import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    CustomInput,
    FormGroup,
    Label,
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
import CountryDropdown from '../common/CountryDropdown'
import IndustryDropdown from '../common/IndustryDropdown'
import CurrencyDropdown from '../common/CurrencyDropdown'
import UserDropdown from '../common/UserDropdown'
import FormBuilder from '../accounts/FormBuilder'
import Contact from '../common/Contact'
import AddButtons from '../common/AddButtons'

class AddCompany extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            name: '',
            website: '',
            phone_number: '',
            email: '',
            address_1: '',
            currency_id: null,
            assigned_user_id: null,
            industry_id: null,
            country_id: null,
            company_logo: null,
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            notes: '',
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
        this.toggle = this.toggle.bind(this)
        this.updateContacts = this.updateContacts.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
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
        formData.append('notes', this.state.notes)
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
                this.setState({
                    phone_number: '',
                    email: '',
                    address_1: '',
                    currency_id: null,
                    industry_id: null,
                    country_id: null,
                    company_logo: null,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    notes: '',
                    address_2: '',
                    town: '',
                    city: '',
                    postcode: '',
                    loading: false,
                    assigned_user_id: null
                })
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
                this.setState({
                    phone_number: '',
                    email: '',
                    address_1: '',
                    currency_id: null,
                    assigned_user_id: null,
                    industry_id: null,
                    country_id: null,
                    company_logo: null,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    notes: '',
                    address_2: '',
                    town: '',
                    city: '',
                    postcode: '',
                    loading: false
                }, () => localStorage.removeItem('companyForm'))
            }
        })
    }

    render () {
        const { message } = this.state
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

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
                                <Card>
                                    <CardHeader>Company</CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="username">Name(*):</Label>
                                            <Input className={this.hasErrorFor('name') ? 'is-invalid' : ''}
                                                value={this.state.name}
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('name')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="website">Website(*):</Label>
                                            <Input className={this.hasErrorFor('website') ? 'is-invalid' : ''}
                                                type="text"
                                                name="website"
                                                value={this.state.website}
                                                placeholder="Website"
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('website')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="phone_number">Phone Number(*):</Label>
                                            <Input className={this.hasErrorFor('phone_number') ? 'is-invalid' : ''}
                                                placeholder="Phone Number"
                                                type="tel"
                                                name="phone_number"
                                                value={this.state.phone_number}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('phone_number')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="email">Email(*):</Label>
                                            <Input className={this.hasErrorFor('name') ? 'is-invalid' : ''}
                                                placeholder="Email"
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('email')}
                                        </FormGroup>

                                        {customForm}
                                    </CardBody>
                                </Card>
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
                                <Card>
                                    <CardHeader>Address</CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="address_1">Address(*):</Label>
                                            <Input className={this.hasErrorFor('address_1') ? 'is-invalid' : ''}
                                                placeholder="Address"
                                                type="text"
                                                name="address_1"
                                                value={this.state.address_1}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('address_1')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="address_2">Address 2:</Label>
                                            <Input className={this.hasErrorFor('address_2') ? 'is-invalid' : ''}
                                                placeholder="Address"
                                                type="text"
                                                name="address_2"
                                                value={this.state.address_2}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('address_2')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="town">Town(*):</Label>
                                            <Input className={this.hasErrorFor('town') ? 'is-invalid' : ''}
                                                placeholder="Town"
                                                type="text"
                                                name="town"
                                                value={this.state.town}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('town')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="city">City(*):</Label>
                                            <Input className={this.hasErrorFor('city') ? 'is-invalid' : ''}
                                                placeholder="City"
                                                type="text"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('city')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="postcode">Postcode(*):</Label>
                                            <Input className={this.hasErrorFor('postcode') ? 'is-invalid' : ''}
                                                placeholder="Postcode"
                                                type="text"
                                                name="postcode"
                                                value={this.state.postcode}
                                                onChange={this.handleInput.bind(this)}/>
                                            {this.renderErrorFor('postcode')}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="postcode">Country(*):</Label>
                                            <CountryDropdown
                                                country={this.state.country_id}
                                                errors={this.state.errors}
                                                handleInputChanges={this.handleInput.bind(this)}
                                            />
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="4">
                                <Card>
                                    <CardHeader>Notes</CardHeader>
                                    <CardBody>

                                        <FormGroup>
                                            <Label for="postcode">Notes:</Label>
                                            <Input
                                                value={this.state.notes}
                                                type='textarea'
                                                name="notes"
                                                errors={this.state.errors}
                                                onChange={this.handleInput.bind(this)}
                                            />
                                        </FormGroup>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>Settings</CardHeader>
                                    <CardBody>

                                        <FormGroup>
                                            <Label>Logo</Label>
                                            <CustomInput className="mt-4 mb-4"
                                                onChange={this.handleFileChange.bind(this)}
                                                type="file"
                                                id="company_logo" name="company_logo"
                                                label="Logo"/>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="postcode">Currency(*):</Label>
                                            <CurrencyDropdown
                                                currency_id={this.state.currency_id}
                                                errors={this.state.errors}
                                                handleInputChanges={this.handleInput.bind(this)}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="postcode">Industry:</Label>
                                            <IndustryDropdown
                                                industry_id={this.state.industry_id}
                                                errors={this.state.errors}
                                                handleInputChanges={this.handleInput.bind(this)}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="postcode">Users:</Label>
                                            <UserDropdown
                                                name="assigned_user_id"
                                                errors={this.state.errors}
                                                handleInputChanges={this.handleInput.bind(this)}
                                            />
                                        </FormGroup>
                                    </CardBody>
                                </Card>
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
