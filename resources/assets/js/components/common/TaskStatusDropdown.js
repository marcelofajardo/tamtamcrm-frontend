import React, { Component } from 'react'
import axios from 'axios'
import { Input, FormGroup } from 'reactstrap'

export default class TaskStatusDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            statuses: []
        }

        this.getStatuses = this.getStatuses.bind(this)
    }

    componentDidMount () {
        if (!this.props.statuses || !this.props.statuses.length) {
            this.getStatuses()
        } else {
            this.setState({ statuses: this.props.statuses })
        }
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback d-block'>
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            )
        }
    }

    hasErrorFor (field) {
        return this.props.errors && !!this.props.errors[field]
    }

    getStatuses () {
        axios.get(`/api/status/${this.props.task_type}`)
            .then((r) => {
                this.setState({
                    statuses: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    render () {
        let statusList = null
        if (!this.state.statuses.length) {
            statusList = <option value="">Loading...</option>
        } else {
            statusList = this.state.statuses.map((status, index) => (
                <option key={index} value={status.id}>{status.title}</option>
            ))
        }

        return (
            <FormGroup className="ml-2">
                <Input value={this.props.status} onChange={this.props.handleInputChanges} type="select"
                    name="task_status" id="task_status">
                    <option value="">Select Status</option>
                    {statusList}
                    <option value="archived">Archived</option>
                    <option value="deleted">Deleted</option>
                </Input>
                {this.renderErrorFor('task_status')}
            </FormGroup>
        )
    }
}
