import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import {
    Card, CardBody, CardHeader
} from 'reactstrap'
import FormBuilder from '../accounts/FormBuilder'

export default function CustomerForm (props) {
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

    const customFields = props.custom_fields ? props.custom_fields : []

    if (customFields[0] && Object.keys(customFields[0]).length) {
        customFields[0].forEach((element, index, array) => {
            if (props.customer[element.name] && props.customer[element.name].length) {
                customFields[0][index].value = props.customer[element.name]
            }
        })
    }

    const customForm = customFields && customFields.length ? <FormBuilder
        handleChange={props.onChange}
        formFieldsRows={customFields}
    /> : null

    return (
        <Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label for="name"> Name </Label>
                    <Input className={hasErrorFor('name') ? 'is-invalid' : ''} type="text"
                        id="name" defaultValue={props.customer.name}
                        onChange={props.onChange} name="name"
                        placeholder="Name"/>
                    {renderErrorFor('name')}
                </FormGroup>

                <FormGroup>
                    <Label for="phone"> Phone </Label>
                    <Input className={hasErrorFor('phone') ? 'is-invalid' : ''} type="text" id="phone"
                        defaultValue={props.customer.phone}
                        onChange={props.onChange} name="phone"
                        placeholder="Phone Number"/>
                    {renderErrorFor('phone')}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="website"> Website </Label>
                    <Input className={hasErrorFor('website') ? 'is-invalid' : ''}
                        type="text"
                        id="website"
                        defaultValue={props.customer.website}
                        onChange={props.onChange}
                        name="website"
                        placeholder="Website"/>
                    {renderErrorFor('website')}
                </FormGroup>

                <FormGroup>
                    <Label for="name"> Vat Number </Label>
                    <Input className={hasErrorFor('vat_number') ? 'is-invalid' : ''} type="text"
                        id="name" defaultValue={props.customer.vat_number}
                        onChange={props.onChange} name="vat_number"
                        placeholder="VAT Number"/>
                    {renderErrorFor('vat_number')}
                </FormGroup>

                {customForm}
            </CardBody>
        </Card>

    )
}
