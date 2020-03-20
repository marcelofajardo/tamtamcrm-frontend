import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default function NotesForm (props) {
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

    return (
        <div>
            <FormGroup>
                <Label for="size_id">Size</Label>
                <Input className={hasErrorFor('size_id') ? 'is-invalid' : ''}
                    type="select"
                    id="size_id"
                    value={props.customer.size_id}
                    onChange={props.onChange}
                    name="size_id">
                    <option value="">Size</option>
                    <option value="1">test</option>
                </Input>
                {renderErrorFor('size_id')}
            </FormGroup>

            <FormGroup>
                <Label for="industry_id">Industry</Label>
                <Input className={hasErrorFor('industry_id') ? 'is-invalid' : ''}
                    type="select"
                    id="industry_id"
                    value={props.customer.industry_id}
                    onChange={props.onChange}
                    name="industry_id">
                    <option value="">Industry</option>
                    <option value="1">test</option>
                </Input>
                {renderErrorFor('industry_id')}
            </FormGroup>
        </div>

    )
}
