import React, { Component } from 'react'
import {
    Button,
    FormGroup,
    Form,
    Input,
    Label
} from 'reactstrap'
import axios from 'axios'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'

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
            subject: this.props.subject,
            design: '',
            body: this.props.body
        }

        this.editor = null
        this.isEditorLoaded = false
        this.isComponentMounted = false

        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.exportHtml = this.exportHtml.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
    }

    componentDidMount () {
        this.isComponentMounted = true
        this.loadTemplate()
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback d-inline-block'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    onLoad () {
        this.isEditorLoaded = true
        this.loadTemplate()
    }

    loadTemplate () {
        if (!this.isEditorLoaded || !this.isComponentMounted) return
        this.editor.loadDesign('<p>test mike</p>')
    }

    handleCheck () {
        this.setState({ mark_sent: !this.state.checked })
    }

    sendMessage () {
        axios.post('/api/emails', {
            subject: this.state.subject,
            body: this.state.body,
            template: this.props.template_type,
            entity: this.props.entity,
            entity_id: this.props.entity_id,
            mark_sent: this.state.mark_sent,
            design: this.state.design
        })
            .then((r) => {
                console.warn(this.state.users)
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleChange (e) {
        const subjectKey = this.props.calculated_template.replace('template', 'subject')
        const bodyKey = this.props.calculated_template
        const name = e.target.name === 'subject' ? subjectKey : bodyKey
        const value = e.target.value

        this.setState({
            [e.target.name]: value
        }, () => this.props.handleSettingsChange(name, value))
    }

    exportHtml () {
        this.editor.exportHtml(data => {
            const { design, html } = data
            this.setState({ design: design, html: html }, () => this.sendMessage())
        })
    }

    render () {
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Your message has been sent successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true ? <ErrorMessage
            message="Your message could not be sent"/> : null

        return (
            <Form>
                {successMessage}
                {errorMessage}
                <FormGroup>
                    <Label for="exampleEmail">Subject</Label>
                    <Input value={this.props.subject} type="text" onChange={this.handleChange} name="subject"
                        id="subject"
                        placeholder="Subject"/>
                    {this.renderErrorFor('subject')}
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Body</Label>
                    <Input className="textarea-lg" size="lg" type="textarea" onChange={this.handleChange} value={this.props.body} name="body" />
                    {this.renderErrorFor('body')}
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input value={this.state.mark_sent} onChange={this.props.handleCheck} type="checkbox"/>
                                Mark Sent
                    </Label>
                </FormGroup>

                <Button onClick={this.sendMessage} color="primary">Send</Button>
            </Form>
        )
    }
}
