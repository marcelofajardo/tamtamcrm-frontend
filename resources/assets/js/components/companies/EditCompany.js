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
    TabPane,
    DropdownItem
} from 'reactstrap'
import axios from 'axios'
import Contact from '../common/Contact'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import AddressForm from './AddressForm'
import SettingsForm from './SettingsForm'
import DetailsForm from './DetailsForm'
import CompanyDropdown from './CompanyDropdown'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'

class EditCompany extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            dropdownOpen: false,
            changesMade: false,
            showSuccessMessage: false,
            showErrorMessage: false,
            errors: [],
            contacts: this.props.brand.contacts && this.props.brand.contacts.length ? this.props.brand.contacts : [],
            name: this.props.brand.name,
            website: this.props.brand.website,
            phone_number: this.props.brand.phone_number,
            email: this.props.brand.email,
            address_1: this.props.brand.address_1,
            address_2: this.props.brand.address_2,
            town: this.props.brand.town,
            city: this.props.brand.city,
            country_id: this.props.brand.country_id,
            currency_id: this.props.brand.currency_id,
            industry_id: this.props.brand.industry_id,
            postcode: this.props.brand.postcode,
            id: this.props.brand.id,
            company_logo: null,
            assigned_user_id: this.props.brand.assigned_user_id,
            custom_value1: this.props.brand.custom_value1,
            custom_value2: this.props.brand.custom_value2,
            custom_value3: this.props.brand.custom_value3,
            custom_value4: this.props.brand.custom_value4,
            private_notes: this.props.brand.private_notes,
            activeTab: '1'
        }

        this.initialState = this.state
        this.updateContacts = this.updateContacts.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    handleInput (e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value,
            changesMade: true
        })
    }

    handleFileChange (e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    updateContacts (contacts) {
        this.setState({ contacts: contacts })
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleMultiSelect (e) {
        this.setState({ selectedUsers: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    getFormData () {
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
        formData.append('currency_id', this.state.currency_id)
        formData.append('industry_id', this.state.industry_id)
        formData.append('assigned_user_id', this.state.assigned_user_id)
        formData.append('custom_value1', this.state.custom_value1)
        formData.append('custom_value2', this.state.custom_value2)
        formData.append('custom_value3', this.state.custom_value3)
        formData.append('custom_value4', this.state.custom_value4)
        formData.append('private_notes', this.state.private_notes)
        formData.append('contacts', JSON.stringify(this.state.contacts))
        formData.append('_method', 'PUT')

        return formData
    }

    handleClick () {
        const formData = this.getFormData()

        axios.post(`/api/companies/${this.state.id}`, formData)
            .then((response) => {
                const index = this.props.brands.findIndex(company => parseInt(company.id) === this.state.id)
                this.props.brands[index] = response.data
                this.props.action(this.props.brands)
                this.setState({ changesMade: false })
                this.toggle()
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    toggle () {
        if (this.state.modal && this.state.changesMade) {
            if (window.confirm('Your changes have not been saved?')) {
                this.setState({ ...this.initialState })
            }

            return
        }

        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    render () {
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Brand
                    </ModalHeader>
                    <ModalBody>

                        <CompanyDropdown formData={this.getFormData()} id={this.state.id}/>
                        {successMessage}
                        {errorMessage}

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
                                <DetailsForm errors={this.state.errors}
                                    handleInput={this.handleInput}
                                    company={this.state}
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
                                        Contacts
                                    </CardHeader>

                                    <CardBody>
                                        <Contact contacts={this.props.brand.contacts} onChange={this.updateContacts}/>
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="3">
                                <AddressForm errors={this.state.errors}
                                    handleInput={this.handleInput}
                                    company={this.state} />
                            </TabPane>

                            <TabPane tabId="4">
                                <SettingsForm errors={this.state.errors} company={this.state}
                                    handleInput={this.handleInput}/>

                                <Notes handleInput={this.handleInput} errors={this.state.errors}
                                    private_notes={this.state.private_notes}/>
                            </TabPane>
                        </TabContent>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditCompany
