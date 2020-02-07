import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class AddButtons extends Component {
    render () {
        return (
            <React.Fragment>
                <Button style={{ position: 'absolute', top: '20px', right: '30px' }} className="d-none d-md-inline-block" color="primary" onClick={this.props.toggle}>+</Button>
                <Button className="d-md-none float" color="primary" onClick={this.props.toggle}><i className="fa fa-plus my-float" /></Button>
            </React.Fragment>
        )
    }
}
