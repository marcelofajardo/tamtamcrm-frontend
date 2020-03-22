import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import CustomerDropdown from '../common/CustomerDropdown'

export default class Invitations extends React.Component {
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
        return (<Card>
            <CardHeader>Invitations</CardHeader>
            <CardBody>
                <FormGroup className="mb-3">
                    <Label>Customer</Label>

                    <CustomerDropdown
                        errors={this.props.errors}
                        customer={this.props.customer_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.props.handleInput}
                        customers={this.props.customers}
                    />
                    {this.renderErrorFor('customer_id')}
                </FormGroup>

                {this.props.contacts.length && this.props.contacts.map((contact, index) => {
                    const invitations = this.props.invitations.length ? this.props.invitations.filter(invitation => parseInt(invitation.client_contact_id) === contact.id) : []
                    const checked = invitations.length ? 'checked="checked"' : ''
                    return <FormGroup key={index} check>
                        <Label check>
                            <Input checked={checked} value={contact.id} onChange={this.props.handleContactChange}
                                type="checkbox"/> {`${contact.first_name} ${contact.last_name}`}
                        </Label>
                    </FormGroup>
                })
                }
            </CardBody>
        </Card>
        )
    }
}
