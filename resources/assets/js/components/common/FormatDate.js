// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

export default class FormatDate extends Component {
    constructor (props) {
        super(props)
        this.state = {
            invoices: [],
            date_formats: null,
            date_format_id: null
        }

        const account_id = JSON.parse(localStorage.getItem('appState')).user.account_id
        const user_account = JSON.parse(localStorage.getItem('appState')).accounts.filter(account => account.account_id === parseInt(account_id))
        this.settings = user_account[0].account.settings
    }

    componentDidMount () {
        this.setState({ date_format_id: this.settings.date_format_id })

        if (Object.prototype.hasOwnProperty.call(localStorage, 'date_formats')) {
            this.setState({ date_formats: JSON.parse(localStorage.getItem('date_formats')) })
        } else {
            this.getDateFormats()
        }
    }

    getDateFormats () {
        axios.get('api/dates')
            .then((r) => {
                this.setState({
                    date_formats: r.data
                }, () => localStorage.setItem('date_formats', JSON.stringify(r.data)))
            })
            .catch((e) => {
                console.error(e)
            })
    }

    render () {
        const date_format_object = this.state.date_formats && this.state.date_formats.length ? this.state.date_formats.filter(date_format => date_format.id === parseInt(this.state.date_format_id)) : []
        const date_format = date_format_object.length ? date_format_object[0].format_moment : null
        const formatted_date = date_format ? moment(this.props.date).format(date_format) : moment(this.props.date).format('DD/MMM/YYYY')
        return <td data-label={this.props.field}>{formatted_date}</td>
    }
}

FormatDate.defaultProps = {
    decimal: '.',
    thousands: ',',
    decimalCount: 2,
    symbol: '£'
}
