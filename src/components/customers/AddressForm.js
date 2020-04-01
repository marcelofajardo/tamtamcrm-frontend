import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import CountryDropdown from '../common/CountryDropdown'

export default function AddressForm (props) {
    const hasErrorFor = (field) => {
        return props.errors && !!props.errors[field]
    }

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{props.errors[field][0]}</strong>
                </span>
            )
        }
    }

    // console.log('address', props.customer)
    // const country_id = props.customer.country_id ? props.customer.country_id : 225

    return (
        <div>
            <FormGroup>
                <Label for="address"> Address 1 </Label>
                <Input className={hasErrorFor('address_1') ? 'is-invalid' : ''} type="text"
                    id="address_1" value={props.customer.address_1}
                    onChange={props.onChange} name="address_1"
                    placeholder="Enter customer's address"/>
                {renderErrorFor('address_1')}
            </FormGroup>

            <FormGroup>
                <Label for="address"> Address 2 </Label>
                <Input className={hasErrorFor('address_2') ? 'is-invalid' : ''} type="text"
                    id="address_2" value={props.customer.address_2}
                    onChange={props.onChange} name="address_2"
                    placeholder="Enter customer's address"/>
                {renderErrorFor('address_2')}
            </FormGroup>

            <FormGroup>
                <Label for="postcode"> Postcode </Label>
                <Input className={hasErrorFor('zip') ? 'is-invalid' : ''} type="text" id="zip"
                    value={props.customer.zip}
                    onChange={props.onChange} name="zip"
                    placeholder="Enter customer's postcode"/>
                {renderErrorFor('zip')}
            </FormGroup>

            <FormGroup>
                <Label htmlFor="city"> City </Label>
                <Input className={hasErrorFor('city') ? 'is-invalid' : ''} type="text" id="city"
                    value={props.customer.city}
                    onChange={props.onChange} name="city"
                    placeholder="Enter customer's city"/>
                {renderErrorFor('city')}
            </FormGroup>

            <CountryDropdown
                country={props.customer.country_id}
                errors={props.errors}
                handleInputChanges={props.onChange}
            />
        </div>

    )
}
