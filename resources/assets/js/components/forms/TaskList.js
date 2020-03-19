import React, { Component } from 'react'
import axios from 'axios'
import DataTable from '../common/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import ViewEntity from '../common/ViewEntity'
import TaskFilters from './TaskFilters'
import TaskItem from './TaskItem'
import AddModal from './AddTask'

export default class TaskList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            tasks: [],
            users: [],
            customers: [],
            errors: [],
            kanban: false,
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            error: '',
            filters: {
                project_id: '',
                status_id: 'active',
                task_status: '',
                user_id: '',
                customer_id: '',
                task_type: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            custom_fields: [],

            ignoredColumns: [
                'deleted_at',
                'users',
                'customer',
                'contributors',
                'users',
                'comments',
                'is_completed',
                'task_status',
                'task_type',
                'rating',
                'customer_id',
                'user_id',
                'valued_at',
                'rating',
                'is_active',
                'source_type',
                'start_time',
                'duration',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
                'is_deleted',
                'time_log',
                'project_id',
                'is_running',
                'task_status_sort_order',
                'notes'
            ],
            showRestoreButton: false
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
        this.filterTasks = this.filterTasks.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getCustomers = this.getCustomers.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomers()
        this.getCustomFields()
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

    updateIgnoredColumns (columns) {
        console.log('columns', columns)
        this.setState({ ignoredColumns: columns.concat('comments', 'customer', 'users', 'contributors') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    addUserToState (tasks) {
        this.setState({ tasks: tasks })
    }

    filterTasks (filters) {
        console.log('filters', filters)
        this.setState({ filters: filters })

        return true
    }

    userList () {
        const { tasks, custom_fields, users, ignoredColumns } = this.state

        return <TaskItem tasks={tasks} users={users} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Task')
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

    getCustomers () {
        axios.get('api/customers')
            .then((r) => {
                this.setState({
                    customers: r.data
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
        const { tasks, users, customers, custom_fields } = this.state
        const { project_id, task_status, task_type, customer_id, user_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/tasks?search_term=${searchText}&project_id=${project_id}&task_status=${task_status}&task_type=${task_type}&customer_id=${customer_id}&user_id=${user_id}&start_date=${start_date}&end_date=${end_date}`
        const { error, view } = this.state
        const table = <DataTable
            disableSorting={['id']}
            defaultColumn='title'
            ignore={this.state.ignoredColumns}
            userList={this.userList}
            fetchUrl={fetchUrl}
            updateState={this.addUserToState}
        />

        const addButton = customers.length && users.length ? <AddModal
            custom_fields={custom_fields}
            modal={true}
            status={1}
            task_type={1}
            customers={customers}
            users={users}
            action={this.addUserToState}
            tasks={tasks}
        /> : null

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>

                        <div>
                            <TaskFilters users={users} tasks={tasks} updateIgnoredColumns={this.updateIgnoredColumns}
                                filters={this.state.filters} filter={this.filterTasks}
                                saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        </div>

                        <Button color="primary" onClick={() => {
                            location.href = '/#/kanban/projects'
                        }}>Kanban view </Button>

                        {addButton}

                        {table}
                    </CardBody>
                </Card>

                <ViewEntity ignore={[]} toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}/>
            </div>
        )
    }
}
