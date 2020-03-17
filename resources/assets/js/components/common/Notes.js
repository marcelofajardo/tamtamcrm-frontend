import React from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody, TabPane } from 'reactstrap'
import TaxRateDropdown from './TaxRateDropdown'
import DesignDropdown from './DesignDropdown'

export default function Notes (props) {
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
        <Card>
            <CardHeader>Notes</CardHeader>
            <CardBody>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Private Notes</Label>
                    <Input
                        value={props.private_notes}
                        type='textarea'
                        name='private_notes'
                        id='private_notes'
                        onChange={props.handleInput}
                    />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Public Notes</Label>
                    <Input
                        value={props.public_notes}
                        type='textarea'
                        name='public_notes'
                        id='public_notes'
                        onChange={props.handleInput}
                    />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Terms</Label>
                    <Input
                        value={props.terms}
                        type='textarea'
                        name='terms'
                        id='notes'
                        onChange={props.handleInput}
                    />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Footer</Label>
                    <Input
                        value={props.footer}
                        type='textarea'
                        name='footer'
                        id='footer'
                        onChange={props.handleInput}
                    />

                </FormGroup>

            </CardBody>
        </Card>

    )
}
