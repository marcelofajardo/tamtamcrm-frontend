import React from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, InputGroup,
    InputGroupAddon, InputGroupText, DropdownItem
} from 'reactstrap'
import axios from 'axios'

class EditTaxRate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            changesMade: false,
            loading: false,
            errors: [],
            id: this.props.taxRate.id,
            name: this.props.taxRate.name,
            rate: this.props.taxRate.rate,
            role: [],
            message: ''
        }

        this.initialState = this.state
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value,
            changesMade: true
        })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handleClick () {
        axios.put(`/api/taxRates/${this.state.id}`, {
            name: this.state.name,
            rate: this.state.rate
        })
            .then((response) => {
                this.initialState = this.state
                const index = this.props.taxRates.findIndex(taxRate => taxRate.id === this.props.taxRate.id)
                this.props.taxRates[index].name = this.state.name
                this.props.taxRates[index].description = this.state.description
                this.props.action(this.props.taxRates)
                this.setState({ changesMade: false })
                this.toggle()
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    this.setState({
                        errors: error.response.data.errors
                    })
                } else {
                    this.setState({ message: error.response.data })
                }
            })
    }

    toggle () {
        if (this.state.modal && this.state.changesMade) {
            if (window.confirm('Your changes have not been saved?')) {
                this.setState({ ...this.initialState })
            }

            return
        }

        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Update Tax Rate
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Label>Name</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o" /></InputGroupText>
                            </InputGroupAddon>
                            <Input className={this.hasErrorFor('name') ? 'is-invalid' : ''} type="text" name="name"
                                value={this.state.name} onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('name')}
                        </InputGroup>

                        <Label>Description</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o" /></InputGroupText>
                            </InputGroupAddon>
                            <Input className={this.hasErrorFor('rate') ? 'is-invalid' : ''} type="text"
                                name="rate" value={this.state.rate}
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('rate')}
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditTaxRate
