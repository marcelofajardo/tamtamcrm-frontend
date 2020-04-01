import React from 'react'
import { DateRangePicker } from 'react-dates'
import {
    Button,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, FormGroup, Label
} from 'reactstrap'
import moment from 'moment'
import AddLead from './AddLead'
import AddButtons from '../common/AddButtons'
import CustomFieldsForm from '../common/CustomFieldsForm'
import Notes from '../common/Notes'
import TaskModel from '../models/TaskModel'
import TaskDetails from './TaskDetails'

class AddModal extends React.Component {
    constructor (props) {
        super(props)

        this.taskModel = new TaskModel(null, this.props.customers)
        this.initialState = this.taskModel.fields
        this.taskModel.start_date = this.initialState.start_date
        this.taskModel.due_date = this.initialState.due_date

        this.state = this.initialState
        this.toggle = this.toggle.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.buildForm = this.buildForm.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'taskForm')) {
            // const storedValues = JSON.parse(localStorage.getItem('taskForm'))
            // this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    handleInput (e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value
        }, () => localStorage.setItem('taskForm', JSON.stringify(this.state)))
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState(this.initialState, () => localStorage.removeItem('taskForm'))
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

        const data = {
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
            parent_id: this.props.task_id ? this.props.task_id : 0,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes
        }

        this.taskModel.save(data).then(response => {
            if (!response) {
                this.setState({ errors: this.taskModel.errors, message: this.taskModel.error_message })
                return
            }
            this.props.tasks.push(response)
            this.props.action(this.props.tasks)
            this.setState(this.initialState)
            localStorage.removeItem('taskForm')
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
        return (
            <Form>
                <TaskDetails task={this.state} setTimeRange={this.setTimeRange} customers={this.props.customers}
                    errors={this.state.errors} handleMultiSelect={this.handleMultiSelect}
                    users={this.props.users} handleInput={this.handleInput}/>

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

                <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                    custom_value2={this.state.custom_value2}
                    custom_value3={this.state.custom_value3}
                    custom_value4={this.state.custom_value4}
                    custom_fields={this.props.custom_fields}/>

                <Notes private_notes={this.state.private_notes} public_notes={this.state.public_notes}
                    handleInput={this.handleInput}/>

            </Form>
        )
    }

    handleMultiSelect (e) {
        this.setState({ selectedUsers: Array.from(e.target.selectedOptions, (item) => item.value) })
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
