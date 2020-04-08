import React, { Component } from 'react'
import axios from 'axios'
import AddCustomer from './AddCustomer'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import CustomerFilters from './CustomerFilters'
import CustomerItem from './CustomerItem'

export default class Customers extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            customers: [],
            cachedData: [],
            companies: [],
            bulk: [],
            dropdownButtonActions: ['download'],
            filters: {
                status: 'active',
                company_id: '',
                group_settings_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            ignoredColumns: [
                'vat_number',
                'public_notes',
                'private_notes',
                'industry_id',
                'size_id',
                'created_at',
                'contacts',
                'deleted_at',
                'credit_balance',
                'settings',
                'assigned_user',
                'company',
                'customer_type',
                'company_id',
                'currency_id',
                'customer_type',
                'customerType',
                'credit',
                'default_payment_method',
                'billing',
                'shipping',
                'currency',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
                'group_settings_id',
                'paid_to_date'
                // 'phone'
            ],
            custom_fields: [],
            error: '',
            showRestoreButton: false
        }

        this.updateCustomers = this.updateCustomers.bind(this)
        this.customerList = this.customerList.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
        this.filterCustomers = this.filterCustomers.bind(this)
    }

    componentDidMount () {
        this.getCompanies()
        this.getCustomFields()
    }

    updateCustomers (customers) {
        const cachedData = !this.state.cachedData.length ? customers : this.state.cachedData
        this.setState({
            customers: customers,
            cachedData: cachedData
        })
    }

    getCompanies () {
        axios.get('/api/companies')
            .then((r) => {
                this.setState({
                    companies: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Customer')
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

    filterCustomers (filters) {
        this.setState({ filters: filters })
    }

    customerList (props) {
        const { customers, custom_fields } = this.state
        return <CustomerItem showCheckboxes={props.showCheckboxes} customers={customers} custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} updateCustomers={this.updateCustomers}
            deleteCustomer={this.deleteCustomer} toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    render () {
        const { searchText, status, company_id, group_settings_id, start_date, end_date } = this.state.filters
        const { custom_fields, customers, companies, error, view, filters } = this.state
        const fetchUrl = `/api/customers?search_term=${searchText}&status=${status}&company_id=${company_id}&group_settings_id=${group_settings_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = companies.length ? <AddCustomer
            custom_fields={custom_fields}
            action={this.updateCustomers}
            customers={customers}
            companies={companies}
        /> : null

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <CustomerFilters companies={companies} customers={customers}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterCustomers}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}

                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Customer"
                            bulk_save_url="/api/customer/bulk"
                            view={view}
                            disableSorting={['id']}
                            defaultColumn='name'
                            userList={this.customerList}
                            ignore={this.state.ignoredColumns}
                            fetchUrl={fetchUrl}
                            updateState={this.updateCustomers}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
