import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'

export default class NotesForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
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
            <CardHeader>Notes</CardHeader>
            <CardBody>

                <FormGroup>
                    <Label for="postcode">Notes:</Label>
                    <Input
                        value={this.props.notes}
                        type='textarea'
                        name="notes"
                        errors={this.props.errors}
                        onChange={this.props.handleInput}
                    />
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
