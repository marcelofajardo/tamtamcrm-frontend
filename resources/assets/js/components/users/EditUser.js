import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Card,
    CardBody,
    CardHeader,
    DropdownItem,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import axios from 'axios'
import PropTypes from 'prop-types'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import Notifications from '../common/Notifications'
import DetailsForm from './DetailsForm'
import PermissionsForm from './PermissionsForm'
import UserDropdownMenu from './UserDropdownMenu'
import CustomFieldsForm from '../common/CustomFieldsForm'

class EditUser extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            changesMade: false,
            dropdownOpen: false,
            username: null,
            errors: [],
            user: [],
            account_user: [],
            roles: [],
            selectedRoles: [],
            selectedAccounts: [],
            notifications: [],
            department: 0,
            message: '',
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            is_admin: false,
            activeTab: '1'
        }

        this.initialState = this.state
        this.account_id = JSON.parse(localStorage.getItem('appState')).user.account_id

        this.toggleTab = this.toggleTab.bind(this)
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleAccountMultiSelect = this.handleAccountMultiSelect.bind(this)
        this.setDate = this.setDate.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.setNotifications = this.setNotifications.bind(this)
        this.setSelectedAccounts = this.setSelectedAccounts.bind(this)
    }

    componentDidMount () {
        this.getUser()
    }

    toggleMenu (event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    setNotifications (notifications) {
        this.setState(prevState => ({
            selectedAccounts: {
                ...prevState.selectedAccounts,
                notifications: { email: notifications },
                account_id: this.account_id,
                permissions: ''
            }
        }))
    }

    getUser () {
        axios.get(`/api/users/edit/${this.props.user_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
            .then((r) => {
                this.setState({
                    roles: r.data.roles,
                    user: r.data.user,
                    gender: r.data.user.gender,
                    dob: r.data.user.dob,
                    username: r.data.user.username,
                    email: r.data.user.email,
                    first_name: r.data.user.first_name,
                    last_name: r.data.user.last_name,
                    phone_number: r.data.user.phone_number,
                    job_description: r.data.user.job_description,
                    custom_value1: r.data.user.custom_value1,
                    custom_value2: r.data.user.custom_value2,
                    custom_value3: r.data.user.custom_value3,
                    custom_value4: r.data.user.custom_value4,
                    password: r.data.user.password,
                    selectedRoles: r.data.selectedIds,
                    selectedAccounts: r.data.user.account_users[0]
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    getFormData () {
        return {
            company_user: this.state.selectedAccounts,
            username: this.state.username,
            department: this.state.department,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            role: this.state.selectedRoles,
            job_description: this.state.job_description,
            phone_number: this.state.phone_number,
            dob: this.state.dob,
            gender: this.state.gender,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4
        }
    }

    setSelectedAccounts (selectedAccounts) {
        this.setState({ selectedAccounts: selectedAccounts })
    }

    handleClick () {
        const data = this.getFormData()

        axios.put(`/api/users/${this.state.user.id}`, data)
            .then((response) => {
                this.initialState = this.state
                const index = this.props.users.findIndex(user => parseInt(user.id) === this.props.user_id)
                this.props.users[index] = this.state.user
                this.props.action(this.props.users)
                this.setState({ message: '', changesMade: false })
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

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    setValues (values) {
        this.setState({ user: { ...this.state.user, ...values } })
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value,
            changesMade: true
        })
    }

    handleMultiSelect (e) {
        this.setState({ selectedRoles: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    handleAccountMultiSelect (e) {
        this.setState({ selectedAccounts: Array.from(e.target.selectedOptions, (item) => item.value) }, () => console.log('accounts', this.state.selectedAccounts))
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

    setDate (date) {
        this.setValues({ dob: date })
    }

    render () {
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        const notifications = this.state.selectedAccounts && Object.keys(this.state.selectedAccounts).length && this.state.selectedAccounts.notifications ? this.state.selectedAccounts.notifications.email : []

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit User
                    </ModalHeader>
                    <ModalBody>

                        <UserDropdownMenu id={this.state.user.id} formData={this.getFormData()} />
                        {successMessage}
                        {errorMessage}

                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '1' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('1')
                                    }}>
                                    Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '2' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('2')
                                    }}>
                                    Permissions
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={this.state.activeTab === '3' ? 'active' : ''}
                                    onClick={() => {
                                        this.toggleTab('3')
                                    }}>
                                    Notifications
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
                                {Object.keys(this.state.user).length &&
                                    <React.Fragment>
                                        <DetailsForm setDate={this.setDate} errors={this.state.errors}
                                            dob={this.state.dob} username={this.state.username}
                                            handleInput={this.handleInput} email={this.state.email}
                                            first_name={this.state.first_name} last_name={this.state.last_name}
                                            phone_number={this.state.phone_number}
                                            job_description={this.state.job_description}
                                            password={this.state.password}/>

                                        <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                                            custom_value2={this.state.custom_value2}
                                            custom_value3={this.state.custom_value3}
                                            custom_value4={this.state.custom_value4}
                                            custom_fields={this.props.custom_fields}/>
                                    </React.Fragment>

                                }

                            </TabPane>

                            <TabPane tabId="2">
                                {this.state.username && this.state.username.length &&
                                <PermissionsForm handleInput={this.handleInput} errors={this.state.errors}
                                    setAccounts={this.setSelectedAccounts}
                                    departments={this.props.departments} accounts={this.props.accounts}
                                    selectedAccounts={this.state.selectedAccounts}
                                    handleMultiSelect={this.handleMultiSelect}
                                    selectedRoles={this.state.selectedRoles}/>

                                }

                            </TabPane>

                            <TabPane tabId="3">
                                <Card>
                                    <CardHeader>Notifications</CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Notifications notifications={notifications} onChange={this.setNotifications}/>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="4">
                                <Card>
                                    <CardHeader>Settings</CardHeader>
                                    <CardBody>
                                        <FormGroup/>
                                    </CardBody>
                                </Card>
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

export default EditUser

EditUser.propTypes = {
    user: PropTypes.object,
    users: PropTypes.array,
    action: PropTypes.func
}
