import React from 'react'
import axios from 'axios'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'

export default class CreditDropdownMenu extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            showSuccessMessage: false,
            showErrorMessage: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    toggleMenu (event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    changeStatus (action) {
        if (!this.props.id) {
            return false
        }

        const data = this.props.formData

        axios.post(`/api/credit/${this.props.id}/${action}`, data)
            .then((response) => {
                let message = `${action} completed successfully`

                if (action === 'clone_to_credit') {
                    this.props.credits.push(response.data)
                    this.props.action(this.props.credits)
                    message = `Credit was cloned successfully. Quote ${response.data.number} has been created`
                }

                if (action === 'download') {
                    this.downloadPdf(response, this.props.id)
                    message = 'The PDF file has been downloaded'
                }

                if (action === 'clone_to_quote') {
                    message = `The credit was successfully converted to a quote. Quote ${response.data.number} has been created`
                }

                if (action === 'mark_sent') {
                    message = 'The quote has been marked as sent'
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
                this.setState({
                    showErrorMessage: true,
                    showSuccessMessage: false
                })
                console.warn(error)
            })
    }

    downloadPdf (response, id) {
        const linkSource = `data:application/pdf;base64,${response.data.data}`
        const downloadLink = document.createElement('a')
        const fileName = `credit_${id}.pdf`

        downloadLink.href = linkSource
        downloadLink.download = fileName
        downloadLink.click()
    }

    render () {
        const sendEmailButton = <DropdownItem className="primary" onClick={() => this.changeStatus('email')}>Send
            Email</DropdownItem>

        const downloadButton = <DropdownItem className="primary"
            onClick={() => this.changeStatus('download')}>Download</DropdownItem>

        const cloneToQuote = <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_quote')}>Clone
            To
            Quote</DropdownItem>

        const cloneToCredit = <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_credit')}>Clone
            To
            Credit</DropdownItem>

        const changeStatusButton = <DropdownItem color="primary" onClick={() => this.changeStatus('mark_sent')}>Mark
            Sent</DropdownItem>

        const dropdownMenu = <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMenu}>
            <DropdownToggle caret>
                Actions
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                {changeStatusButton}
                {downloadButton}
                {sendEmailButton}
                {cloneToCredit}
                {cloneToQuote}
            </DropdownMenu>
        </Dropdown>

        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        return <React.Fragment>
            {dropdownMenu}
            {successMessage}
            {errorMessage}
        </React.Fragment>
    }
}
