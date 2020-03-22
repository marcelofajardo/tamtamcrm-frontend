import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    DropdownItem
} from 'reactstrap'
import axios from 'axios'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import Invitations from './Invitations'
import Notes from '../common/Notes'
import Details from './Details'
import CreditDropdownMenu from './CreditDropdownMenu'
import CustomFieldsForm from '../common/CustomFieldsForm'

class EditCredit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            id: this.props.credit.id,
            showSuccessMessage: false,
            showErrorMessage: false,
            invitations: this.props.credit && this.props.credit.invitations && this.props.credit.invitations.length ? this.props.credit.invitations : [],
            contacts: [],
            total: this.props.credit.total,
            customer_id: this.props.credit.customer_id,
            design_id: this.props.credit.design_id,
            custom_value1: this.props.credit.custom_value1,
            public_notes: this.props.credit.public_notes,
            private_notes: this.props.credit.private_notes,
            footer: this.props.credit.footer,
            terms: this.props.credit.terms,
            custom_value2: this.props.credit.custom_value2,
            custom_value3: this.props.credit.custom_value3,
            custom_value4: this.props.credit.custom_value4,
            custom_surcharge_tax1: this.props.credit.custom_surcharge_tax1,
            custom_surcharge_tax2: this.props.credit.custom_surcharge_tax2,
            custom_surcharge_tax3: this.props.credit.custom_surcharge_tax3,
            custom_surcharge_tax4: this.props.credit.custom_surcharge_tax4,
            custom_surcharge1: this.props.credit.custom_surcharge1,
            custom_surcharge2: this.props.credit.custom_surcharge2,
            custom_surcharge3: this.props.credit.custom_surcharge3,
            custom_surcharge4: this.props.credit.custom_surcharge4,
            loading: false,
            dropdownOpen: false,
            changesMade: false,
            errors: [],
            message: ''
        }

        this.initialState = this.state
        this.toggle = this.toggle.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleContactChange = this.handleContactChange.bind(this)
    }

    componentDidMount () {
        if (this.props.credit && this.props.credit.customer_id) {
            const index = this.props.customers.findIndex(customer => customer.id === this.props.credit.customer_id)
            const customer = this.props.customers[index]
            const contacts = customer.contacts ? customer.contacts : []
            this.setState({ contacts: contacts })
        }
    }

    handleInput (e) {
        if (e.target.name === 'customer_id') {
            const index = this.props.customers.findIndex(customer => customer.id === parseInt(e.target.value))
            const customer = this.props.customers[index]
            const contacts = customer.contacts ? customer.contacts : []
            this.setState({
                customer_id: e.target.value,
                contacts: contacts,
                changesMade: true
            })

            return
        }

        this.setState({
            [e.target.name]: e.target.value,
            changesMade: true
        })
    }

    handleContactChange (e) {
        const invitations = this.state.invitations

        const contact = e.target.value

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            invitations.push({ client_contact_id: contact })
        } else {
            // or remove the value from the unchecked checkbox from the array
            const index = invitations.findIndex(contact => contact.client_contact_id === contact)
            invitations.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ invitations: invitations }, () => console.log('invitations', invitations))
    }

    getFormData () {
        const data = {
            total: this.state.total,
            customer_id: this.state.customer_id,
            design_id: this.state.design_id,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            custom_surcharge1: this.state.custom_surcharge1,
            custom_surcharge2: this.state.custom_surcharge2,
            custom_surcharge3: this.state.custom_surcharge3,
            custom_surcharge4: this.state.custom_surcharge4,
            custom_surcharge_tax1: this.state.custom_surcharge_tax1,
            custom_surcharge_tax2: this.state.custom_surcharge_tax2,
            custom_surcharge_tax3: this.state.custom_surcharge_tax3,
            custom_surcharge_tax4: this.state.custom_surcharge_tax4,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            footer: this.state.footer,
            terms: this.state.terms,
            invitations: this.state.invitations
        }

        return data
    }

    handleClick () {
        const data = this.getFormData()
        axios.put(`/api/credit/${this.state.id}`, data)
            .then((response) => {
                const index = this.props.credits.findIndex(credit => credit.id === this.props.credit.id)
                this.props.credits[index] = response.data
                this.props.action(this.props.credits)
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

        const successMessage = this.state.showSuccessMessage !== false && this.state.showSuccessMessage !== ''
            ? <SuccessMessage message={this.state.showSuccessMessage}/> : null
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
                        <CreditDropdownMenu id={this.state.id} formData={this.getFormData()}
                            credits={this.props.credits} action={this.props.action}/>
                        {successMessage}
                        {errorMessage}

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Details errors={this.state.errors}
                            total={this.state.total} handleInput={this.handleInput}
                            design_id={this.state.design_id}/>

                        <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                            custom_value2={this.state.custom_value2}
                            custom_value3={this.state.custom_value3}
                            custom_value4={this.state.custom_value4}
                            custom_fields={this.props.custom_fields}/>

                        <Invitations invitations={this.state.invitations} errors={this.state.errors}
                            handleInput={this.handleInput}
                            customers={this.props.customers}
                            customer_id={this.state.customer_id} contacts={this.state.contacts}
                            handleContactChange={this.handleContactChange}/>

                        <Notes terms={this.state.terms} footer={this.state.footer}
                            public_notes={this.state.public_notes} handleInput={this.handleInput}
                            private_notes={this.state.private_notes}/>
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
