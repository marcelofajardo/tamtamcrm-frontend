/* eslint-disable no-unused-vars */
import React from 'react'
import { Input, FormGroup, Label } from 'reactstrap'

class ProductAttribute extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            range_from: 0,
            range_to: 0,
            payable_months: 12,
            minimum_downpayment: 0,
            number_of_years: 0,
            interest_rate: 0,
            loading: false,
            errors: []
        }

        this.state = { ...this.state, ...this.props.values }
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
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

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.onChange(e)
    }

    render () {
        return (
            <React.Fragment>

                <FormGroup>
                    <Label for="range_from">Range From:</Label>
                    <Input value={this.state.range_from}
                        className={this.hasErrorFor('range_from') ? 'is-invalid' : ''}
                        type="number"
                        name="range_from" onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('range_from')}
                </FormGroup>

                <FormGroup>
                    <Label for="range_to">Range To:</Label>
                    <Input className={this.hasErrorFor('range_to') ? 'is-invalid' : ''}
                        value={this.state.range_to}
                        type="number"
                        name="range_to"
                        onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('range_to')}
                </FormGroup>

                <FormGroup>
                    <Label for="minimum_downpayment">Minimum Downpayment:</Label>
                    <Input className={this.hasErrorFor('minimum_downpayment') ? 'is-invalid' : ''}
                        type="number"
                        name="minimum_downpayment"
                        value={this.state.minimum_downpayment}
                        onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('minimum_downpayment')}
                </FormGroup>

                <FormGroup>
                    <Label for="number_of_years">Number of years:</Label>
                    <Input className={this.hasErrorFor('number_of_years') ? 'is-invalid' : ''}
                        type="number"
                        name="number_of_years"
                        value={this.state.number_of_years}
                        onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('number_of_years')}
                </FormGroup>

                <FormGroup>
                    <Label for="payable_months">Months to Repay:</Label>
                    <Input className={this.hasErrorFor('payable_months') ? 'is-invalid' : ''}
                        type="number"
                        name="payable_months"
                        value={this.state.payable_months}
                        onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('payable_months')}
                </FormGroup>

                <FormGroup>
                    <Label for="interest_rate">Interest Rate:</Label>
                    <Input className={this.hasErrorFor('interest_rate') ? 'is-invalid' : ''}
                        value={this.state.interest_rate}
                        type="number"
                        name="interest_rate"
                        onChange={this.handleInput.bind(this)}/>
                    {this.renderErrorFor('interest_rate')}
                </FormGroup>
            </React.Fragment>
        )
    }
}

export default ProductAttribute
