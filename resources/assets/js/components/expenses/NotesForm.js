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
                <FormGroup className="mb-3">
                    <Label>Public Notes</Label>
                    <Input value={this.props.public_notes}
                        className={this.hasErrorFor('public_notes') ? 'is-invalid' : ''}
                        type="textarea" name="public_notes"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('public_notes')}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Label>Private Notes</Label>
                    <Input value={this.props.private_notes}
                        className={this.hasErrorFor('private_notes') ? 'is-invalid' : ''}
                        type="textarea" name="private_notes"
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('private_notes')}
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
