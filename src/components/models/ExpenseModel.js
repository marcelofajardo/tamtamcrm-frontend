import axios from 'axios'
import moment from 'moment'
import BaseModel from './BaseModel'

export default class ExpenseModel extends BaseModel {
    constructor (data = null, customers) {
        super()
        this.customers = customers
        this.errors = []
        this.error_message = ''
        this.currencies = JSON.parse(localStorage.getItem('currencies'))
        this._url = '/api/expense'

        this._fields = {
            modal: false,
            amount: 0,
            date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            public_notes: '',
            private_notes: '',
            customer_id: '',
            expense_currency_id: '',
            payment_type_id: '',
            exchange_rate: 1,
            transaction_reference: '',
            payment_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            invoice_documents: false,
            should_be_invoiced: false,
            expense_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            company_id: '',
            category_id: '',
            notes: '',
            loading: false,
            errors: [],
            message: '',
            activeTab: '1',
            currencyOpen: false,
            paymentOpen: false,
            changesMade: false,
            dropdownOpen: false,
            showSuccessMessage: false,
            showErrorMessage: false
        }

        if (data !== null) {
            this._fields = { ...this.fields, ...data }
        }
    }

    get fields () {
        return this._fields
    }

    get url () {
        return this._url
    }

    getExchangeRateForCurrency (currency_id) {
        const currency = this.currencies && this.currencies.length ? this.currencies.filter(currency => currency.id === parseInt(currency_id)) : []
        return currency.length && currency[0].exchange_rate && currency[0].exchange_rate > 0 ? currency[0].exchange_rate : 1
    }

    buildDropdownMenu () {
        const actions = []
        if (!this.fields.is_deleted) {
            actions.push('newInvoice')
        }

        actions.push('cloneExpense')

        return actions
    }

    get convertedAmount () {
        return (this.fields.amount * this.fields.exchange_rate).toFixed(2)
    }

    get convertedAmountWithTax () {
        return (this.fields.amountWithTax * this.fields.exchange_rate).toFixed(2)
    }

    async update (data) {
        if (!this.fields.id) {
            return false
        }

        this.errors = []
        this.error_message = ''

        try {
            const res = await axios.put(`${this.url}/${this.fields.id}`, data)

            if (res.status === 200) {
                // test for status you want, etc
                console.log(res.status)
            }
            // Don't forget to return something
            return res.data
        } catch (e) {
            this.handleError(e)
            return false
        }
    }

    async save (data) {
        try {
            this.errors = []
            this.error_message = ''
            const res = await axios.post(this.url, data)

            if (res.status === 200) {
                // test for status you want, etc
                console.log(res.status)
            }
            // Don't forget to return something
            return res.data
        } catch (e) {
            this.handleError(e)
            return false
        }
    }
}
