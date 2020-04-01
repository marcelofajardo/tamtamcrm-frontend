import React from 'react'
import {
    Input,
    FormGroup,
    Label,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'

export default class CostsForm extends React.Component {
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
            <CardHeader>Prices</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label for="price">Price(*):</Label>
                    <Input className={this.hasErrorFor('price') ? 'is-invalid' : ''}
                        type="text"
                        name="price"
                        defaultValue={this.props.product.price}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('price')}
                </FormGroup>

                <FormGroup>
                    <Label for="price">Cost:</Label>
                    <Input className={this.hasErrorFor('cost') ? 'is-invalid' : ''}
                        type="text"
                        name="cost"
                        defaultValue={this.props.product.cost}
                        onChange={this.props.handleInput}/>
                    {this.renderErrorFor('cost')}
                </FormGroup>
            </CardBody>
        </Card>
        )
    }
}
