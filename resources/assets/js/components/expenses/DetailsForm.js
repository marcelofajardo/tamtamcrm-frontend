import React from 'react'
import {
    Button,
    CustomInput,
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import FormBuilder from '../accounts/FormBuilder'
import CompanyDropdown from '../common/CompanyDropdown'
import CustomerDropdown from '../common/CustomerDropdown'

export default class DetailsForm extends React.Component {
    constructor (props) {
        super(props)
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

    render () {
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.props.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

        console.log('props', this.props)

        return (<Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <FormGroup className="mb-3">
                    <Label>Amount</Label>
                    <Input value={this.props.amount}
                        className={this.hasErrorFor('amount') ? 'is-invalid' : ''}
                        type="text" name="amount"
                        onChange={this.props.handleInput.bind(this)}/>
                    {this.renderErrorFor('amount')}
                </FormGroup>

                <FormGroup className="mr-2">
                    <Label for="expense_date">Date(*):</Label>
                    <Input className={this.hasErrorFor('expense_date') ? 'is-invalid' : ''}
                        value={this.props.expense_date} type="date" id="expense_date"
                        name="date"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('expense_date')}
                </FormGroup>

                <FormGroup className="mr-2">
                    <Label for="date">Category(*):</Label>
                    <Input className={this.hasErrorFor('category_id') ? 'is-invalid' : ''}
                        value={this.props.category_id} type="select" id="category_id"
                        name="category_id"
                        onChange={this.props.handleInput}>
                        <option value="">Select Category</option>
                        <option value="1">Test category</option>
                    </Input>
                    {this.renderErrorFor('category_id')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Customer</Label>
                    <CustomerDropdown
                        customer={this.props.customer_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleInput}
                        customers={this.props.customers}
                    />
                    {this.renderErrorFor('customer_id')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Company</Label>
                    <CompanyDropdown
                        companies={this.props.companies}
                        company_id={this.props.company_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleInput}
                    />
                    {this.renderErrorFor('company_id')}
                </FormGroup>

                {customForm}
            </CardBody>
        </Card>
        )
    }
}
