import React, { Component } from 'react'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap'

export default class BulkActionDropdown extends Component {
    constructor (props) {
        super(props)

        this.state = {
            dropdownButtonOpen: false
        }

        this.toggleDropdownButton = this.toggleDropdownButton.bind(this)
    }

    toggleDropdownButton (event) {
        this.setState({
            dropdownButtonOpen: !this.state.dropdownButtonOpen
        })
    }

    render () {
        return (
            <React.Fragment>
                <UncontrolledTooltip placement="top" target="bulkActionTooltip">
                    Bulk Actions
                </UncontrolledTooltip>

                <ButtonDropdown className="mr-2" isOpen={this.state.dropdownButtonOpen} toggle={this.toggleDropdownButton}>
                    <DropdownToggle caret color="primary">
                        <i id="bulkActionTooltip" className="fa fa-h" aria-hidden="true" type="ellipsis"/> Bulk Action
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.props.dropdownButtonActions.map(e => {
                            return <DropdownItem id={e} key={e} onClick={this.props.saveBulk}>{e}</DropdownItem>
                        })}
                    </DropdownMenu>
                </ButtonDropdown>
            </React.Fragment>
        )
    }
}
