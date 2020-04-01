import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import CustomerDropdown from '../common/CustomerDropdown'

export default class TaskDetails extends React.Component {
    constructor (props) {
        super(props)

        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    hasErrorFor (field) {
        return !!this.props.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            )
        }
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
                    value={this.props.task.selectedUsers}
                    name="contributors" id="contributors" onChange={this.props.handleMultiSelect}>
                    {userContent}
                </Input>
                {this.renderErrorFor('contributors')}
            </FormGroup>
        )
    }

    render () {
        const userOptions = this.buildUserOptions()
        return (
            <React.Fragment>
                <FormGroup>
                    <Label for="title">Task Title(*):</Label>
                    <Input className={this.hasErrorFor('title') ? 'is-invalid' : ''} type="text" name="title"
                        value={this.props.task.title}
                        id="taskTitle" onChange={this.props.handleInput.bind(this)}/>
                    {this.renderErrorFor('title')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Customer</Label>
                    <CustomerDropdown
                        customer={this.props.task.customer_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleInput}
                        customers={this.props.customers}
                    />
                    {this.renderErrorFor('customer_id')}
                </FormGroup>

                <FormGroup>
                    <Label for="content">Task Details:</Label>
                    <Input className={this.hasErrorFor('content') ? 'is-invalid' : ''} type="textarea"
                        name="content" value={this.props.task.content} id="content"
                        onChange={this.props.handleInput.bind(this)}/>
                    {this.renderErrorFor('content')}
                </FormGroup>

                {userOptions}

            </React.Fragment>
        )
    }
}
