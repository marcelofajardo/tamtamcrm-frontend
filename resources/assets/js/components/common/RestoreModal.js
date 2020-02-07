import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, DropdownItem } from 'reactstrap'
import axios from 'axios'

export default class RestoreModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            roles: [],
            modal: false
        }

        this.toggle = this.toggle.bind(this)
        this.restoreFunction = this.restoreFunction.bind(this)
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    restoreFunction () {
        const self = this
        axios.post(this.props.url)
            .then(function (response) {
                const arrEntities = [...self.props.entities]
                const index = self.props.entities.findIndex(entity => entity.id === self.props.id)
                arrEntities.splice(index, 1)
                self.props.updateState(arrEntities)
            })
            .catch(function (error) {
                alert(error)
                console.log(error)
            })
    }

    render () {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-window-restore"/>Restore</DropdownItem>

                <Modal centered={true} backdrop="static" isOpen={this.state.modal} toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>RESTORE</ModalHeader>
                    <ModalBody>
                        Do you want to restore this?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.restoreFunction(this.props.id)}
                            color="danger">Yes</Button>{' '}
                        <Button onClick={this.toggle} color="secondary">No</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}
