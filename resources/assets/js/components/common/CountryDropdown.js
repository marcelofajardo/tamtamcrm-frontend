import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

export default class CountryDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            countries: []
        }

        this.getCountries = this.getCountries.bind(this)
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

    componentDidMount () {
        if (!this.props.countries || !this.props.countries.length) {
            this.getCountries()
        } else {
            this.setState({ countries: this.props.countries })
        }
    }

    getCountries () {
        axios.get('/api/countries')
            .then((r) => {
                this.setState({
                    countries: r.data
                }, function () {
                    if (!this.props.multiple) {
                        this.state.countries.unshift({ id: '', name: 'Select Country' })
                    }
                })
            })
            .catch((e) => {
                console.error(e)
            })
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

    render () {
        const country = this.props.country ? this.state.countries.filter(option => option.id === this.props.country) : null

        return (
            <FormGroup className="ml-2">
                <Select
                    placeholder="Select Country"
                    className="flex-grow-1"
                    classNamePrefix="select"
                    name="country_id"
                    value={country}
                    options={this.state.countries}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    onChange={(value) => this.handleChange(value, 'country_id')}
                />
                {this.renderErrorFor('country_id')}
            </FormGroup>
        )
    }
}
