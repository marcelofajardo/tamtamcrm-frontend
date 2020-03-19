import React, { Component } from 'react'
import axios from 'axios'
import AddCustomer from './AddCustomer'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import ViewEntity from '../common/ViewEntity'
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
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
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

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer', 'company', 'billing', 'shipping') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
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

    onChangeBulk (e) {
        // current array of options
        const options = this.state.bulk
        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ bulk: options })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/customer/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
            // const arrQuotes = [...self.state.invoices]
            // const index = arrQuotes.findIndex(payment => payment.id === id)
            // arrQuotes.splice(index, 1)
            // self.updateInvoice(arrQuotes)
        })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
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

    renderErrorFor () {

    }

    filterCustomers (filters) {
        this.setState({ filters: filters })
    }

    toggleViewedEntity (id, title = null) {
        this.setState({
            view: {
                ...this.state.view,
                viewMode: !this.state.view.viewMode,
                viewedId: id,
                title: title
            }
        }, () => console.log('view', this.state.view))
    }

    customerList () {
        const { customers, custom_fields, ignoredColumns } = this.state
        return <CustomerItem customers={customers} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} updateCustomers={this.updateCustomers}
            deleteCustomer={this.deleteCustomer} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
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
                            disableSorting={['id']}
                            defaultColumn='name'
                            userList={this.customerList}
                            ignore={this.state.ignoredColumns}
                            fetchUrl={fetchUrl}
                            updateState={this.updateCustomers}
                        />
                    </CardBody>
                </Card>

                <ViewEntity ignore={[]} toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}/>
            </div>
        )
    }
}
