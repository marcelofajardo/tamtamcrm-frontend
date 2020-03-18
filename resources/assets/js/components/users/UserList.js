import React, { Component } from 'react'
import axios from 'axios'
import AddUser from './AddUser'
import {
    Card, CardBody
} from 'reactstrap'
import DataTable from '../common/DataTable'
import ViewEntity from '../common/ViewEntity'
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
        this.deleteUser = this.deleteUser.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
        this.getAccounts = this.getAccounts.bind(this)
        this.getDepartments = this.getDepartments.bind(this)
    }

    componentDidMount () {
        this.getDepartments()
        this.getAccounts()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer', 'account_users') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
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
        axios.post(`/api/user/bulk/${action}`, { ids: this.state.bulk }).then(function (response) {
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

    userList () {
        const { users, departments, custom_fields, ignoredColumns, accounts } = this.state
        return <UserItem accounts={accounts} departments={departments} users={users} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            deleteUser={this.deleteUser} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    deleteUser (id, archive = true) {
        const url = archive === true ? `/api/users/archive/${id}` : `/api/users/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrUsers = [...self.state.users]
                const index = arrUsers.findIndex(user => user.id === id)
                arrUsers.splice(index, 1)
                self.addUserToState(arrUsers)
            })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
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
                            disableSorting={['id']}
                            defaultColumn='last_name'
                            ignore={this.state.ignoredColumns}
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
