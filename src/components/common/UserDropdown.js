import React, { Component } from 'react'
import axios from 'axios'
import { Input, FormGroup } from 'reactstrap'
import Select from 'react-select'

export default class UserDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            users: []
        }

        this.getUsers = this.getUsers.bind(this)
    }

    componentDidMount () {
        if (!this.props.users || !this.props.users.length) {
            this.getUsers()
        } else {
            this.setState({ users: this.props.users })
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

    getUsers () {
        axios.get('/api/users')
            .then((r) => {
                this.setState({
                    users: r.data
                }, function () {
                    if (!this.props.multiple) {
                        this.state.users.unshift({ id: '', first_name: 'Select User', last_name: '' })
                    }
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    multiple (userList, name) {
        return (
            <Input value={this.props.user} onChange={this.props.handleInputChanges} type="select" multiple="multiple"
                name={name} id={name}>
                {userList}
            </Input>
        )
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

    single (userList, name) {
        const user = this.props.user_id ? this.state.users.filter(option => option.id === this.props.user_id) : null

        return (
            <Select value={user}
                id={name}
                className="flex-grow-1"
                classNamePrefix="select"
                name={name}
                options={this.state.users} getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                getOptionValue={option => option.id}
                onChange={(value) => this.handleChange(value, name)}
            />
        )
    }

    render () {
        let userList = null
        if (!this.state.users.length) {
            userList = <option value="">Loading...</option>
        } else {
            userList = this.state.users.map((user, index) => (
                <option key={index} value={user.id}>{user.first_name} {user.last_name}</option>
            ))
        }

        const name = this.props.name && this.props.name ? this.props.name : 'user_id'
        const input = this.props.multiple && this.props.multiple === true ? this.multiple(userList, name) : this.single(userList, name)

        return (
            <FormGroup className="ml-2">
                {input}
                {this.renderErrorFor('user_id')}
            </FormGroup>
        )
    }
}
