import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import FormBuilder from '../accounts/FormBuilder'
import DesignDropdown from '../common/DesignDropdown'

export default class Details extends React.Component {
    constructor (props) {
        super(props)

        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
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

        if (customFields[0] && Object.keys(customFields[0]).length) {
            customFields[0].forEach((element, index, array) => {
                if (this.props[element.name] && this.props[element.name].length) {
                    customFields[0][index].value = this.props[element.name]
                }
            })
        }

        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.props.handleInput}
            formFieldsRows={customFields}
        /> : null

        return (<Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <FormGroup className="mb-3">
                    <Label>Amount</Label>
                    <Input value={this.props.total}
                        className={this.hasErrorFor('total') ? 'is-invalid' : ''}
                        type="text" name="total"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('total')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Design</Label>
                    <DesignDropdown name="design_id" handleChange={this.props.handleInput}
                        design={this.props.design_id}/>
                </FormGroup>

                {customForm}
            </CardBody>
        </Card>
        )
    }
}
