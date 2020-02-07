import React, { Component } from 'react'
import axios from 'axios'
import EditTask from './EditTask'
import AddTask from './AddTask'
import DataTable from '../common/DataTable'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import { Form, FormGroup, Input, Card, CardBody, Button } from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import UserDropdown from '../common/UserDropdown'
import CustomerDropdown from '../common/CustomerDropdown'
import TaskStatusDropdown from '../common/TaskStatusDropdown'
import ActionsMenu from '../common/ActionsMenu'
import KanbanFilter from '../KanbanFilter'
import TableSearch from '../common/TableSearch'
import ViewEntity from '../common/ViewEntity'

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
                searchText: ''
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
        this.deleteTask = this.deleteTask.bind(this)
        this.filterTasks = this.filterTasks.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.getCustomers = this.getCustomers.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomers()
        this.getCustomFields()
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
        this.setState({ ignoredColumns: columns.concat('settings') }, function () {
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

    getFilters () {
        const columnFilter = this.state.tasks.length
            ? <DisplayColumns onChange={this.updateIgnoredColumns} columns={Object.keys(this.state.tasks[0])}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <AddTask modal={true} users={this.state.users} tasks={this.state.tasks} action={this.addUserToState}
                        custom_fields={this.state.custom_fields}/>
                </FormGroup>

                <TableSearch onChange={this.filterTasks}/>

                {columnFilter}

                <UserDropdown
                    renderErrorFor={this.renderErrorFor}
                    handleInputChanges={this.filterTasks}
                    users={this.props.users}
                    name="user_id"
                />

                <CustomerDropdown
                    customer={this.state.filters.customer_id}
                    renderErrorFor={this.renderErrorFor}
                    handleInputChanges={this.filterTasks}
                />

                <TaskStatusDropdown
                    task_type={this.props.task_type}
                    renderErrorFor={this.renderErrorFor}
                    handleInputChanges={this.filterTasks}
                />

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type='select'
                        onChange={this.filterTasks}
                        id="status_id"
                        name="status_id"
                    >
                        <option value="">Select Status</option>
                        <option value='active'>Active</option>
                        <option value='archived'>Archived</option>
                        <option value='deleted'>Deleted</option>
                    </Input>
                </FormGroup>
            </Form>
        )
    }

    userList () {
        const { tasks, custom_fields, users, ignoredColumns } = this.state
        if (tasks && tasks.length) {
            return this.state.tasks.map(task => {
                const restoreButton = task.deleted_at
                    ? <RestoreModal id={task.id} entities={tasks} updateState={this.addUserToState}
                        url={`/api/tasks/restore/${task.id}`}/> : null
                const archiveButton = !task.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteTask} id={task.id}/> : null
                const deleteButton = !task.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteTask} id={task.id}/> : null
                const editButton = !task.deleted_at ? <EditTask
                    modal={true}
                    listView={true}
                    custom_fields={custom_fields}
                    users={users}
                    task={task}
                    tasks={tasks}
                    action={this.addUserToState}
                /> : null

                const columnList = Object.keys(task).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.toggleViewedEntity(task, task.title)} data-label={key} key={key}>{task[key]}</td>
                })
                return <tr key={task.id}>
                    <td>
                        <ActionsMenu edit={editButton} delete={deleteButton} archive={archiveButton}
                            restore={restoreButton}/>
                    </td>
                    {columnList}
                </tr>
            })
        } else {
            return <tr>
                <td className="text-center">No Records Found.</td>
            </tr>
        }
    }

    deleteTask (id, archive = true) {
        const self = this
        const url = archive === true ? `/api/tasks/archive/${id}` : `/api/tasks/${id}`

        axios.delete(url)
            .then(function (response) {
                const arrTasks = [...self.state.tasks]
                const index = arrTasks.findIndex(task => task.id === id)
                arrTasks.splice(index, 1)
                self.addUserToState(arrTasks)
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
        const { project_id, task_status, task_type, customer_id, user_id, searchText } = this.state.filters
        const fetchUrl = `/api/tasks?search_term=${searchText}&project_id=${project_id}&task_status=${task_status}&task_type=${task_type}&customer_id=${customer_id}&user_id=${user_id}`
        const { error, view } = this.state
        const filters = <KanbanFilter task_type={1} users={this.state.users} customers={this.state.customers}
            handleFilters={this.filterTasks}/>
        const table = <DataTable
            disableSorting={['id']}
            defaultColumn='title'
            ignore={this.state.ignoredColumns}
            userList={this.userList}
            fetchUrl={fetchUrl}
            updateState={this.addUserToState}
        />

        return (
            <div className="data-table m-md-3 m-0">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>

                        <div>
                            {filters}
                        </div>

                        <Button color="primary" onClick={() => {
                            location.href = '/#/kanban/projects'
                        }}>Kanban view </Button>

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
