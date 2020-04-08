import React, { Component } from 'react'
import axios from 'axios'
import AddProject from './AddStory'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import ProjectFilters from './ProjectFilters'
import ProjectItem from './ProjectItem'

export default class ProjectList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            projects: [],
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
                'created_at',
                'deleted_at',
                'updated_at',
                'is_completed',
                'customer_id',
                'is_deleted',
                'archived_at',
                'task_rate',
                'account_id',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4',
                'user_id',
                'assigned_user_id',
                'notes'
            ],
            showRestoreButton: false
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.filterProjects = this.filterProjects.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomFields()
    }

    addUserToState (projects) {
        const cachedData = !this.state.cachedData.length ? projects : this.state.cachedData
        this.setState({
            projects: projects,
            cachedData: cachedData
        })
    }

    filterProjects (filters) {
        this.setState({ filters: filters })
    }

    userList (props) {
        const { projects, custom_fields, users } = this.state
        return <ProjectItem showCheckboxes={props.showCheckboxes} projects={projects} users={users}
            custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Project')
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
        const { projects, users, custom_fields, ignoredColumns, view, error } = this.state
        const { status_id, customer_id, searchText, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/projects?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}`

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <ProjectFilters projects={projects} updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={this.state.filters} filter={this.filterProjects}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        <AddProject users={users} projects={projects} action={this.addUserToState}
                            custom_fields={custom_fields}/>

                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Project"
                            bulk_save_url="/api/project/bulk"
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
