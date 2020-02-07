import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Input, Label } from 'reactstrap'
import axios from 'axios'
import SuccessMessage from './SucessMessage'
import ErrorMessage from './ErrorMessage'

export default class AccountList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            check: false,
            errors: [],
            showSuccessMessage: false,
            showErrorMessage: false,
            message: ''
        }

        this.toggle = this.toggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    handleChange (e) {
        const accountId = e.target.value
        const $self = this

        axios.post('/api/account/change', { account_id: e.target.value })
            .then(function (response) {
                localStorage.setItem('account_id', accountId)
                location.reload()
            })
            .catch(function (error) {
                alert(error)
                console.log(error)
            })
    }

    render () {
        const accounts = JSON.parse(localStorage.appState).accounts

        const columnList = accounts.map(account => {
            return <option key={account.account.id} value={account.account.id}>{account.account.settings.name}</option>
        })

        return (
            <React.Fragment>
                <FormGroup style={{ width: '90%' }} className="mt-1 ml-2">
                    <Input value={localStorage.getItem('account_id')} type="select" onChange={this.handleChange} name="account_id" id="account_id">
                        {columnList}
                    </Input>
                </FormGroup>
            </React.Fragment>
        )
    }
}
