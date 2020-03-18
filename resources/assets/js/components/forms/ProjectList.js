import React, { Component } from 'react'
import axios from 'axios'
import AddProject from './AddStory'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import ViewEntity from '../common/ViewEntity'
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
        this.deleteProject = this.deleteProject.bind(this)
        this.filterProjects = this.filterProjects.bind(this)
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

    addUserToState (projects) {
        const cachedData = !this.state.cachedData.length ? projects : this.state.cachedData
        this.setState({
            projects: projects,
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
        axios.post('/api/project/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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

    filterProjects (filters) {
        this.setState({ filters: filters })
    }

    userList () {
        const { projects, custom_fields, users, ignoredColumns } = this.state
        return <ProjectItem projects={projects} users={users} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            deleteProject={this.deleteProject} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    deleteProject (id, archive = true) {
        const self = this
        const url = archive === true ? `/api/projects/archive/${id}` : `/api/projects/${id}`

        axios.delete(url)
            .then(function (response) {
                const arrProjects = [...self.state.projects]
                const index = arrProjects.findIndex(project => project.id === id)
                arrProjects.splice(index, 1)
                self.addUserToState(arrProjects)
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
