import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader, Row, Col
} from 'reactstrap'
import FormBuilder from '../accounts/FormBuilder'
import DropdownDate from '../common/DropdownDate'

export default class DetailsForm extends React.Component {
    constructor (props) {
        super(props)

        this.defaultValues = {
            year: 'Select Year',
            month: 'Select Month',
            day: 'Select Day'
        }

        this.classes = {
            dateContainer: 'form-row',
            yearContainer: 'col-md-4 mb-3',
            monthContainer: 'col-md-4 mb-3',
            dayContainer: 'col-md-4 mb-3'
        }

        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.buildGenderDropdown = this.buildGenderDropdown.bind(this)
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

    buildGenderDropdown () {
        const arrOptions = ['male', 'female']

        const options = arrOptions.map(option => {
            return <option key={option} value={option}>{option}</option>
        })

        return (
            <FormGroup>
                <Label for="gender">Gender(*):</Label>
                <Input className={this.hasErrorFor('gender') ? 'is-invalid' : ''}
                    type="select"
                    name="gender"
                    onChange={this.props.handleInput.bind(this)}>
                    <option value="">Select gender</option>
                    {options}
                </Input>
                {this.renderErrorFor('gender')}
            </FormGroup>
        )
    }

    render () {
        const genderList = this.buildGenderDropdown()
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.props.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null
        return (<Card>
            <CardHeader>Details</CardHeader>
            <CardBody>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="username">Username(*):</Label>
                            <Input className={this.hasErrorFor('username') ? 'is-invalid' : ''}
                                placeholder="Username"
                                type="text"
                                name="username"
                                value={this.props.username}
                                onChange={this.props.handleInput.bind(this)}/>
                            <small className="form-text text-muted">Your username must be
                                    "firstname"."lastname"
                                    eg
                                    joe.bloggs.
                            </small>
                            {this.renderErrorFor('username')}
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email(*):</Label>
                            <Input className={this.hasErrorFor('email') ? 'is-invalid' : ''}
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={this.props.email}
                                onChange={this.props.handleInput.bind(this)}/>
                            {this.renderErrorFor('email')}
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="first_name">First Name(*):</Label>
                            <Input className={this.hasErrorFor('first_name') ? 'is-invalid' : ''}
                                type="text"
                                name="first_name"
                                value={this.props.first_name}
                                placeholder="First Name"
                                onChange={this.props.handleInput.bind(this)}/>
                            {this.renderErrorFor('first_name')}
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label for="last_name">Last Name(*):</Label>
                            <Input className={this.hasErrorFor('last_name') ? 'is-invalid' : ''}
                                type="text"
                                value={this.props.last_name}
                                placeholder="Last Name"
                                name="last_name"
                                onChange={this.props.handleInput.bind(this)}/>
                            {this.renderErrorFor('last_name')}
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        {genderList}
                    </Col>

                    <Col md={6}>
                        <DropdownDate selectedDate={this.props.dob} classes={this.classes} defaultValues={this.defaultValues}
                            onDateChange={this.props.setDate}/>
                    </Col>
                </Row>

                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="phone_number">Phone Number:</Label>
                            <Input className={this.hasErrorFor('phone_number') ? 'is-invalid' : ''}
                                value={this.props.phone_number}
                                type="tel"
                                name="phone_number"
                                onChange={this.props.handleInput.bind(this)}/>
                            {this.renderErrorFor('phone_number')}
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="job_description">Job Description:</Label>
                            <Input className={this.hasErrorFor('job_description') ? 'is-invalid' : ''}
                                type="text"
                                placeholder="Job Description"
                                value={this.props.job_description}
                                name="job_description"
                                onChange={this.props.handleInput.bind(this)}/>
                            {this.renderErrorFor('job_description')}
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input className={this.hasErrorFor('password') ? 'is-invalid' : ''}
                                value={this.props.password}
                                type="password"
                                name="password" onChange={this.props.handleInput.bind(this)}/>
                            <small className="form-text text-muted">Your password must be more than 8
                                    characters
                                    long,
                                    should contain at-least 1 Uppercase, 1 Lowercase, 1 Numeric and 1
                                    special
                                    character..
                            </small>
                            {this.renderErrorFor('password')}
                        </FormGroup>
                    </Col>
                </Row>
                {customForm}
            </CardBody>
        </Card>

        )
    }
}
