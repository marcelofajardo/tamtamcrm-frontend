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
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import axios from 'axios'
import AddButtons from '../common/AddButtons'
import Notifications from '../common/Notifications'
import DetailsForm from './DetailsForm'
import PermissionsForm from './PermissionsForm'
import CustomFieldsForm from '../common/CustomFieldsForm'

class AddUser extends React.Component {
    constructor (props) {
        super(props)

        this.initialState = {
            modal: false,
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            dob: '',
            job_description: '',
            phone_number: '',
            gender: '',
            department: 0,
            role_id: 0,
            password: '',
            loading: false,
            errors: [],
            roles: [],
            selectedAccounts: [],
            selectedRoles: [],
            notifications: [],
            message: '',
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            is_admin: false,
            activeTab: '1'
        }

        this.state = this.initialState

        this.toggle = this.toggle.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.setDate = this.setDate.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.setNotifications = this.setNotifications.bind(this)
        this.setSelectedAccounts = this.setSelectedAccounts.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'userForm')) {
            const storedValues = JSON.parse(localStorage.getItem('userForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
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

    setSelectedAccounts (selectedAccounts) {
        this.setState({ selectedAccounts: selectedAccounts })
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleClick () {
        axios.post('/api/users', {
            username: this.state.username,
            company_user: this.state.selectedAccounts,
            department: this.state.department,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            job_description: this.state.job_description,
            phone_number: this.state.phone_number,
            dob: this.state.dob,
            gender: this.state.gender,
            password: this.state.password,
            role: this.state.selectedRoles,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4
        })
            .then((response) => {
                this.toggle()
                const newUser = response.data
                this.props.users.push(newUser)
                this.props.action(this.props.users)
                localStorage.removeItem('userForm')
                this.setState(this.initialState)
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

    handleInput (event) {
        const { name, value } = event.target

        this.setState({
            [name]: value
        }, () => localStorage.setItem('userForm', JSON.stringify(this.state)))
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState(this.initialState, () => localStorage.removeItem('userForm'))
            }
        })
    }

    handleMultiSelect (e) {
        this.setState({ selectedRoles: Array.from(e.target.selectedOptions, (item) => item.value) }, () => localStorage.setItem('userForm', JSON.stringify(this.state)))
    }

    setDate (date) {
        this.setState({ dob: date }, localStorage.setItem('userForm', JSON.stringify(this.state)))
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add User
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
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <DetailsForm user={this.state} setDate={this.setDate} errors={this.state.errors}
                                    handleInput={this.handleInput}/>

                                <CustomFieldsForm handleInput={this.handleInput}
                                    custom_value1={this.state.custom_value1}
                                    custom_value2={this.state.custom_value2}
                                    custom_value3={this.state.custom_value3}
                                    custom_value4={this.state.custom_value4}
                                    custom_fields={this.props.custom_fields}/>

                            </TabPane>

                            <TabPane tabId="2">
                                <PermissionsForm handleInput={this.handleInput} errors={this.state.errors}
                                    setAccounts={this.setSelectedAccounts}
                                    departments={this.props.departments} accounts={this.props.accounts}
                                    selectedAccounts={this.state.selectedAccounts}
                                    handleMultiSelect={this.handleMultiSelect}
                                    selectedRoles={this.state.selectedRoles}/>
                            </TabPane>

                            <TabPane tabId="3">
                                <Card>
                                    <CardHeader>Notifications</CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Notifications onChange={this.setNotifications}/>
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

export default AddUser
