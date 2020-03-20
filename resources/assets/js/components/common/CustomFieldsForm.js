import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import FormBuilder from '../accounts/FormBuilder'

export default function CustomFieldsForm (props) {
    const customFields = props.custom_fields ? props.custom_fields : []

    if (customFields[0] && Object.keys(customFields[0]).length) {
        customFields[0].forEach((element, index, array) => {
            if (props[element.name] && props[element.name].length) {
                customFields[0][index].value = props[element.name]
            }
        })
    }

    return customFields && customFields.length
        ? <Card>
            <CardHeader>Custom Fields</CardHeader>
            <CardBody>
                <FormBuilder
                    handleChange={props.handleInput.bind(this)}
                    formFieldsRows={customFields}
                />
            </CardBody>
        </Card> : null
}
