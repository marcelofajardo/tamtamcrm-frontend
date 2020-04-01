import React from 'react'
import { FormGroup, Input, Label, CardBody, CardHeader, Card } from 'reactstrap'
import IndustryDropdown from '../common/IndustryDropdown'

export default class Contact extends React.Component {
    constructor (props) {
        super(props)

        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
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
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Contact</CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label for="first_name"> First Name </Label>
                            <Input className={this.hasErrorFor('first_name') ? 'is-invalid' : ''}
                                type="text"
                                id="first_name"
                                onChange={this.props.handleInputChanges}
                                value={this.props.lead.first_name}
                                name="first_name"
                                placeholder="Enter customer's first name"/>
                            {this.renderErrorFor('first_name')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="last_name"> Last Name </Label>
                            <Input className={this.hasErrorFor('last_name') ? 'is-invalid' : ''}
                                type="text"
                                id="last_name"
                                onChange={this.props.handleInputChanges.bind(this)}
                                value={this.props.lead.last_name}
                                name="last_name"
                                placeholder="Enter customer's last name"/>
                            {this.renderErrorFor('last_name')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="email"> Email </Label>
                            <Input className={this.hasErrorFor('email') ? 'is-invalid' : ''}
                                type="email"
                                id="email"
                                value={this.props.lead.email}
                                onChange={this.props.handleInputChanges.bind(this)}
                                name="email"
                                placeholder="Enter customer's email address"/>
                            {this.renderErrorFor('email')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="phone"> Phone </Label>
                            <Input className={this.hasErrorFor('phone') ? 'is-invalid' : ''}
                                type="text"
                                id="phone"
                                value={this.props.lead.phone}
                                onChange={this.props.handleInputChanges.bind(this)}
                                name="phone"
                                placeholder="Enter customer's phone number"/>
                            {this.renderErrorFor('phone')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="website"> Website </Label>
                            <Input className={this.hasErrorFor('website') ? 'is-invalid' : ''}
                                type="text"
                                id="website"
                                value={this.props.lead.website}
                                onChange={this.props.handleInputChanges.bind(this)}
                                name="website"
                                placeholder="Enter customer's website"/>
                            {this.renderErrorFor('website')}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="company_name"> Company Name </Label>
                            <Input className={this.hasErrorFor('company_name') ? 'is-invalid' : ''}
                                type="text"
                                id="company_name"
                                value={this.props.lead.company_name}
                                onChange={this.props.handleInputChanges.bind(this)}
                                name="company_name"
                                placeholder="Company Name"/>
                            {this.renderErrorFor('company_name')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="postcode">Industry:</Label>
                            <IndustryDropdown
                                industry_id={this.props.lead.industry_id}
                                errors={this.props.errors}
                                handleInputChanges={this.props.handleInputChanges}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="job_title"> Job Title </Label>
                            <Input className={this.hasErrorFor('job_title') ? 'is-invalid' : ''}
                                type="text"
                                value={this.props.lead.job_title}
                                id="job_title"
                                onChange={this.props.handleInputChanges}
                                name="job_title"
                                placeholder="Job Title"/>
                            {this.renderErrorFor('job_title')}
                        </FormGroup>
                    </CardBody>
                </Card>

            </React.Fragment>
        )
    }
}
