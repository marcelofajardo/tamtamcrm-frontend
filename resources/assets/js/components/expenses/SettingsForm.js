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
    Row, CustomInput
} from 'reactstrap'
import CurrencyDropdown from '../common/CurrencyDropdown'
import PaymentTypeDropdown from '../common/PaymentTypeDropdown'

export default class SettingsForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            currencyOpen: !!(this.props.expense_currency_id && this.props.expense_currency_id > 0),
            paymentOpen: !!(this.props.payment_date && this.props.payment_date.length > 1)
        }

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

    toggleCurrency (buttonName, e) {
        this.setState({ currencyOpen: e.target.checked })
    }

    togglePayment (buttonName, e) {
        this.setState({ paymentOpen: e.target.checked })
    }

    handleCheckboxChange (buttonName, event) {
        const value = event.target.checked
        const name = event.target.id
        const e = {}
        e.target = {
            name: name,
            value: value,
            type: 'checkbox'
        }

        this.setState({ [name]: value }, () => this.props.handleInput(e))
    }

    render () {
        return (<Card>
            <CardHeader>
                    Settings
            </CardHeader>

            <CardBody>
                <CustomInput
                    checked={this.props.should_be_invoiced}
                    type="switch"
                    id="should_be_invoiced"
                    name="customSwitch"
                    label="Mark Billable"
                    onChange={this.handleCheckboxChange.bind(this, 'should_be_invoiced')}/>

                <CustomInput
                    checked={this.state.paymentOpen}
                    type="switch"
                    id="mark_paid"
                    name="customSwitch"
                    label="Mark Paid"
                    onChange={this.togglePayment.bind(this, 'mark_paid')}
                />
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

                <CustomInput
                    checked={this.state.currencyOpen}
                    type="switch"
                    id="convert_currency"
                    name="customSwitch"
                    label="Convert Currency"
                    onChange={this.toggleCurrency.bind(this, 'convert_currency')}
                />
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
                                    value={this.props.exchange_rate}
                                    placeholder="Exchange Rate"/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Collapse>

                <CustomInput
                    checked={this.props.invoice_documents}
                    type="switch"
                    id="invoice_documents"
                    name="customSwitch"
                    label="Add Documents to Invoice"
                    onChange={this.handleCheckboxChange.bind(this, 'invoice_documents')}/>
            </CardBody>
        </Card>
        )
    }
}
