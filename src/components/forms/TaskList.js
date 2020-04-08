import React, { Component } from 'react'
import axios from 'axios'
import DataTable from '../common/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import TaskFilters from './TaskFilters'
import TaskItem from './TaskItem'
import AddModal from './AddTask'

export default class TaskList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            dropdownButtonActions: ['download'],
            tasks: [],
            users: [],
            customers: [],
            errors: [],
            kanban: false,
            view: {
                ignore: [],
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
                'public_notes',
                'private_notes',
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
        this.filterTasks = this.filterTasks.bind(this)
        this.getCustomers = this.getCustomers.bind(this)
        this.getUsers = this.getUsers.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomers()
        this.getCustomFields()
    }

    addUserToState (tasks) {
        this.setState({ tasks: tasks })
    }

    filterTasks (filters) {
        console.log('filters', filters)
        this.setState({ filters: filters })

        return true
    }

    userList (props) {
        const { tasks, custom_fields, users, customers } = this.state

        return <TaskItem showCheckboxes={props.showCheckboxes} action={this.addUserToState} tasks={tasks} users={users}
            custom_fields={custom_fields} customers={customers}
            ignoredColumns={props.ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
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
            dropdownButtonActions={this.state.dropdownButtonActions}
            entity_type="Task"
            bulk_save_url="/api/task/bulk"
            view={view}
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
            </div>
        )
    }
}
