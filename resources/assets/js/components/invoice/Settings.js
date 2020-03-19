import React from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap'
import TaxRateDropdown from '../common/TaxRateDropdown'
import DesignDropdown from '../common/DesignDropdown'

export default function Settings (props) {
    return (
        <Card>
            <CardHeader>Items</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label>Tax</Label>
                    <TaxRateDropdown
                        name="tax"
                        handleInputChanges={props.handleInput}
                        errors={props.errors}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Discount</Label>
                    <Input
                        value={props.discount}
                        type='text'
                        name='discount'
                        id='discount'
                        onChange={props.handleInput}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Design</Label>
                    <DesignDropdown name="design_id" design={props.design_id} handleChange={props.handleInput}/>
                </FormGroup>
            </CardBody>
        </Card>

    )
}
