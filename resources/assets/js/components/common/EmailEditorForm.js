import React, { Component } from 'react'
import EmailEditor from 'react-email-editor'
import {
    Card,
    Button,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Label
} from 'reactstrap'
import axios from 'axios'
import SuccessMessage from './SucessMessage'
import ErrorMessage from './ErrorMessage'

export default class EmailEditorForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            check: false,
            mark_sent: false,
            errors: [],
            showSuccessMessage: false,
            showErrorMessage: false,
            subject: '',
            body: ''
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.exportHtml = this.exportHtml.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        })
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

    handleCheck () {
        this.setState({ mark_sent: !this.state.checked })
    }

    sendMessage () {
        axios.post('/api/emails', {
            subject: this.state.subject,
            body: this.state.body,
            template: this.props.template,
            entity: this.props.entity,
            entity_id: this.props.entity_id,
            mark_sent: this.state.mark_sent
        })
            .then(function (response) {

            })
            .catch(function (error) {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    exportHtml () {
        this.editor.exportHtml(data => {
            const { design, html } = data
            this.setState({ body: html }, () => this.sendMessage())
        })
    }

    render () {
        const button = this.props.show_editor === true
            ? <Button onClick={this.exportHtml} color="primary">Send</Button>
            : <Button onClick={this.sendMessage} color="primary">Send</Button>
        const editor = this.props.show_editor === true ? <div>
            <EmailEditor
                style={{ width: '200px' }}
                ref={editor => this.editor = editor}
            /></div> : <React.Fragment><Label for="exampleEmail">Message</Label>
            <Input type="textarea" onChange={this.handleChange} name="body" id="body"
                placeholder="Message"/>
        </React.Fragment>
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Your message has been sent successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true ? <ErrorMessage
            message="Your message could not be sent"/> : null

        return (

            <Card>
                <CardHeader>Send Email</CardHeader>
                <CardBody>
                    <Form>
                        {successMessage}
                        {errorMessage}
                        <FormGroup>
                            <Label for="exampleEmail">Subject</Label>
                            <Input type="text" onChange={this.handleChange} name="subject" id="subject"
                                placeholder="Subject"/>
                        </FormGroup>

                        <FormGroup>
                            {editor}
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                                <Input value={this.state.mark_sent} onChange={this.props.handleCheck} type="checkbox"/>
                                Mark Sent
                            </Label>
                        </FormGroup>

                        {button}
                    </Form>
                </CardBody>
            </Card>
        )
    }
}
