import React, { Component } from 'react'
import axios from 'axios'
import AddLead from './AddLeadForm'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import ViewEntity from '../common/ViewEntity'
import LeadFilters from './LeadFilters'
import LeadItem from './LeadItem'

export default class Leads extends Component {
    constructor (props) {
        super(props)

        this.state = {
            leads: [],
            cachedData: [],
            errors: [],
            bulk: [],
            dropdownButtonActions: ['download'],
            error: '',
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            custom_fields: [],
            ignoredColumns: [
                'created_at',
                'deleted_at',
                'updated_at',
                'address_1',
                'address_2',
                'is_deleted',
                'archived_at',
                'account_id',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
                'city',
                'zip',
                'source_type',
                'valued_at',
                'company_name',
                'job_title',
                'website',
                'private_notes',
                'public_notes',
                'user_id',
                'assigned_user_id',
                'task_status',
                'id'
            ],
            showRestoreButton: false
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.deleteLead = this.deleteLead.bind(this)
        this.filterLeads = this.filterLeads.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('settings') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    addUserToState (leads) {
        const cachedData = !this.state.cachedData.length ? leads : this.state.cachedData
        this.setState({
            leads: leads,
            cachedData: cachedData
        })
    }

    onChangeBulk (e) {
        // current array of options
        const options = this.state.bulk
        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(+e.target.value)
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
        axios.post('/api/lead/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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

    filterLeads (filters) {
        this.setState({ filters: filters })
    }

    userList () {
        const { leads, custom_fields, users, ignoredColumns } = this.state
        return <LeadItem leads={leads} users={users} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            deleteLead={this.deleteLead} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    deleteLead (id, archive = true) {
        const self = this
        const url = archive === true ? `/api/leads/archive/${id}` : `/api/leads/${id}`

        axios.delete(url)
            .then(function (response) {
                const arrLeads = [...self.state.leads]
                const index = arrLeads.findIndex(lead => lead.id === id)
                arrLeads.splice(index, 1)
                self.addUserToState(arrLeads)
            })
            .catch(function (error) {
                console.log(error)
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Lead')
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

    getUsers () {
        axios.get('api/users')
            .then((r) => {
                this.setState({
                    users: r.data
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    render () {
        const { leads, users, custom_fields, ignoredColumns, view } = this.state
        const { status_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/leads?search_term=${searchText}&status=${status_id}&start_date=${start_date}&end_date=${end_date}`
        const { error } = this.state

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <LeadFilters leads={leads} updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={this.state.filters} filter={this.filterLeads}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        <AddLead users={users} leads={leads} action={this.addUserToState}
                            custom_fields={custom_fields}/>

                        <DataTable
                            disableSorting={['id']}
                            defaultColumn='title'
                            ignore={ignoredColumns}
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.addUserToState}
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
