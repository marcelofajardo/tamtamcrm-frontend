import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import CountryDropdown from '../common/CountryDropdown'

export default class AddressForm extends React.Component {
    constructor (props) {
        super(props)

        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    hasErrorFor (field) {
        return !this.props.errors || !!this.props.errors[field]
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

    render () {
        return (<Card>
            <CardHeader>Address</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label for="address_1">Address(*):</Label>
                    <Input className={this.hasErrorFor('address_1') ? 'is-invalid' : ''}
                        placeholder="Address"
                        type="text"
                        name="address_1"
                        value={this.props.company.address_1}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('address_1')}
                </FormGroup>

                <FormGroup>
                    <Label for="address_2">Address 2:</Label>
                    <Input className={this.hasErrorFor('address_2') ? 'is-invalid' : ''}
                        placeholder="Address"
                        type="text"
                        name="address_2"
                        value={this.props.company.address_2}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('address_2')}
                </FormGroup>

                <FormGroup>
                    <Label for="town">Town(*):</Label>
                    <Input className={this.hasErrorFor('town') ? 'is-invalid' : ''}
                        placeholder="Town"
                        type="text"
                        name="town"
                        value={this.props.company.town}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('town')}
                </FormGroup>

                <FormGroup>
                    <Label for="city">City(*):</Label>
                    <Input className={this.hasErrorFor('city') ? 'is-invalid' : ''}
                        placeholder="City"
                        type="text"
                        name="city"
                        value={this.props.company.city}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('city')}
                </FormGroup>

                <FormGroup>
                    <Label for="postcode">Postcode(*):</Label>
                    <Input className={this.hasErrorFor('postcode') ? 'is-invalid' : ''}
                        placeholder="Postcode"
                        type="text"
                        name="postcode"
                        value={this.props.company.postcode}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('postcode')}
                </FormGroup>

                <FormGroup>
                    <Label for="postcode">Country(*):</Label>
                    <CountryDropdown
                        country={this.props.company.country_id}
                        errors={this.props.errors}
                        handleInputChanges={this.props.handleInput.bind(this)}
                    />
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
