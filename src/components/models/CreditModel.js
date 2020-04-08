import axios from 'axios'
import moment from 'moment'
import BaseModel, { LineItem } from './BaseModel'

export const credit_pdf_fields = ['$credit.credit_number', '$credit.po_number', '$credit.credit_date', '$credit.credit_amount',
    '$credit.balance_due', '$credit.partial_due', '$credit.credit1', '$credit.credit2', '$credit.credit3', '$credit.credit4',
    '$credit.surcharge1', '$credit.surcharge2', '$credit.surcharge3', '$credit.surcharge4'
]

export default class CreditModel extends BaseModel {
    constructor (data = null, customers) {
        super()
        this.customers = customers
        this._url = '/api/credit'

        this._fields = {
            modalOpen: false,
            is_amount_discount: false,
            id: null,
            showSuccessMessage: false,
            showErrorMessage: false,
            invitations: [],
            contacts: [],
            address: {},
            customerName: '',
            total: 0,
            customer_id: '',
            design_id: '',
            date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            due_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            custom_value1: '',
            public_notes: '',
            private_notes: '',
            footer: '',
            terms: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            custom_surcharge_tax1: false,
            custom_surcharge_tax2: false,
            custom_surcharge_tax3: false,
            custom_surcharge_tax4: false,
            custom_surcharge1: 0,
            custom_surcharge2: 0,
            custom_surcharge3: 0,
            custom_surcharge4: 0,
            tax_rate_name: '',
            tax_rate: 0,
            // company_id: this.props.add === false && this.props.invoice && this.props.invoice.company_id ? this.props.invoice.company_id : '',
            status_id: null,
            tasks: [],
            errors: [],
            discount_total: 0,
            tax: 0,
            discount: 0,
            tax_total: 0,
            sub_total: 0,
            line_items: [],
            partial: 0,
            has_partial: false,
            partial_due_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            activeTab: '1',
            po_number: '',
            loading: false,
            dropdownOpen: false,
            changesMade: false,
            message: '',
            success: false,
            width: window.innerWidth
        }

        this.sent = 2
        this.approved = 4

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

    get isSent () {
        return parseInt(this.fields.status_id) === this.sent
    }

    get isApproved () {
        return parseInt(this.fields.status_id) === this.approved
    }

    addItem () {
        const newArray = this.fields.line_items.slice()
        newArray.push(LineItem)
        this.fields.line_items = newArray
        return newArray
    }

    removeItem (index) {
        const array = [...this.fields.line_items] // make a separate copy of the array
        array.splice(index, 1)
        this.fields.line_items = array
        return array
    }

    buildDropdownMenu () {
        const actions = []

        console.log('invitations', this.fields.invitations)

        if (this.fields.invitations.length) {
            actions.push('pdf')
        }

        if (this.fields.customer_id !== '') {
            actions.push('email')
        }

        if (!this.isSent) {
            actions.push('markSent')
        }

        if (!this.fields.is_deleted) {
            actions.push('delete')
        }

        if (!this.fields.deleted_at) {
            actions.push('archive')
        }

        if (this.isModuleEnabled('invoices') && !this.isApproved) {
            actions.push('convert')
        }

        if (this.isModuleEnabled('quotes')) {
            actions.push('cloneToQuote')
        }

        return actions
    }

    buildInvitations (contact, add = false) {
        const invitations = this.fields.invitations

        // check if the check box is checked or unchecked
        if (add) {
            // add the numerical value of the checkbox to options array
            invitations.push({ client_contact_id: contact })
        } else {
            // or remove the value from the unchecked checkbox from the array
            const index = invitations.findIndex(contact => contact.client_contact_id === contact)
            invitations.splice(index, 1)
        }

        return invitations
    }

    get contacts () {
        const index = this.customers.findIndex(customer => customer.id === this.fields.customer_id)
        const customer = this.customers[index]
        return customer.contacts ? customer.contacts : []
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
        if (this.fields.id) {
            return this.update(data)
        }

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

    customerChange (customer_id) {
        const index = this.customers.findIndex(customer => customer.id === parseInt(customer_id))
        const customer = this.customers[index]
        const address = customer.billing ? {
            line1: customer.billing.address_1,
            town: customer.billing.address_2,
            county: customer.billing.city,
            country: 'United Kingdom'
        } : null

        const contacts = customer.contacts ? customer.contacts : []

        return {
            customerName: customer.name,
            contacts: contacts,
            address: address

        }
    }
}
