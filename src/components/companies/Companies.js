import React, { Component } from 'react'
import axios from 'axios'
import AddCompany from './AddCompany'
import DataTable from '../common/DataTable'
import {
    Card,
    CardBody
} from 'reactstrap'
import CompanyFilters from './CompanyFilters'
import CompanyItem from './CompanyItem'

export default class Companies extends Component {
    constructor (props) {
        super(props)

        this.state = {
            users: [],
            brands: [],
            bulk: [],
            cachedData: [],
            errors: [],
            dropdownButtonActions: ['download'],
            error: '',
            view: {
                ignore: ['assigned_user_id', 'country_id', 'currency_id', 'industry_id', 'user_id'],
                viewMode: false,
                viewedId: null,
                title: null
            },
            filters: {
                status_id: 'active',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            custom_fields: [],
            ignoredColumns: [
                'contacts',
                'deleted_at',
                'created_at',
                'address_1',
                'company_logo',
                'address_2',
                'postcode',
                'town',
                'city',
                'token',
                'currency_id',
                'industry_id',
                'country_id',
                'user_id',
                'assigned_user_id',
                'private_notes',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4'
            ],
            showRestoreButton: false
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.filterCompanies = this.filterCompanies.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomFields()
    }

    addUserToState (brands) {
        this.setState({ brands: brands })
    }

    filterCompanies (filters) {
        this.setState({ filters: filters })
    }

    userList (props) {
        const { brands, custom_fields, users } = this.state
        return <CompanyItem showCheckboxes={props.showCheckboxes} brands={brands} users={users}
            custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Company')
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
        const { custom_fields, users, error, view, brands } = this.state
        const { searchText, status_id, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/companies?search_term=${searchText}&status=${status_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = users.length
            ? <AddCompany brands={brands} users={users} action={this.addUserToState}
                custom_fields={custom_fields}/> : null

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <CompanyFilters brands={brands} updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={this.state.filters} filter={this.filterCompanies}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}

                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Company"
                            bulk_save_url="/api/company/bulk"
                            view={view}
                            disableSorting={['id']}
                            defaultColumn='name'
                            ignore={this.state.ignoredColumns}
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
