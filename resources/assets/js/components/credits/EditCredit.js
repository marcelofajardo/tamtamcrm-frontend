import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap'
import axios from 'axios'
import CustomerDropdown from '../common/CustomerDropdown'
import FormBuilder from '../accounts/FormBuilder'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'

class EditCredit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            id: this.props.credit.id,
            showSuccessMessage: false,
            showErrorMessage: false,
            total: this.props.credit.total,
            customer_id: this.props.credit.customer_id,
            custom_value1: this.props.credit.custom_value1,
            custom_value2: this.props.credit.custom_value2,
            custom_value3: this.props.credit.custom_value3,
            custom_value4: this.props.credit.custom_value4,
            loading: false,
            dropdownOpen: false,
            changesMade: false,
            errors: [],
            message: ''
        }

        this.initialState = this.state
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value,
            changesMade: true
        })
    }

    toggleMenu (event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
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

    changeStatus (action) {
        if (!this.state.id) {
            return false
        }

        const data = this.getPostData()

        axios.post(`/api/credit/${this.state.id}/${action}`, data)
            .then((response) => {
                if (response.data) {
                    this.props.credits.push(response.data)
                    this.props.action(this.props.credits)
                }
                this.setState({ showSuccessMessage: true })
            })
            .catch((error) => {
                this.setState({ showErrorMessage: true })
                console.warn(error)
            })
    }

    getPostData () {
        const data = {
            total: this.state.total,
            customer_id: this.state.customer_id,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4
        }

        return data
    }

    handleClick () {
        const data = this.getPostData()
        axios.put(`/api/credit/${this.state.id}`, data)
            .then((response) => {
                const index = this.props.credits.findIndex(credit => credit.id === this.props.credit.id)
                this.props.credits[index] = response.data
                this.props.action(this.props.credits)
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
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null

        const sendEmailButton = <DropdownItem className="primary" onClick={() => this.changeStatus('email')}>Send
            Email</DropdownItem>

        const cloneToQuote = <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_quote')}>Clone
            To
            Quote</DropdownItem>

        const cloneToCredit = <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_credit')}>Clone
            To
            Credit</DropdownItem>

        const changeStatusButton = <DropdownItem color="primary" onClick={() => this.changeStatus('mark_paid')}>Mark
            Paid</DropdownItem>

        const dropdownMenu = <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMenu}>
            <DropdownToggle caret>
                Actions
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                {changeStatusButton}
                {sendEmailButton}
                {cloneToCredit}
                {cloneToQuote}
            </DropdownMenu>
        </Dropdown>

        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Update Credit
                    </ModalHeader>
                    <ModalBody>
                        {dropdownMenu}
                        {successMessage}
                        {errorMessage}

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Label>Amount</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o"/></InputGroupText>
                            </InputGroupAddon>
                            <Input value={this.state.total} className={this.hasErrorFor('total') ? 'is-invalid' : ''}
                                type="text" name="total"
                                onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('total')}
                        </InputGroup>

                        <Label>Customer</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o"/></InputGroupText>
                            </InputGroupAddon>
                            <CustomerDropdown
                                customer={this.state.customer_id}
                                renderErrorFor={this.renderErrorFor}
                                handleInputChanges={this.handleInput}
                                customers={this.props.customers}
                            />
                            {this.renderErrorFor('customer_id')}
                        </InputGroup>

                        {customForm}

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditCredit
