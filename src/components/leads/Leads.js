import React, { Component } from 'react'
import axios from 'axios'
import AddLead from './AddLeadForm'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
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
                ignore: [],
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
                'industry_id',
                'emails',
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
        this.filterLeads = this.filterLeads.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomFields()
    }

    addUserToState (leads) {
        const cachedData = !this.state.cachedData.length ? leads : this.state.cachedData
        this.setState({
            leads: leads,
            cachedData: cachedData
        })
    }

    filterLeads (filters) {
        this.setState({ filters: filters })
    }

    userList (props) {
        const { leads, custom_fields, users } = this.state
        return <LeadItem showCheckboxes={props.showCheckboxes} leads={leads} users={users} custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
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
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Lead"
                            bulk_save_url="/api/lead/bulk"
                            view={view}
                            disableSorting={['id']}
                            defaultColumn='title'
                            ignore={ignoredColumns}
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.addUserToState}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
