import axios from 'axios'
import moment from 'moment'
import BaseModel, { LineItem } from './BaseModel'

export const invoice_pdf_fields = ['$invoice.invoice_number', '$invoice.po_number', '$invoice.invoice_date', '$invoice.due_date',
    '$invoice.balance_due', '$invoice.invoice_total', '$invoice.partial_due', '$invoice.invoice1', '$invoice.invoice2', '$invoice.invoice3',
    '$invoice.invoice4', '$invoice.surcharge1', '$invoice.surcharge2', '$invoice.surcharge3', '$invoice.surcharge4'
]

export default class InvoiceModel extends BaseModel {
    constructor (data = null, customers) {
        super()
        this.customers = customers
        this._url = '/api/invoice'

        this._fields = {
            modalOpen: false,
            deleted_at: null,
            invitations: [],
            emails: [],
            customer_id: '',
            user_id: null,
            contacts: [],
            due_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            quantity: '',
            id: null,
            line_items: [],
            address: {},
            customerName: '',
            tax_rate_name: '',
            tax_rate: 0,
            company_id: '',
            status_id: null,
            tasks: [],
            errors: [],
            total: 0,
            discount_total: 0,
            tax_total: 0,
            sub_total: 0,
            data: [],
            date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            partial: 0,
            partial_due_date: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
            has_partial: false,
            public_notes: '',
            private_notes: '',
            terms: '',
            footer: '',
            visible: 'collapse',
            custom_value1: '',
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
            tax: 0,
            total_custom_values: 0,
            total_custom_tax: 0,
            discount: 0,
            recurring: '',
            activeTab: '1',
            po_number: '',
            design_id: '',
            success: false,
            showSuccessMessage: false,
            showErrorMessage: false,
            width: window.innerWidth
        }

        this.approved = 4
        this.paid = 3
        this.sent = 2

        if (data !== null) {
            this._fields = { ...this.fields, ...data }
        }
    }

    get fields () {
        return this._fields
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

    get isApproved () {
        return parseInt(this.fields.status_id) === this.approved
    }

    get isPaid () {
        return parseInt(this.fields.status_id) === this.paid
    }

    get isSent () {
        return parseInt(this.fields.status_id) === this.sent
    }

    buildDropdownMenu () {
        const actions = []

        if (this.fields.invitations.length) {
            actions.push('pdf')
        }

        if (this.fields.customer_id !== '') {
            actions.push('email')
        }

        if (!this.isPaid) {
            actions.push('newPayment')
        }

        if (!this.isSent) {
            actions.push('markSent')
        }

        if (!this.isPaid) {
            actions.push('markPaid')
        }

        if (!this.fields.is_deleted) {
            actions.push('delete')
        }

        if (!this.fields.deleted_at) {
            actions.push('archive')
        }

        if (this.fields.task_id && this.fields.task_id !== '') {
            actions.push('getProducts')
        }

        actions.push('cloneToInvoice')
        if (this.isModuleEnabled('quotes')) {
            actions.push('cloneToQuote')
        }
        if (this.isModuleEnabled('credits')) {
            actions.push('cloneToCredit')
        }

        return actions
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

    get url () {
        return this._url
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
