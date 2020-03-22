import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import axios from 'axios'
import AddCredit from './AddCredit'
import {
    Card, CardBody
} from 'reactstrap'
import ViewEntity from '../common/ViewEntity'
import CreditFilters from './CreditFilters'
import CreditItem from './CreditItem'

export default class Credits extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
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
            ignoredColumns: [
                'id',
                'type_id',
                'terms',
                'footer',
                'private_notes',
                'public_notes',
                'invoice_id',
                'user_id',
                'created_at',
                'invitations',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
                'custom_surcharge1',
                'custom_surcharge_tax1',
                'custom_surcharge2',
                'custom_surcharge_tax2',
                'custom_surcharge3',
                'custom_surcharge_tax3',
                'custom_surcharge4',
                'custom_surcharge_tax4',
                'design_id'
            ],
            // columns: ['Number', 'Customer', 'Total', 'Status'],
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
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)

        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer', 'notes', 'terms', 'footer', 'user_id', 'invoice_id') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
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
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ bulk: options })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/credit/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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
        const { credits, customers, custom_fields, ignoredColumns } = this.state
        return <CreditItem credits={credits} customers={customers} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} updateCustomers={this.updateCustomers}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    render () {
        const { customers, credits, custom_fields, view, filters } = this.state
        const fetchUrl = `/api/credits?search_term=${this.state.filters.searchText}&status=${this.state.filters.status_id}&customer_id=${this.state.filters.customer_id} &start_date=${this.state.filters.start_date}&end_date=${this.state.filters.end_date}`
        const addButton = customers.length ? <AddCredit
            custom_fields={custom_fields}
            customers={customers}
            action={this.updateCustomers}
            credits={credits}
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

                <ViewEntity
                    ignore={[]}
                    toggle={this.toggleViewedEntity}
                    title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}
                    entity_type="Credit"
                />
            </div>
        ) : null
    }
}
