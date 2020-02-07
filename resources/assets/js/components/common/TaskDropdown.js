import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

export default class TaskDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tasks: []
        }

        this.getTasks = this.getTasks.bind(this)
    }

    componentDidMount () {
        if (!this.props.tasks || !this.props.tasks.length) {
            this.getTasks()
        } else {
            this.setState({ tasks: this.props.tasks })
        }
    }

    handleChange (value, name) {
        const e = {
            target: {
                id: name,
                name: name,
                value: value.id
            }
        }

        this.props.handleInputChanges(e)
    }

    getTasks () {
        axios.get('/api/tasks')
            .then((r) => {
                this.setState({
                    tasks: r.data
                }, function () {
                    if (!this.props.multiple) {
                        this.state.tasks.unshift({ id: '', title: 'Select Task' })
                    }
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    render () {
        const name = this.props.name && this.props.name ? this.props.name : 'task_id'
        const task = this.props.task ? this.state.tasks.filter(option => option.id === this.props.task) : null

        return (
            <FormGroup className="ml-2">
                <Select
                    className="flex-grow-1"
                    classNamePrefix="select"
                    name={name}
                    value={task}
                    options={this.state.tasks}
                    getOptionLabel={option => option.title}
                    getOptionValue={option => option.id}
                    onChange={(value) => this.handleChange(value, name)}
                />
                {this.props.renderErrorFor('task')}
            </FormGroup>
        )
    }
}
