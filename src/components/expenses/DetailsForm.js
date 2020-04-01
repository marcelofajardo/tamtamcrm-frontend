import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import CompanyDropdown from '../common/CompanyDropdown'
import CustomerDropdown from '../common/CustomerDropdown'
import Datepicker from '../common/Datepicker'

export default class DetailsForm extends React.Component {
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
        return (<Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <FormGroup className="mb-3">
                    <Label>Amount</Label>
                    <Input value={this.props.expense.amount}
                        className={this.hasErrorFor('amount') ? 'is-invalid' : ''}
                        type="text" name="amount"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('amount')}
                </FormGroup>

                <FormGroup className="mr-2">
                    <Label for="expense_date">Date(*):</Label>
                    <Datepicker className="form-control" name="expense_date" date={this.props.expense.expense_date}
                        handleInput={this.props.handleInput}/>
                    {this.renderErrorFor('expense_date')}
                </FormGroup>

                <FormGroup className="mr-2">
                    <Label for="date">Category(*):</Label>
                    <Input className={this.hasErrorFor('category_id') ? 'is-invalid' : ''}
                        value={this.props.expense.category_id} type="select" id="category_id"
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
                        customer={this.props.expense.customer_id}
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
                        company_id={this.props.expense.company_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleInput}
                    />
                    {this.renderErrorFor('company_id')}
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
