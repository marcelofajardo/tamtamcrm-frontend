import React, { Component } from 'react'
import { Button, UncontrolledTooltip } from 'reactstrap'

export default class AddButtons extends Component {
    render () {
        return (
            <React.Fragment>
                <UncontrolledTooltip placement="right" target="addButtonTooltip">
                    Add Item
                </UncontrolledTooltip>

                <Button id="addButtonTooltip" style={{ position: 'absolute', top: '48px', right: '30px' }}
                    className="d-none d-md-inline-block" color="primary" onClick={this.props.toggle}>+</Button>
                <Button id="addButtonTooltip" className="d-md-none float" color="primary" onClick={this.props.toggle}><i
                    className="fa fa-plus my-float"/></Button>
            </React.Fragment>
        )
    }
}
