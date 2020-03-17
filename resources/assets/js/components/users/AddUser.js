import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import axios from 'axios'
import DropdownDate from '../common/DropdownDate'
import DepartmentDropdown from '../common/DepartmentDropdown'
import RoleDropdown from '../common/RoleDropdown'
import FormBuilder from '../accounts/FormBuilder'
import AddButtons from '../common/AddButtons'
import Notifications from '../common/Notifications'

class AddUser extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
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

        this.toggle = this.toggle.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleAccountMultiSelect = this.handleAccountMultiSelect.bind(this)
        this.setDate = this.setDate.bind(this)
        this.buildGenderDropdown = this.buildGenderDropdown.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.setNotifications = this.setNotifications.bind(this)

        this.defaultValues = {
            year: 'Select Year',
            month: 'Select Month',
            day: 'Select Day'
        }

        this.classes = {
            dateContainer: 'form-row',
            yearContainer: 'col-md-4 mb-3',
            monthContainer: 'col-md-4 mb-3',
            dayContainer: 'col-md-4 mb-3'
        }

        this.account_id = JSON.parse(localStorage.getItem('appState')).user.account_id
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

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleCheck (e) {
        const account_id = parseInt(e.target.value)
        const checked = e.target.checked
        const name = e.target.name

        this.setState(prevState => ({
            selectedAccounts: {
                ...prevState.selectedAccounts,
                [name]: checked,
                account_id: account_id,
                permissions: ''
            }
        }))
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
                this.setState({
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
                    selectedRoles: [],
                    message: '',
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: ''
                })
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
                this.setState({
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
                    selectedRoles: [],
                    message: '',
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: ''
                }, () => localStorage.removeItem('userForm'))
            }
        })
    }

    handleMultiSelect (e) {
        this.setState({ selectedRoles: Array.from(e.target.selectedOptions, (item) => item.value) }, () => localStorage.setItem('userForm', JSON.stringify(this.state)))
    }

    handleAccountMultiSelect (e) {
        this.setState({ selectedAccounts: Array.from(e.target.selectedOptions, (item) => item.value) }, () => console.log('accounts', this.state.selectedAccounts))
    }

    setDate (date) {
        this.setState({ dob: date }, localStorage.setItem('userForm', JSON.stringify(this.state)))
    }

    buildGenderDropdown () {
        const arrOptions = ['male', 'female']

        const options = arrOptions.map(option => {
            return <option key={option} value={option}>{option}</option>
        })

        return (
            <FormGroup>
                <Label for="gender">Gender(*):</Label>
                <Input className={this.hasErrorFor('gender') ? 'is-invalid' : ''}
                    type="select"
                    name="gender"
                    onChange={this.handleInput.bind(this)}>
                    <option value="">Select gender</option>
                    {options}
                </Input>
                {this.renderErrorFor('gender')}
            </FormGroup>
        )
    }

    render () {
        const genderList = this.buildGenderDropdown()
        const { message } = this.state
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

        const account = this.props.accounts.filter(account => account.id === this.account_id)
        console.log('current account', account)

        // const checked = assignedAccounts.length > 0
        const is_admin = this.state.selectedAccounts && this.state.selectedAccounts.is_admin === true

        const accountList = (
            <React.Fragment key={account[0].id}>
                <div>
                    <FormGroup check inline>
                        <Label check>
                            <Input name="is_admin" checked={is_admin} value={account[0].id} onChange={this.handleCheck}
                                type="checkbox"/>
                                Administrator
                        </Label>
                    </FormGroup>
                </div>
            </React.Fragment>
        )

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
                                    <CardHeader>Details</CardHeader>
                                    <CardBody>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="username">Username(*):</Label>
                                                    <Input className={this.hasErrorFor('username') ? 'is-invalid' : ''}
                                                        placeholder="Username"
                                                        type="text"
                                                        name="username"
                                                        value={this.state.username}
                                                        onChange={this.handleInput.bind(this)}/>
                                                    <small className="form-text text-muted">Your username must be
                                                        "firstname"."lastname"
                                                        eg
                                                        joe.bloggs.
                                                    </small>
                                                    {this.renderErrorFor('username')}
                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="email">Email(*):</Label>
                                                    <Input className={this.hasErrorFor('email') ? 'is-invalid' : ''}
                                                        placeholder="Email"
                                                        type="email"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleInput.bind(this)}/>
                                                    {this.renderErrorFor('email')}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="first_name">First Name(*):</Label>
                                                    <Input className={this.hasErrorFor('first_name') ? 'is-invalid' : ''}
                                                        type="text"
                                                        name="first_name"
                                                        value={this.state.first_name}
                                                        placeholder="First Name"
                                                        onChange={this.handleInput.bind(this)}/>
                                                    {this.renderErrorFor('first_name')}
                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="last_name">Last Name(*):</Label>
                                                    <Input className={this.hasErrorFor('last_name') ? 'is-invalid' : ''}
                                                        type="text"
                                                        value={this.state.last_name}
                                                        placeholder="Last Name"
                                                        name="last_name"
                                                        onChange={this.handleInput.bind(this)}/>
                                                    {this.renderErrorFor('last_name')}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col md={6}>
                                                {genderList}
                                            </Col>

                                            <Col md={6}>
                                                <DropdownDate classes={this.classes} defaultValues={this.defaultValues}
                                                    onDateChange={this.setDate}/>
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="phone_number">Phone Number:</Label>
                                                    <Input className={this.hasErrorFor('phone_number') ? 'is-invalid' : ''}
                                                        value={this.state.phone_number}
                                                        type="tel"
                                                        name="phone_number"
                                                        onChange={this.handleInput.bind(this)}/>
                                                    {this.renderErrorFor('phone_number')}
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="job_description">Job Description:</Label>
                                                    <Input className={this.hasErrorFor('job_description') ? 'is-invalid' : ''}
                                                        type="text"
                                                        placeholder="Job Description"
                                                        value={this.state.job_description}
                                                        name="job_description"
                                                        onChange={this.handleInput.bind(this)}/>
                                                    {this.renderErrorFor('job_description')}
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="password">Password:</Label>
                                                    <Input className={this.hasErrorFor('password') ? 'is-invalid' : ''}
                                                        value={this.state.password}
                                                        type="password"
                                                        name="password" onChange={this.handleInput.bind(this)}/>
                                                    <small className="form-text text-muted">Your password must be more than 8
                                                        characters
                                                        long,
                                                        should contain at-least 1 Uppercase, 1 Lowercase, 1 Numeric and 1
                                                        special
                                                        character..
                                                    </small>
                                                    {this.renderErrorFor('password')}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {customForm}
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="2">
                                <Card>
                                    <CardHeader>Permissions</CardHeader>
                                    <CardBody>
                                        <Row form>
                                            <Col md={6}>
                                                <Label for="job_description">Department:</Label>
                                                <DepartmentDropdown
                                                    departments={this.props.departments}
                                                    name="department"
                                                    errors={this.state.errors}
                                                    handleInputChanges={this.handleInput}
                                                />
                                            </Col>

                                            <Col md={6}>
                                                <RoleDropdown
                                                    name="role"
                                                    multiple={true}
                                                    errors={this.state.errors}
                                                    handleInputChanges={this.handleMultiSelect}
                                                    role={this.state.selectedRoles}
                                                />
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <h4>Accounts</h4>
                                            <Col md={6}>
                                                {accountList}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="3">
                                <Card>
                                    <CardHeader>Notifications</CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Notifications onChange={this.setNotifications} />
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </TabPane>

                            <TabPane tabId="4">
                                <Card>
                                    <CardHeader>Settings</CardHeader>
                                    <CardBody>
                                        <FormGroup />
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
