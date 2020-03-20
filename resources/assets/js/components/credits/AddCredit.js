import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import axios from 'axios'
import AddButtons from '../common/AddButtons'
import Invitations from './Invitations'
import Notes from '../common/Notes'
import Details from './Details'
import CustomFieldsForm from '../common/CustomFieldsForm'

class AddCredit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            invitations: [],
            contacts: [],
            total: 0,
            customer_id: null,
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            private_notes: '',
            public_notes: '',
            footer: '',
            terms: '',
            design_id: null,
            loading: false,
            errors: [],
            message: ''
        }
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleContactChange = this.handleContactChange.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'creditForm')) {
            const storedValues = JSON.parse(localStorage.getItem('creditForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    handleInput (e) {
        if (e.target.name === 'customer_id') {
            const index = this.props.customers.findIndex(customer => customer.id === parseInt(e.target.value))
            const customer = this.props.customers[index]
            const contacts = customer.contacts ? customer.contacts : []
            this.setState({
                customer_id: e.target.value,
                contacts: contacts
            }, () => localStorage.setItem('creditForm', JSON.stringify(this.state)))

            return
        }

        this.setState({
            [e.target.name]: e.target.value
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

    handleClick () {
        axios.post('/api/credit', {
            total: this.state.total,
            design_id: this.state.design_id,
            balance: this.state.total,
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            footer: this.state.footer,
            terms: this.state.terms,
            customer_id: this.state.customer_id,
            custom_value1: this.state.custom_value1,
            custom_value2: this.state.custom_value2,
            custom_value3: this.state.custom_value3,
            custom_value4: this.state.custom_value4,
            invitations: this.state.invitations
        })
            .then((response) => {
                const newUser = response.data
                this.props.credits.push(newUser)
                this.props.action(this.props.credits)
                localStorage.removeItem('creditForm')
                this.setState({
                    contacts: [],
                    total: 0,
                    customer_id: null,
                    footer: '',
                    terms: '',
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    public_notes: '',
                    private_notes: '',
                    design_id: null,
                    loading: false,
                    errors: []
                })
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
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    contacts: [],
                    total: 0,
                    customer_id: null,
                    footer: '',
                    terms: '',
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    design_id: null,
                    public_notes: '',
                    private_notes: '',
                    loading: false,
                    errors: []
                }, () => localStorage.removeItem('creditForm'))
            }
        })
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Credit
                    </ModalHeader>
                    <ModalBody>
                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Details custom_fields={this.props.custom_fields} errors={this.state.errors}
                            total={this.state.total} handleInput={this.handleInput}
                            design_id={this.state.design_id}/>

                        <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                            custom_value2={this.state.custom_value2}
                            custom_value3={this.state.custom_value3}
                            custom_value4={this.state.custom_value4}
                            custom_fields={this.props.custom_fields}/>

                        <Invitations errors={this.state.errors} handleInput={this.handleInput}
                            customers={this.props.customers}
                            customer_id={this.state.customer_id} contacts={this.state.contacts}
                            handleContactChange={this.handleContactChange}/>

                        <Notes public_notes={this.state.public_notes} handleInput={this.handleInput}
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

export default AddCredit
