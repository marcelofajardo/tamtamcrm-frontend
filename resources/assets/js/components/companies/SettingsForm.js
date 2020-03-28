import React from 'react'
import {
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import CurrencyDropdown from '../common/CurrencyDropdown'
import IndustryDropdown from '../common/IndustryDropdown'
import UserDropdown from '../common/UserDropdown'

export default class SettingsForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
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
        return (<Card>
            <CardHeader>Settings</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label for="postcode">Currency(*):</Label>
                    <CurrencyDropdown
                        currency_id={this.props.company.currency_id}
                        errors={this.props.errors}
                        handleInputChanges={this.props.handleInput}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="postcode">Industry:</Label>
                    <IndustryDropdown
                        industry_id={this.props.company.industry_id}
                        errors={this.props.errors}
                        handleInputChanges={this.props.handleInput}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="postcode">Users:</Label>
                    <UserDropdown
                        user_id={this.props.company.assigned_user_id}
                        name="assigned_user_id"
                        errors={this.props.errors}
                        handleInputChanges={this.props.handleInput}
                    />
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
