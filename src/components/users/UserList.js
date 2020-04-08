import React, { Component } from 'react'
import axios from 'axios'
import AddUser from './AddUser'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import UserItem from './UserItem'
import UserFilters from './UserFilters'

export default class UserList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            users: [],
            cachedData: [],
            departments: [],
            accounts: [],
            custom_fields: [],
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
                start_date: '',
                end_date: '',
                status: 'active',
                role_id: '',
                department_id: '',
                searchText: ''
            },
            ignoredColumns: [
                'account_users',
                'department',
                'phone_number',
                'job_description',
                'gender',
                'dob',
                'username',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
                'deleted_at',
                'created_at'
            ],
            showRestoreButton: false
        }

        this.cachedResults = []
        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.filterUsers = this.filterUsers.bind(this)
        this.getAccounts = this.getAccounts.bind(this)
        this.getDepartments = this.getDepartments.bind(this)
    }

    componentDidMount () {
        this.getDepartments()
        this.getAccounts()
        this.getCustomFields()
    }

    filterUsers (filters) {
        this.setState({ filters: filters })
    }

    renderErrorFor () {

    }

    getCustomFields () {
        axios.get('api/accounts/fields/User')
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

    getAccounts () {
        axios.get('/api/accounts')
            .then((r) => {
                console.log('accounts', r.data)
                this.setState({
                    accounts: r.data
                })
            })
            .catch((e) => {
                alert(e)
                console.error(e)
            })
    }

    getDepartments () {
        axios.get('/api/departments')
            .then((r) => {
                this.setState({
                    departments: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    addUserToState (users) {
        const cachedData = !this.state.cachedData.length ? users : this.state.cachedData
        this.setState({
            users: users,
            cachedData: cachedData
        })
    }

    userList (props) {
        const { users, departments, custom_fields, accounts } = this.state
        return <UserItem showCheckboxes={props.showCheckboxes} accounts={accounts} departments={departments}
            users={users} custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    render () {
        const { users, departments, custom_fields, error, view, filters } = this.state
        const { status, role_id, department_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/users?search_term=${searchText}&status=${status}&role_id=${role_id}&department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = departments.length
            ? <AddUser accounts={this.state.accounts} custom_fields={custom_fields} departments={departments}
                users={users}
                action={this.addUserToState}/> : null

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <UserFilters users={users} departments={departments}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterUsers}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}
                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="User"
                            bulk_save_url="/api/user/bulk"
                            view={view}
                            disableSorting={['id']}
                            defaultColumn='last_name'
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
