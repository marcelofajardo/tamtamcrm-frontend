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
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge1" id="custom_surcharge1" placeholder="with a placeholder" value={props.settings.custom_surcharge1} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup check>
                            <Label check for="examplePassword">
                                <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax1" id="examplePassword" checked={props.settings.custom_surcharge_tax1} />
                                Custom Surcharge Tax 1
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 2</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge2" id="custom_surcharge2" value={props.settings.custom_surcharge2} placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup check>
                            <Label check for="examplePassword">
                                <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax2" id="custom_surcharge_tax2" checked={props.settings.custom_surcharge_tax2} />
                                Custom Surcharge Tax 2
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 3</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge3" id="custom_surcharge3" placeholder="with a placeholder" value={props.settings.custom_surcharge3} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup check>
                            <Label check for="examplePassword">
                                <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax3" id="custom_surcharge_tax3" checked={props.settings.custom_surcharge_tax3} />
                                Custom Surcharge Tax 3
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Custom Surcharge 4</Label>
                            <Input onChange={props.handleSurcharge} type="text" name="custom_surcharge4" id="custom_surcharge4" value={props.settings.custom_surcharge4} placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup check>
                            <Label check for="examplePassword">
                                <Input onChange={props.handleSurcharge} type="checkbox" name="custom_surcharge_tax4" id="custom_surcharge_tax4" checked={props.settings.custom_surcharge_tax4} />
                                Custom Surcharge Tax 4
                            </Label>
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

                <Row form>
                    <Col>
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
                    </Col>

                    <Col>
                        <FormGroup>
                            <Label>Discount Type</Label>
                            <Input
                                bsSize="sm"
                                value={props.is_amount_discount}
                                type='select'
                                name='is_amount_discount'
                                id='is_amount_discount'
                                onChange={props.handleInput}
                            >
                                <option value="false">Percent</option>
                                <option value="true">Amount</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label>Design</Label>
                    <DesignDropdown name="design_id" design={props.design_id} handleChange={props.handleInput}/>
                </FormGroup>
            </CardBody>
        </Card>

    )
}
