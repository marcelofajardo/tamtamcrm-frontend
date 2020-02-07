import React, { Component } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from 'reactstrap'

export default class ViewEntity extends Component {
    constructor (props) {
        super(props)
        this.state = {
            roles: [],
            modal: true
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle () {
        this.setState({
            modal: false,
            errors: []
        }, () => this.props.toggle())
    }

    render () {
        const columnList = this.props.entity ? Object.keys(this.props.entity).filter(key => {
            return this.props.ignore && !this.props.ignore.includes(key)
        }).map(key => {
            return <ListGroupItem color="dark" key={key}>
                <ListGroupItemHeading>
                    {this.props.entity[key]}
                </ListGroupItemHeading>

                <ListGroupItemText>
                    {key}
                </ListGroupItemText>
            </ListGroupItem>
        }) : null

        return (
            <React.Fragment>
                <Modal centered={true} backdrop="static" isOpen={this.props.viewed} toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Details</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {columnList}
                        </ListGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle} color="secondary">Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}
