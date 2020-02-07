/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import axios from 'axios'

class EditCategory extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            name: this.props.category.name,
            description: this.props.category.description,
            status: this.props.category.status,
            id: this.props.category.id,
            parent: this.props.category.parent_id,
            loading: false,
            errors: []
        }

        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.buildParentOptions = this.buildParentOptions.bind(this)
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handleClick () {
        axios.put(`/api/categories/${this.state.id}`, {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            parent: this.state.parent
        })
            .then((response) => {
                this.toggle()
                const index = this.props.categories.findIndex(category => category.id === this.state.id)
                this.props.categories[index].name = this.state.name
                this.props.categories[index].description = this.state.description
                this.props.action(this.props.categories)
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    buildParentOptions () {
        let categoryList
        if (!this.props.categories.length) {
            categoryList = <option value="">Loading...</option>
        } else {
            categoryList = this.props.categories.map((category, index) => (
                <option key={index} value={category.id}>{category.name}</option>
            ))
        }

        return (
            <FormGroup>
                <Label for="gender">Parent:</Label>
                <Input className={this.hasErrorFor('parent') ? 'is-invalid' : ''}
                    value={this.state.parent}
                    type="select"
                    name="parent"
                    onChange={this.handleInput.bind(this)}>
                    <option value="">Select Parent</option>
                    {categoryList}
                </Input>
                {this.renderErrorFor('parent')}
            </FormGroup>
        )
    }

    render () {
        const parentDropdown = this.buildParentOptions()

        return (
            <React.Fragment>
                <Button color="success" onClick={this.toggle}>Edit Category</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Category
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name <span className="text-danger">*</span></Label>
                            <Input className={this.hasErrorFor('name') ? 'is-invalid' : ''}
                                value={this.state.name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name" onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('name')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description </Label>
                            <Input className={this.hasErrorFor('description') ? 'is-invalid' : ''}
                                value={this.state.description}
                                type="textarea"
                                name="description"
                                id="description" rows="5"
                                placeholder="Description" onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('description')}
                        </FormGroup>

                        {parentDropdown}

                        <FormGroup>
                            <Label for="cover">Cover </Label>
                            <Input className={this.hasErrorFor('cover') ? 'is-invalid' : ''} type="file" name="cover"
                                id="cover" onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('cover')}
                        </FormGroup>

                        <FormGroup>
                            <Label for="status">Status </Label>
                            <Input className={this.hasErrorFor('status') ? 'is-invalid' : ''} type="select"
                                value={this.state.status}
                                name="status"
                                id="status"
                                onChange={this.handleInput.bind(this)}
                            >
                                <option value="0">Disable</option>
                                <option value="1">Enable</option>
                            </Input>
                            {this.renderErrorFor('status')}
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditCategory
