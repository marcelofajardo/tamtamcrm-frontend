import React, { Component } from 'react'
import {
    DropdownItem,
    Dropdown,
    DropdownToggle, DropdownMenu
} from 'reactstrap'
import axios from 'axios'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'

export default class InvoiceDropdownMenu extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            dropdownOpen: false,
            showSuccessMessage: false,
            showErrorMessage: false
        }
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
        if (!this.props.invoice_id) {
            return false
        }

        const data = this.props.formData
        axios.post(`/api/invoice/${this.props.invoice_id}/${action}`, data)
            .then((response) => {
                let message = `${action} completed successfully`

                if (action === 'download') {
                    this.downloadPdf(response, this.props.invoice_id)
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

    render () {
        const changeStatusButton = this.props.status_id === 1
            ? <DropdownItem onClick={() => this.changeStatus('mark_sent')}>Mark Sent</DropdownItem>
            : <DropdownItem color="primary" onClick={() => this.changeStatus('mark_paid')}>Mark Paid</DropdownItem>

        const sendEmailButton = <DropdownItem className="primary" onClick={() => this.changeStatus('email')}>Send
            Email</DropdownItem>

        const downloadButton = <DropdownItem className="primary"
            onClick={() => this.changeStatus('download')}>Download</DropdownItem>

        const deleteButton = this.props.status_id === 1
            ? <DropdownItem className="primary"
                onClick={() => this.changeStatus('delete')}>Delete</DropdownItem> : null

        const archiveButton = this.props.status_id === 1
            ? <DropdownItem className="primary"
                onClick={() => this.changeStatus('archive')}>Archive</DropdownItem> : null

        const cloneToQuote = this.props.status_id === 1
            ? <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_quote')}>Clone To
                Quote</DropdownItem> : null

        const cloneButton =
            <DropdownItem className="primary"
                onClick={() => this.changeStatus('clone_to_invoice')}>Clone</DropdownItem>

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
                        <DropdownItem header>Header</DropdownItem>
                        {changeStatusButton}
                        {sendEmailButton}
                        {downloadButton}
                        {deleteButton}
                        {archiveButton}
                        {cloneToQuote}
                        {cloneButton}
                        {this.props.task_id ? <DropdownItem className="primary" onClick={this.props.handleTaskChange}>Get
                        Products</DropdownItem> : null}
                    </DropdownMenu>
                </Dropdown>
                {successMessage}
                {errorMessage}
            </React.Fragment>
        )
    }
}
