import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

export default class CompanyDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            companies: []
        }

        this.getCompanies = this.getCompanies.bind(this)
    }

    componentDidMount () {
        if (!this.props.companies || !this.props.companies.length) {
            this.getCompanies()
        } else {
            this.props.companies.unshift({ id: '', name: 'Select Company' })
            this.setState({ companies: this.props.companies })
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

    getCompanies () {
        axios.get('/api/companies')
            .then((r) => {
                this.setState({
                    companies: r.data
                }, function () {
                    if (!this.props.multiple) {
                        this.state.companies.unshift({ id: '', name: 'Select Company' })
                    }
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    render () {
        const name = this.props.name && this.props.name ? this.props.name : 'company_id'
        const company = this.props.company_id ? this.state.companies.filter(option => option.id === this.props.company_id) : null

        return (
            <FormGroup className="mr-2">
                <Select value={company}
                    placeholder="Select Company"
                    className="flex-grow-1"
                    classNamePrefix="select"
                    name={name}
                    options={this.state.companies}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    onChange={(value) => this.handleChange(value, name)}
                />
                {this.renderErrorFor('company_id')}
            </FormGroup>
        )
    }
}
