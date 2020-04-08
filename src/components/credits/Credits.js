import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import axios from 'axios'
import {
    Card, CardBody
} from 'reactstrap'
import CreditFilters from './CreditFilters'
import CreditItem from './CreditItem'
import EditCredit from './EditCredit'

export default class Credits extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                ignore: [],
                viewMode: false,
                viewedId: null,
                title: null
            },
            credits: [],
            cachedData: [],
            customers: [],
            custom_fields: [],
            dropdownButtonActions: ['download'],
            bulk: [],
            ignoredColumns: ['emails', 'due_date', 'assigned_user_id', 'invoice_id', 'custom_surcharge1', 'custom_surcharge_tax1', 'custom_surcharge2', 'custom_surcharge_tax2', 'custom_surcharge3', 'custom_surcharge_tax3', 'custom_surcharge4', 'custom_surcharge_tax4', 'design_id', 'invitations', 'id', 'user_id', 'status', 'company_id', 'custom_value1', 'custom_value2', 'custom_value3', 'custom_value4', 'updated_at', 'deleted_at', 'created_at', 'public_notes', 'private_notes', 'terms', 'footer', 'last_send_date', 'line_items', 'next_send_date', 'last_sent_date', 'first_name', 'last_name', 'tax_total', 'discount_total', 'sub_total'],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            showRestoreButton: false
        }

        this.updateCustomers = this.updateCustomers.bind(this)
        this.customerList = this.customerList.bind(this)
        this.filterCredits = this.filterCredits.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
    }

    filterCredits (filters) {
        this.setState({ filters: filters })
    }

    getCustomers () {
        axios.get('/api/customers')
            .then((r) => {
                this.setState({
                    customers: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Credit')
            .then((r) => {
                this.setState({
                    custom_fields: r.data.fields
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    updateCustomers (credits) {
        const cachedData = !this.state.cachedData.length ? credits : this.state.cachedData
        this.setState({
            credits: credits,
            cachedData: cachedData
        })
    }

    customerList (props) {
        const { credits, customers, custom_fields } = this.state
        return <CreditItem showCheckboxes={props.showCheckboxes} credits={credits} customers={customers}
            custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} updateCustomers={this.updateCustomers}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    render () {
        const { customers, credits, custom_fields, view, filters } = this.state
        const fetchUrl = `/api/credits?search_term=${this.state.filters.searchText}&status=${this.state.filters.status_id}&customer_id=${this.state.filters.customer_id} &start_date=${this.state.filters.start_date}&end_date=${this.state.filters.end_date}`
        const addButton = customers.length ? <EditCredit
            custom_fields={custom_fields}
            customers={customers}
            add={true}
            action={this.updateCustomers}
            credits={credits}
            modal={true}
        /> : null

        return this.state.customers.length ? (
            <div className="data-table">
                <Card>
                    <CardBody>

                        <CreditFilters credits={credits} customers={customers}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterCredits}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}
                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Credit"
                            bulk_save_url="/api/credit/bulk"
                            view={view}
                            columnMapping={{ customer_id: 'Customer' }}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='number'
                            userList={this.customerList}
                            fetchUrl={fetchUrl}
                            updateState={this.updateCustomers}
                        />
                    </CardBody>
                </Card>
            </div>
        ) : null
    }
}
