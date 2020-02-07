import React, { Component } from 'react'
import { func } from 'prop-types'
import ContactInputs from './ContactInputs'
import { Button } from 'reactstrap'

export default class Contact extends Component {
    constructor (props) {
        super(props)
        this.state = {
            contacts: this.props.contacts ? this.props.contacts : [{ first_name: '', last_name: '', email: '', phone: '' }]
        }

        this.handleChange = this.handleChange.bind(this)
        this.addContact = this.addContact.bind(this)
        this.removeContact = this.removeContact.bind(this)
    }

    componentDidMount () {
        // console.log('contacts', this.props.contacts)
        // this.props.onChange(this.props.contacts)
    }

    handleChange (e) {
        const contacts = [...this.state.contacts]
        contacts[e.target.dataset.id][e.target.dataset.field] = e.target.value
        this.setState({ contacts }, () => this.props.onChange(this.state.contacts))
    }

    addContact (e) {
        this.setState((prevState) => ({
            contacts: [...prevState.contacts, { first_name: '', last_name: '', email: '', phone: '' }]
        }), () => this.props.onChange(this.state.contacts))
    }

    removeContact (idx) {
        this.setState({
            contacts: this.state.contacts.filter(function (contact, sidx) {
                return sidx !== idx
            })
        }, () => this.props.onChange(this.state.contacts))
    }

    render () {
        const { contacts } = this.state
        return (
            <form onChange={this.handleChange} >
                <ContactInputs contacts={contacts} removeContact={this.removeContact} />
                <Button color="primary" size="lg" block onClick={this.addContact}>Add new contact</Button>
            </form>
        )
    }
}
