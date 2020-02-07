import React, { Component } from 'react'
import { Alert } from 'reactstrap'

export default class SuccessMessage extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Alert color="success">
                {this.props.message}
            </Alert>
        )
    }
}
