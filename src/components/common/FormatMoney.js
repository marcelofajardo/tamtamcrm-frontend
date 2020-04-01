// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

import React, { Component } from 'react'
import axios from 'axios'

export default class FormatMoney extends Component {
    constructor (props) {
        super(props)
        this.state = {
            invoices: [],
            currencies: null,
            currency_id: null
        }

        const account_id = JSON.parse(localStorage.getItem('appState')).user.account_id
        const user_account = JSON.parse(localStorage.getItem('appState')).accounts.filter(account => account.account_id === parseInt(account_id))
        this.settings = user_account[0].account.settings
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'currencies')) {
            this.setState({ currencies: JSON.parse(localStorage.getItem('currencies')) })
        } else {
            this.getCurrency()
        }

        if (this.props.customers && this.props.customers.length && this.props.customer_id) {
            const customer = this.props.customers.filter(customer => customer.id === parseInt(this.props.customer_id))
            this.setState({ currency_id: customer[0].currency_id }, () => {})
        } else {
            this.setState({ currency_id: this.settings.currency_id }, () => {})
        }
    }

    getCurrency () {
        axios.get('api/currencies')
            .then((r) => {
                this.setState({
                    currencies: r.data
                }, () => localStorage.setItem('currencies', JSON.stringify(r.data)))
            })
            .catch((e) => {
                console.error(e)
            })
    }

    render () {
        const currency = this.state.currencies && this.state.currencies.length ? this.state.currencies.filter(currency => currency.id === parseInt(this.state.currency_id)) : []

        let decimalCount = currency.length ? currency[0].precision : FormatMoney.defaultProps.decimalCount
        const symbol = currency.length ? currency[0].symbol : FormatMoney.defaultProps.symbol
        const thousands = currency.length ? currency[0].thousand_separator : FormatMoney.defaultProps.thousands
        const decimal = currency.length ? currency[0].decimal_separator : FormatMoney.defaultProps.decimal

        try {
            let total = this.props.amount

            decimalCount = Math.abs(decimalCount)
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount

            const negativeSign = total < 0 ? '-' : ''

            const i = parseInt(total = Math.abs(Number(total) || 0).toFixed(decimalCount)).toString()
            const j = (i.length > 3) ? i.length % 3 : 0

            const formattedTotal = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(total - i).toFixed(decimalCount).slice(2) : '')
            return <span>{`${symbol}${formattedTotal}`}</span>
        } catch (e) {
            console.log(e)
        }
    }
}

FormatMoney.defaultProps = {
    decimal: '.',
    thousands: ',',
    decimalCount: 2,
    symbol: '£'
}
