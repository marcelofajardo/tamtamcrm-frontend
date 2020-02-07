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
    const customForm = customFields && customFields.length ? <FormBuilder
        handleChange={props.onChange}
        formFieldsRows={customFields}
    /> : null

    return (
        <Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label for="first_name"> First Name </Label>
                    <Input className={hasErrorFor('first_name') ? 'is-invalid' : ''} type="text"
                        id="first_name" defaultValue={props.customer.first_name}
                        onChange={props.onChange} name="first_name"
                        placeholder="Enter customer's first name"/>
                    {renderErrorFor('first_name')}
                </FormGroup>

                <FormGroup>
                    <Label for="last_name"> Last Name </Label>
                    <Input className={hasErrorFor('last_name') ? 'is-invalid' : ''} type="text"
                        id="last_name" defaultValue={props.customer.last_name}
                        onChange={props.onChange} name="last_name"
                        placeholder="Enter customer's last name"/>
                    {renderErrorFor('last_name')}
                </FormGroup>

                <FormGroup>
                    <Label for="email"> Email </Label>
                    <Input className={hasErrorFor('email') ? 'is-invalid' : ''} type="email" id="email"
                        defaultValue={props.customer.email}
                        onChange={props.onChange} name="email"
                        placeholder="Enter customer's email address"/>
                    {renderErrorFor('email')}
                </FormGroup>

                <FormGroup>
                    <Label for="phone"> Phone </Label>
                    <Input className={hasErrorFor('phone') ? 'is-invalid' : ''} type="text" id="phone"
                        defaultValue={props.customer.phone}
                        onChange={props.onChange} name="phone"
                        placeholder="Enter customer's phone number"/>
                    {renderErrorFor('phone')}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="job_title"> Job Title </Label>
                    <Input className={hasErrorFor('job_title') ? 'is-invalid' : ''} type="text" id="job_title"
                        defaultValue={props.customer.job_title}
                        onChange={props.onChange} name="job_title"
                        placeholder="Enter Job Title"/>
                    {renderErrorFor('job_title')}
                </FormGroup>

                {customForm}
            </CardBody>
        </Card>

    )
}