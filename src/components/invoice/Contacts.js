import React from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap'

export default function Contacts (props) {
    return (
        <Card>
            <CardHeader>Invitations</CardHeader>
            <CardBody>
                {props.contacts.length && props.contacts.map((contact, index) => {
                    const invitations = props.invitations.length ? props.invitations.filter(invitation => parseInt(invitation.client_contact_id) === contact.id) : []
                    const checked = invitations.length ? 'checked="checked"' : ''
                    return <FormGroup key={index} check>
                        <Label check>
                            <Input checked={checked} value={contact.id} onChange={props.handleContactChange}
                                type="checkbox"/> {`${contact.first_name} ${contact.last_name}`}
                        </Label>
                    </FormGroup>
                })
                }

                {!props.contacts.length &&
                <h2>You haven't selected a customer</h2>
                }
            </CardBody>
        </Card>

    )
}
