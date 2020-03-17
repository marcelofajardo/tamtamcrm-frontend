import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from 'reactstrap'
import axios from 'axios'
import AddButtons from '../common/AddButtons'

class AddTaxRate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            name: '',
            rate: '',
            loading: false,
            errors: [],
            message: ''
        }
        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'taxForm')) {
            const storedValues = JSON.parse(localStorage.getItem('taxForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => localStorage.setItem('taxForm', JSON.stringify(this.state)))
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
        axios.post('/api/taxRates', {
            name: this.state.name,
            rate: this.state.rate
        })
            .then((response) => {
                this.toggle()
                const newUser = response.data
                this.props.taxRates.push(newUser)
                this.props.action(this.props.taxRates)
                localStorage.removeItem('taxForm')
                this.setState({
                    name: '',
                    rate: ''
                })
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    this.setState({
                        errors: error.response.data.errors
                    })
                } else {
                    this.setState({ message: error.response.data })
                }
            })
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    name: '',
                    rate: ''
                }, () => localStorage.removeItem('taxForm'))
            }
        })
    }

    render () {
        const { message } = this.state

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Tax Rate
                    </ModalHeader>
                    <ModalBody>

                        {message && <div className="alert alert-danger" role="alert">
                            {message}
                        </div>}

                        <Label>Name</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o"/></InputGroupText>
                            </InputGroupAddon>
                            <Input className={this.hasErrorFor('name') ? 'is-invalid' : ''} type="text" name="name"
                                value={this.state.name} onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('name')}
                        </InputGroup>

                        <Label>Rate</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-o"/></InputGroupText>
                            </InputGroupAddon>
                            <Input className={this.hasErrorFor('rate') ? 'is-invalid' : ''} type="text"
                                value={this.state.rate} name="rate" onChange={this.handleInput.bind(this)}/>
                            {this.renderErrorFor('rate')}
                        </InputGroup>

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

export default AddTaxRate
