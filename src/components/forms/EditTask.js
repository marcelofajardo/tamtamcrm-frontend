import React, { Component } from 'react'
import 'react-dates/initialize' // necessary for latest version
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import {
    Card, CardBody,
    CardHeader, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    DropdownItem,
    FormGroup, Label
} from 'reactstrap'
import AddLead from './AddLead'
import 'react-dates/initialize' // necessary for latest version
import moment from 'moment'
import EditTaskTimes from './EditTaskTimes'
import TaskDropdownMenu from './TaskDropdownMenu'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'
import TaskModel from '../models/TaskModel'
import TaskDetails from './TaskDetails'

class EditTask extends Component {
    constructor (props) {
        super(props)

        this.taskModel = new TaskModel(this.props.task, this.props.customers)
        this.initialState = this.taskModel.fields
        this.taskModel.start_date = this.initialState.start_date
        this.taskModel.due_date = this.initialState.due_date

        this.state = this.initialState

        this.handleSave = this.handleSave.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.timerAction = this.timerAction.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
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

    timerAction (e) {
        const data = {
            action: e.target.id
        }

        this.taskModel.timerAction(data).then(response => {
            if (!response) {
                this.setState({ errors: this.taskModel.errors, message: this.taskModel.error_message })
                return
            }

            this.setState({ action: e.target.id })
        })
    }

    getFormData () {
        return {
            customer_id: this.state.customer_id,
            rating: this.state.rating,
            source_type: this.state.source_type,
            valued_at: this.state.valued_at,
            title: this.state.title,
            content: this.state.description,
            contributors: this.state.selectedUsers,
            due_date: moment(this.state.due_date).format('YYYY-MM-DD'),
            start_date: moment(this.state.start_date).format('YYYY-MM-DD'),
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes
        }
    }

    handleSave () {
        this.taskModel.update(this.getFormData()).then(response => {
            if (!response) {
                this.setState({ errors: this.taskModel.errors, message: this.taskModel.error_message })
                return
            }

            const index = this.props.allTasks.findIndex(task => task.id === this.props.task.id)
            this.props.allTasks[index] = response
            this.props.action(this.props.allTasks)
            this.setState({
                editMode: false,
                changesMade: false
            })
            this.toggle()
        })
    }

    handleDelete () {
        this.setState({
            editMode: false
        })
        if (this.props.onDelete) {
            this.props.onDelete(this.props.task)
        }
    }

    handleChange (e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value,
            changesMade: true
        })
    }

    getFormForLead (readOnly = false) {
        const objValues = {
            rating: this.state.rating,
            source_type: this.state.source_type,
            valued_at: this.state.valued_at,
            customer_id: this.state.customer_id
        }

        return (
            <React.Fragment>
                <AddLead
                    readOnly={readOnly}
                    updateValue={this.handleChange} task={objValues}
                />
            </React.Fragment>
        )
    }

    handleMultiSelect (e) {
        this.setState({ selectedUsers: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    render () {
        const leadForm = this.props.task_type === 2 ? this.getFormForLead(true) : ''

        const form = <React.Fragment>
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
                        Times
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">

                    <TaskDropdownMenu model={this.taskModel} id={this.props.task.id} formData={this.getFormData()}/>
                    <Card>
                        <CardHeader>Details</CardHeader>
                        <CardBody>
                            <TaskDetails task={this.state} setTimeRange={this.setTimeRange} customers={this.props.customers}
                                errors={this.state.errors} handleMultiSelect={this.handleMultiSelect}
                                users={this.props.users} handleInput={this.handleChange}/>

                            <FormGroup>
                                <Label>Start / End date</Label>
                                <DateRangePicker
                                    startDate={this.state.start_date} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.due_date} // momentPropTypes.momentObj or null,
                                    endDateId="due_date" // PropTypes.string.isRequired,
                                    displayFormat="DD-MM-YYYY"
                                    onDatesChange={({ startDate, endDate }) => this.setState({
                                        start_date: startDate,
                                        due_date: endDate
                                    })} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                />
                            </FormGroup>

                            {leadForm}

                            <CustomFieldsForm handleInput={this.handleChange} custom_value1={this.state.custom_value1}
                                custom_value2={this.state.custom_value2}
                                custom_value3={this.state.custom_value3}
                                custom_value4={this.state.custom_value4}
                                custom_fields={this.props.custom_fields}/>

                            <Notes private_notes={this.state.private_notes} public_notes={this.state.public_notes}
                                handleInput={this.handleChange}/>
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane tabId="2">
                    <Card>
                        <CardHeader>Details</CardHeader>
                        <CardBody>
                            <EditTaskTimes model={this.taskModel} task_id={this.props.task.id}/>
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
        </React.Fragment>

        const button = this.props.listView && this.props.listView === true
            ? <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
            : null

        return this.props.modal && this.props.modal === true
            ? <React.Fragment>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Task
                    </ModalHeader>

                    <ModalBody>
                        {form}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSave.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment> : form
    }
}

export default EditTask
