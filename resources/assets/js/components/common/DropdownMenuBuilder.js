import React, { Component } from 'react'
import {
    DropdownItem,
    Dropdown,
    DropdownToggle, DropdownMenu
} from 'reactstrap'
import axios from 'axios'
import SuccessMessage from './SucessMessage'
import ErrorMessage from './ErrorMessage'

export default class DropdownMenuBuilder extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            dropdownOpen: false,
            showSuccessMessage: false,
            showErrorMessage: false
        }

        this.model = this.props.model
        this.toggleMenu = this.toggleMenu.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    downloadPdf (response, id) {
        const linkSource = `data:application/pdf;base64,${response.data.data}`
        const downloadLink = document.createElement('a')
        const fileName = `invoice_${id}.pdf`

        downloadLink.href = linkSource
        downloadLink.download = fileName
        downloadLink.click()
    }

    changeStatus (action) {
        if (!this.props.model.fields.id) {
            return false
        }

        const data = this.props.formData
        axios.post(`${this.props.model.url}/${this.props.model.fields.id}/${action}`, data)
            .then((response) => {
                let message = `${action} completed successfully`

                if (action === 'download') {
                    this.downloadPdf(response, this.props.model.fields.id)
                    message = 'The PDF file has been downloaded'
                }

                if (action === 'clone_to_invoice') {
                    // this.props.invoices.push(response.data)
                    // this.props.action(this.props.invoices)
                    message = `Invoice was cloned successfully. Invoice ${response.data.number} has been created`
                }

                if (action === 'clone_to_quote') {
                    message = `The invoice was successfully converted to a quote. Invoice ${response.data.number} has been created`
                }

                if (action === 'email') {
                    message = 'The email has been sent successfully'
                }

                this.setState({
                    showSuccessMessage: message,
                    showErrorMessage: false
                })
            })
            .catch((error) => {
                this.setState({ showErrorMessage: true })
                console.warn(error)
            })
    }

    toggleMenu (event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    getOption (option) {
        switch (option) {
            case 'pdf':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('download')}>Download</DropdownItem>

            case 'email':
                return <DropdownItem className="primary" onClick={() => this.changeStatus('email')}>Send
                    Email</DropdownItem>

            case 'approve':
                return <DropdownItem className="primary" onClick={() => this.changeStatus('approve')}>Approve</DropdownItem>

            case 'markSent':
                return <DropdownItem onClick={() => this.changeStatus('mark_sent')}>Mark Sent</DropdownItem>

            case 'cloneToInvoice':
            case 'convert':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('clone_to_invoice')}>Clone Invoice</DropdownItem>

            case 'cloneToQuote':
                return <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_quote')}>Clone To
                    Quote</DropdownItem>

            case 'cloneToCredit':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('clone_to_credit')}>Clone Credit</DropdownItem>

            case 'clone_to_order':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('clone_to_order')}>Clone Order</DropdownItem>

            case 'markPaid':
                return <DropdownItem color="primary" onClick={() => this.changeStatus('mark_paid')}>Mark
                    Paid</DropdownItem>

            case 'cloneExpense':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('clone_to_expense')}>Clone Expense
                </DropdownItem>

            case 'delete':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('delete')}>Delete</DropdownItem>

            case 'archive':
                return <DropdownItem className="primary"
                    onClick={() => this.changeStatus('archive')}>Archive</DropdownItem>

            case 'getProducts':
                return <DropdownItem className="primary" onClick={this.props.handleTaskChange}>Get
                    Products</DropdownItem>

            case 'refund':
                return <DropdownItem className="primary" onClick={() => this.changeStatus('refund')}>Refund</DropdownItem>
        }
    }

    render () {
        const menuOptions = this.props.model.buildDropdownMenu()

        const actions = []

        menuOptions.forEach((element) => {
            actions.push(this.getOption(element))
        })

        const successMessage = this.state.showSuccessMessage !== false && this.state.showSuccessMessage !== ''
            ? <SuccessMessage message={this.state.showSuccessMessage}/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMenu}>
                    <DropdownToggle caret>
                        Actions
                    </DropdownToggle>

                    <DropdownMenu>
                        {actions}
                    </DropdownMenu>
                </Dropdown>
                {successMessage}
                {errorMessage}
            </React.Fragment>
        )
    }
}
