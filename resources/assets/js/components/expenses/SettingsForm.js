import React from 'react'
import {
    Button,
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader,
    Collapse,
    Col,
    Row
} from 'reactstrap'
import CurrencyDropdown from '../common/CurrencyDropdown'
import FormBuilder from '../accounts/FormBuilder'
import PaymentTypeDropdown from '../common/PaymentTypeDropdown'

export default class SettingsForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            currencyOpen: false,
            paymentOpen: false
        }

        this.formFields = [
            [
                // {
                //     name: 'mark_billable',
                //     label: 'Mark Billable',
                //     type: 'checkbox',
                //     placeholder: 'Update Products'
                // },
                // {
                //     name: 'mark_paid',
                //     label: 'Mark Paid',
                //     type: 'checkbox',
                //     placeholder: 'Show Cost'
                // },
                // {
                //     name: 'convert_currency',
                //     label: 'Convert Currency',
                //     type: 'checkbox',
                //     placeholder: 'Show Product Quantity'
                // },
                {
                    name: 'invoice_documents',
                    label: 'Add Documents to invoice',
                    type: 'checkbox',
                    placeholder: 'Fill Products'
                }
            ]
        ]

        this.toggleCurrency = this.toggleCurrency.bind(this)
        this.togglePayment = this.togglePayment.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    hasErrorFor (field) {
        return !!this.props.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.props.errors[field][0]}</strong>
                </span>
            )
        }
    }

    toggleCurrency () {
        this.setState({ currencyOpen: !this.state.currencyOpen })
    }

    togglePayment () {
        this.setState({ paymentOpen: !this.state.paymentOpen })
    }

    handleCheckboxChange (e) {
        const value = e.target.checked
        const name = e.target.name

        this.setState({ [name]: value })
    }

    render () {
        return (<Card>
            <CardHeader>
                                        Settings
            </CardHeader>

            <CardBody>
                <FormBuilder
                    handleCheckboxChange={this.handleCheckboxChange}
                    formFieldsRows={this.formFields}
                />

                <Button color="primary" onClick={this.toggleCurrency}
                    style={{ marginBottom: '1rem' }}>Convert Currency</Button>
                <Collapse isOpen={this.state.currencyOpen}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Currency</Label>
                                <CurrencyDropdown currency_id={this.props.expense_currency_id}
                                    handleInputChanges={this.props.handleInput}
                                    name="expense_currency_id"/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Exchange Rate</Label>
                                <Input type="text" name="exchange_rate" id="exchange_rate"
                                    onChange={this.props.handleInput}
                                    value={this.state.exchange_rate}
                                    placeholder="Exchange Rate"/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Collapse>

                <Button color="primary" onClick={this.togglePayment}
                    style={{ marginBottom: '1rem' }}>Mark Paid</Button>
                <Collapse isOpen={this.state.paymentOpen}>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail">Payment Type</Label>
                                <PaymentTypeDropdown payment_type={this.props.payment_type_id}
                                    handleInputChanges={this.props.handleInput}
                                    name="payment_type_id"/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="examplePassword">Date</Label>
                                <Input value={this.props.payment_date} type="date"
                                    onChange={this.props.handleInput}
                                    name="payment_date" id="examplePassword"
                                    placeholder="password placeholder"/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="examplePassword">Transaction Reference</Label>
                                <Input value={this.props.transaction_reference} type="text"
                                    name="transaction_reference"
                                    onChange={this.props.handleInput} id="transaction_reference"
                                    placeholder="password placeholder"/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Collapse>
            </CardBody>
        </Card>
        )
    }
}
