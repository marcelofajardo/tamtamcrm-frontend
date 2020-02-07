import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form } from 'reactstrap'
import moment from 'moment'
import axios from 'axios'
import AddLead from './AddLead'
import FormBuilder from '../accounts/FormBuilder'
import 'react-dates/initialize' // necessary for latest version
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import AddButtons from '../common/AddButtons'

class AddModal extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            title: '',
            rating: '',
            source_type: 0,
            valued_at: '',
            customer_id: null,
            content: '',
            contributors: '',
            created_by: '5af1921c0fe5703dd4a463ec',
            due_date: '',
            start_date: '',
            task_status: parseInt(this.props.status),
            project_id: this.props.storyType ? parseInt(this.props.storyType) : 0,
            loading: false,
            users: [],
            errors: [],
            submitSuccess: false,
            selectedUsers: []
        }
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.buildForm = this.buildForm.bind(this)
        this.buildUserOptions = this.buildUserOptions.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
    }

    componentDidMount () {
        if (localStorage.hasOwnProperty('taskForm')) {
            const storedValues = JSON.parse(localStorage.getItem('taskForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
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

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => localStorage.setItem('taskForm', JSON.stringify(this.state)))
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    title: '',
                    rating: '',
                    source_type: 0,
                    valued_at: '',
                    customer_id: null,
                    content: '',
                    contributors: '',
                    created_by: '5af1921c0fe5703dd4a463ec',
                    due_date: '',
                    start_date: '',
                }, () => localStorage.removeItem('taskForm'))
            }
        })
    }

    changeColumnTitle (number) {
        let newTitle
        if (number === 1) {
            newTitle = 'Backlog'
        } else if (number === 2) {
            newTitle = 'ToDo'
        } else if (number === 3) {
            newTitle = 'In Progress'
        } else {
            newTitle = 'Done'
        }
        return newTitle
    }

    handleClick (event) {
        this.setState({
            submitSuccess: false,
            loading: true
        })

        axios.post('/api/tasks', {
            rating: this.state.rating,
            source_type: this.state.source_type,
            valued_at: this.state.valued_at,
            customer_id: this.state.customer_id,
            title: this.state.title,
            content: this.state.content,
            task_status: parseInt(this.props.status),
            contributors: this.state.selectedUsers,
            due_date: moment(this.state.due_date).format('YYYY-MM-DD'),
            start_date: moment(this.state.start_date).format('YYYY-MM-DD'),
            project_id: parseInt(this.props.project_id),
            created_by: this.state.created_by,
            task_type: this.props.task_type,
            parent_id: this.props.task_id ? this.props.task_id : 0
        })
            .then((response) => {
                this.toggle()
                this.setState({
                    title: '',
                    rating: '',
                    source_type: 0,
                    valued_at: '',
                    customer_id: null,
                    content: '',
                    contributors: '',
                    created_by: '5af1921c0fe5703dd4a463ec',
                    due_date: '',
                    start_date: '',
                    loading: false,
                    submitSuccess: true
                })

                if (this.props.action) {
                    const firstTask = response.data
                    this.props.tasks.push(firstTask)
                    this.props.action(this.props.tasks)
                }
                localStorage.removeItem('taskForm')
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    getFormForLead () {
        return (
            <React.Fragment>
                <AddLead updateValue={this.handleInput}/>
            </React.Fragment>
        )
    }

    buildForm () {
        const userOptions = this.buildUserOptions()
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

        return (
            <Form>
                <FormGroup>
                    <Label for="title">Task Title(*):</Label>
                    <Input className={this.hasErrorFor('title') ? 'is-invalid' : ''} type="text" name="title"
                        value={this.state.title}
                        id="taskTitle" onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('title')}
                </FormGroup>

                <FormGroup>
                    <Label for="content">Task Details:</Label>
                    <Input className={this.hasErrorFor('content') ? 'is-invalid' : ''} type="textarea"
                        name="content" value={this.state.content} id="content"
                        onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('content')}
                </FormGroup>

                {userOptions}

                <i className="fa fa-calendar-alt"/> Created Date: {moment().format('L, h:mm:ss')} <br/>

                <DateRangePicker
                    startDate={this.state.start_date} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.due_date} // momentPropTypes.momentObj or null,
                    endDateId="due_date" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({
                        start_date: startDate,
                        due_date: endDate
                    })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />

                {customForm}

            </Form>
        )
    }

    handleMultiSelect (e) {
        this.setState({ selectedUsers: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    buildUserOptions () {
        let userContent
        if (!this.props.users) {
            userContent = <option value="">Loading...</option>
        } else {
            userContent = this.props.users.map((user, index) => (
                <option key={index} value={user.id}>{user.first_name + ' ' + user.last_name}</option>
            ))
        }

        return (
            <FormGroup>
                <Label for="contributors">Assign to:</Label>
                <Input className={this.hasErrorFor('contributors') ? 'is-invalid' : ''} multiple
                    type="select"
                    value={this.state.selectedUsers}
                    name="contributors" id="contributors" onChange={this.handleMultiSelect.bind(this)}>
                    {userContent}
                </Input>
                {this.renderErrorFor('contributors')}
            </FormGroup>
        )
    }

    render () {
        const leadForm = this.props.task_type === 2 || this.props.task_type === 3 ? this.getFormForLead() : ''
        const form = this.buildForm()
        const saveButton = <Button color="primary" onClick={this.handleClick.bind(this)}> Add</Button>

        if (this.props.modal) {
            return (
                <div>
                    <AddButtons toggle={this.toggle}/>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>
                            Create a New Task to {this.changeColumnTitle(this.props.status)}
                        </ModalHeader>

                        <ModalBody>
                            {form}
                            {leadForm}
                        </ModalBody>

                        <ModalFooter>
                            {saveButton}
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }

        return (
            <div>
                {this.state.submitSuccess && (
                    <div className="mt-3 alert alert-info" role="alert">
                        The event has been created successfully </div>
                )}
                {form}
                {leadForm}
                {saveButton}
            </div>
        )
    }
}

export default AddModal
