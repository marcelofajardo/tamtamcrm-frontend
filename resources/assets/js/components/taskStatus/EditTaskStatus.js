import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import axios from 'axios'

class EditTaskStatus extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            errors: [],
            id: this.props.status.id,
            title: this.props.status.title,
            description: this.props.status.description,
            task_type: this.props.status.task_type,
            icon: this.props.status.icon,
            column_color: this.props.status.column_color,
            role: []
        }
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
    }

    handleInput (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleMultiSelect (e) {
        this.setState({ attachedPermissions: Array.from(e.target.selectedOptions, (item) => item.value) })
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
        const objTaskStatus = {
            title: this.state.title,
            description: this.state.description,
            task_type: this.state.task_type,
            icon: this.state.icon,
            column_color: this.state.column_color
        }

        axios.put(`/api/taskStatus/${this.state.id}`, objTaskStatus)
            .then((response) => {
                this.toggle()
                const index = this.props.statuses.findIndex(status => status.id === this.props.status.id)
                this.props.statuses[index] = response.data
                this.props.action(this.props.statuses)
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    render () {
        return (
            <React.Fragment>
                <Button color="success" onClick={this.toggle}>Update</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Task Status
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Name(*):</Label>
                            <Input className={this.hasErrorFor('title') ? 'is-invalid' : ''} type="text" name="title"
                                value={this.state.title} onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('title')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="icon">Icon(*):</Label>
                            <Input className={this.hasErrorFor('icon') ? 'is-invalid' : ''} type="text"
                                name="icon" value={this.state.icon}
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('icon')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description(*):</Label>
                            <Input className={this.hasErrorFor('description') ? 'is-invalid' : ''} type="text"
                                name="description" value={this.state.description}
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('description')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="task_type">Task Type(*):</Label>
                            <Input className={this.hasErrorFor('task_type') ? 'is-invalid' : ''} type="select"
                                name="task_type" value={this.state.task_type}
                                onChange={this.handleInput.bind(this)}>
                                <option value="">Select...</option>
                                <option value="1">Task</option>
                                <option value="2">Lead</option>
                                <option value="3">Deal</option>
                            </Input>
                            {this.renderErrorFor('task_type')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="column_color">Color(*):</Label>
                            <Input className={this.hasErrorFor('column_color') ? 'is-invalid' : ''} type="text"
                                name="column_color" value={this.state.column_color}
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('column_color')}
                        </FormGroup>

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

export default EditTaskStatus
