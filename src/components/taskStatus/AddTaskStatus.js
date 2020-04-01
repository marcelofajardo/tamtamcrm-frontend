import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import axios from 'axios'

class AddTaskStatus extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            title: '',
            description: '',
            icon: '',
            task_type: 0,
            color: '',
            loading: false,
            errors: []
        }
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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
        axios.post('/api/taskStatus', {
            title: this.state.title,
            description: this.state.description,
            column_color: this.state.column_color,
            task_type: this.state.task_type,
            icon: this.state.icon
        })
            .then((response) => {
                this.toggle()
                const newUser = response.data
                this.props.statuses.push(newUser)
                this.props.action(this.props.statuses)
                this.setState({
                    name: null,
                    color: null
                })
            })
            .catch((error) => {
                alert(error)
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
                <Button color="success" onClick={this.toggle}>Add Role</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Status
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Name(*):</Label>
                            <Input className={this.hasErrorFor('title') ? 'is-invalid' : ''} type="text" name="title"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('title')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description(*):</Label>
                            <Input className={this.hasErrorFor('description') ? 'is-invalid' : ''} type="text"
                                name="description" value={this.state.description}
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('description')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="column_color">Color(*):</Label>
                            <Input className={this.hasErrorFor('column_color') ? 'is-invalid' : ''} type="text"
                                name="column_color" onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('column_color')}
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
                            <Label for="icon">Icon(*):</Label>
                            <Input className={this.hasErrorFor('icon') ? 'is-invalid' : ''} type="text"
                                name="icon" onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('icon')}
                        </FormGroup>
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

export default AddTaskStatus
