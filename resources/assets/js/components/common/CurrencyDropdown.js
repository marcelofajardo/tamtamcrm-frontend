import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

export default class CurrencyDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currencies: []
        }

        this.getCurrencies = this.getCurrencies.bind(this)
    }

    componentDidMount () {
        if (!this.props.currencies || !this.props.currencies.length) {
            this.getCurrencies()
        } else {
            this.setState({ currencies: this.props.currencies })
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

    getCurrencies () {
        axios.get('/api/currencies')
            .then((r) => {
                this.setState({
                    currencies: r.data
                }, function () {
                    if (!this.props.multiple) {
                        this.state.currencies.unshift({ id: '', name: 'Select Currency' })
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
        const currency = this.props.currency_id ? this.state.currencies.filter(option => option.id === this.props.currency_id) : null
        const name = this.props.name ? this.props.name : 'currency_id'
        return (
            <FormGroup className="ml-2">
                <Select
                    placeholder="Select Currency"
                    className="flex-grow-1"
                    classNamePrefix="select"
                    name={name}
                    value={currency}
                    options={this.state.currencies}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    onChange={(value) => this.handleChange(value, name)}
                />
                {this.renderErrorFor(name)}
            </FormGroup>
        )
    }
}
