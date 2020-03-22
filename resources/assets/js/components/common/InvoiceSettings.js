import React from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody, Row, Col } from 'reactstrap'
import TaxRateDropdown from '../common/TaxRateDropdown'
import DesignDropdown from '../common/DesignDropdown'

export default function InvoiceSettings (props) {
    console.log('settings', props.settings)
    return (
        <Card>
            <CardHeader>Items</CardHeader>
            <CardBody>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 1</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge1" id="exampleEmail" placeholder="with a placeholder" value={props.settings.custom_surcharge1} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Custom Surcharge Tax 1</Label>
                            <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax1" id="examplePassword" checked={props.settings.custom_surcharge_tax1} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 2</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge2" id="exampleEmail" value={props.settings.custom_surcharge2} placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Custom Surcharge Tax 2</Label>
                            <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax2" id="examplePassword" checked={props.settings.custom_surcharge_tax2} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 3</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge3" id="exampleEmail" placeholder="with a placeholder" value={props.settings.custom_surcharge3} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Custom Surcharge Tax 3</Label>
                            <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax3" id="examplePassword" checked={props.settings.custom_surcharge_tax3} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 4</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge4" id="exampleEmail" value={props.settings.custom_surcharge4} placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Custom Surcharge Tax 4</Label>
                            <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax4" id="examplePassword" checked={props.settings.custom_surcharge_tax4} />
                        </FormGroup>
                    </Col>
                </Row>
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
