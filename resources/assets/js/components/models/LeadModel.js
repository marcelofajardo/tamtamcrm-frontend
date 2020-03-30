import axios from 'axios'
import moment from 'moment'
import BaseModel from './BaseModel'

export default class LeadModel extends BaseModel {
    constructor (data = null) {
        super()

        this._url = '/api/lead'

        this._fields = {
            id: null,
            modal: false,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address_1: '',
            address_2: '',
            job_title: '',
            company_name: '',
            zip: '',
            city: '',
            title: '',
            valued_at: '',
            assigned_user_id: '',
            source_type: '',
            values: [],
            loading: false,
            submitSuccess: false,
            count: 2,
            activeTab: '1',
            errors: [],
            users: [],
            selectedUsers: [],
            sourceTypes: []
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

    buildDropdownMenu () {
        const actions = []

        if (!this.fields.is_deleted) {
            actions.push('delete')
        }

        if (!this.fields.deleted_at) {
            actions.push('archive')
        }

        return actions
    }

    performAction () {

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
}
