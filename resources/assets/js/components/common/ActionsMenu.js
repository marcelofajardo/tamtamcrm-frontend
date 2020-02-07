import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'

export default class ActionsMenu extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle () {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render () {
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle className="menu-button">
                    <i className="fa fa-ellipsis-h" aria-hidden="true" type="ellipsis"/>
                </DropdownToggle>
                <DropdownMenu persist={true}>
                    {this.props.edit}
                    {this.props.delete}
                    {this.props.restore}
                    {this.props.archive}
                    {this.props.refund}
                </DropdownMenu>
            </Dropdown>
        )
    }
}
