import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import {
    Button,
    FormGroup,
    Input,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'

class EditTaskTimes extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            currentIndex: null,
            showSuccess: false,
            showError: false,
            times: [{ date: '02/02/2020', start_time: '10:00:00', end_time: '15:00:00' }],
            visible: 'collapse',
            dropdownOpen: false,
            dropdown2Open: true
        }

        this.model = this.props.model
        this.model.time_log = this.state.times
        this.handleSlideClick = this.handleSlideClick.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.addTaskTime = this.addTaskTime.bind(this)
    }

    handleSlideClick (index) {
        this.setState({
            currentIndex: index,
            dropdownOpen: !this.state.dropdownOpen,
            dropdown2Open: !this.state.dropdown2Open
        })
    }

    closeForm () {
        this.setState({
            currentIndex: null,
            dropdownOpen: !this.state.dropdownOpen,
            dropdown2Open: !this.state.dropdown2Open
        })
    }

    handleChange (e) {
        const times = this.model.updateTaskTime(e.target.dataset.id, e.target.name, e.target.value)
        this.setState({ times: times })
        console.log('times', times)
    }

    handleDelete (idx) {
        const times = this.model.deleteTaskTime(idx)

        this.setState({
            times: times
        }, () => {
            this.closeForm()
            this.handleSave(true)
        })
    }

    addTaskTime () {
        const times = this.model.addTaskTime()
        this.setState({ times: times })
    }

    handleSave (isDelete = false) {
        axios.put(`/api/tasks/timer/${this.props.task_id}`, {
            time_log: this.state.times
        })
            .then((response) => {
                this.setState({ showSuccess: true, showError: false })

                if (isDelete === false) {
                    this.closeForm()
                }
            })
            .catch((error) => {
                this.setState({
                    showSuccess: false,
                    showError: true,
                    err: error.response.data.errors
                })
            })
    }

    render () {
        const { model } = this.props
        const { currentIndex, times, showSuccess, showError } = this.state
        const timeList = times.length ? times.map((time, index) => {
            return <div key={index}
                className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{time.date}</h5>
                    <small>{model.calculateDuration(time.start_time, time.end_time)}</small>
                    <i onClick={() => this.handleSlideClick(index)} className="fa fa-arrow-right"/>
                </div>
                <p className="mb-1">{`${time.start_time} - ${time.end_time}`}</p>
            </div>
        }) : <h2>No times added</h2>

        const showSuccessMessage = showSuccess === true ? <SuccessMessage message="Times updated successfully"/> : null
        const showErrorMessage = showError === true
            ? <ErrorMessage message="Times could not be updated successfully"/> : null

        const currentData = currentIndex !== null ? times[currentIndex] : null

        const form = currentData && Object.keys(currentData).length ? <React.Fragment>
            <FormGroup>
                <Label>Date</Label>
                <Input data-id={currentIndex} value={moment(currentData.date).format('YYYY-MM-DD')} name="date"
                    type="date"
                    onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
                <Label>Start Time</Label>
                <Input data-id={currentIndex} value={currentData.start_time} type="text" name="start_time"
                    onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
                <Label>End Time</Label>
                <Input data-id={currentIndex} value={currentData.end_time} type="text" name="end_time"
                    onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
                <Label>Duration</Label>
                <Input data-id={currentIndex}
                    value={model.calculateDuration(currentData.start_time, currentData.end_time)}
                    type="text" name="duration" onChange={this.handleChange}/>
            </FormGroup>

            <Button color="primary" onClick={this.handleSave}>Done</Button>
            <Button color="danger" onClick={() => this.handleDelete(currentIndex)}>Remove</Button>
        </React.Fragment> : null

        return (
            <React.Fragment>
                {showSuccessMessage}
                {showErrorMessage}
                <div className={`list-group ${this.state.dropdown2Open ? 'collapse show' : 'collapse'}`}>
                    {timeList}
                    <Button color="primary" onClick={this.addTaskTime}>Add</Button>
                </div>

                <div className={this.state.dropdownOpen ? 'collapse show' : 'collapse'}>
                    <Card>
                        <CardHeader>Update</CardHeader>
                        <CardBody>
                            {form}
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default EditTaskTimes
