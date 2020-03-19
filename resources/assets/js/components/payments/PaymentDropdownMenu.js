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

export default class PaymentDropdownMenu extends React.Component {
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

        axios.post(`/api/payment/${this.props.id}/${action}`, data)
            .then((response) => {
                let message = `${action} completed successfully`

                if (action === 'download') {
                    this.downloadPdf(response, this.props.id)
                    message = 'The PDF file has been downloaded'
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

        const downloadButton = this.state.status_id === 1
            ? <DropdownItem className="primary"
                onClick={() => this.changeStatus('download')}>Download</DropdownItem> : null

        const deleteButton = this.state.status_id === 1
            ? <DropdownItem className="primary" onClick={() => this.changeStatus('delete')}>Delete</DropdownItem> : null

        const archiveButton = this.state.status_id === 1
            ? <DropdownItem className="primary" onClick={() => this.changeStatus('archive')}>Archive</DropdownItem> : null

        const cloneButton =
            <DropdownItem className="primary" onClick={() => this.changeStatus('clone_to_invoice')}>Clone To
                Invoice</DropdownItem>

        const dropdownMenu = <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMenu}>
            <DropdownToggle caret>
                    Actions
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                {sendEmailButton}
                {downloadButton}
                {deleteButton}
                {archiveButton}
                {cloneButton}
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
