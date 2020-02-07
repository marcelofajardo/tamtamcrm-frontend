import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Input, Label } from 'reactstrap'
import axios from 'axios'
import SuccessMessage from './SucessMessage'
import ErrorMessage from './ErrorMessage'

export default class SupportModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            check: false,
            errors: [],
            showSuccessMessage: false,
            showErrorMessage: false,
            message: ''
        }

        this.toggle = this.toggle.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    sendMessage () {
        axios.post('/api/support/messages/send', { message: this.state.message, send_logs: this.state.check })
            .then(function (response) {

            })
            .catch(function (error) {
                alert(error)
                console.log(error)
            })
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render () {
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Your message has been sent successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true ? <ErrorMessage
            message="Your message could not be sent"/> : null

        return (
            <React.Fragment>
                <i onClick={this.toggle}
                    style={{ marginRight: 'auto', color: '#000', fontSize: '26px', cursor: 'pointer' }}
                    className="fa fa-envelope"/>

                <Modal centered={true} backdrop="static" isOpen={this.state.modal} toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Contact us</ModalHeader>
                    <ModalBody>
                        {successMessage}
                        {errorMessage}
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Message</Label>
                                <Input type="textarea" onChange={this.handleChange} name="message" id="message" placeholder="Message"/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input name="check" type="checkbox" checked={this.state.check}
                                        onChange={(e) => {
                                            this.handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: e.target.checked
                                                }
                                            })
                                        }}/>
                                    Include recent errors from the logs
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.sendMessage}
                            color="primary">Send</Button>{' '}
                        <Button onClick={this.toggle} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}
