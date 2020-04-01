import React from 'react'
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap'
import InvoiceDropdown from '../common/InvoiceDropdown'

const InvoiceLineInputs = (props) => {
    return (
        props.lines.map((val, idx) => {
            return (
                <div key={idx}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Invoice</Label>
                                <InvoiceDropdown
                                    invoices={props.invoices}
                                    data_id={idx}
                                    invoice_id={props.lines[idx].invoice_id}
                                    status={props.status}
                                    handleInputChanges={props.onChange}
                                    name="invoice_id"
                                    errors={props.errors}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Amount</Label>
                                <Input type="text"
                                    data-id={idx}
                                    onChange={props.onChange}
                                    value={props.lines[idx].amount}
                                    name="amount"
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button color="danger" onClick={() => props.removeLine(idx)}>
                        Remove
                    </Button>
                </div>
            )
        })
    )
}
export default InvoiceLineInputs
