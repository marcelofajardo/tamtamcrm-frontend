import React, { Component } from 'react'
import axios from 'axios'
import EditProject from './EditProject'
import AddProject from './AddStory'
import DataTable from '../common/DataTable'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import { FormGroup, Input, Card, CardBody, Row, Col } from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import CustomerDropdown from '../common/CustomerDropdown'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'
import DateFilter from '../common/DateFilter'

export default class ProjectList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            projects: [],
            cachedData: [],
            errors: [],
            error: '',
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: ''
            },
            custom_fields: [],
            ignoredColumns: [
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
        this.getFilters = this.getFilters.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
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

    filterProjects (event) {
        const column = event.target.id
        const value = event.target.value

        if (value === 'all') {
            const updatedRowState = this.state.filters.filter(filter => filter.column !== column)
            this.setState({ filters: updatedRowState })
            return true
        }

        const showRestoreButton = column === 'status_id' && value === 'archived'

        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [column]: value
            },
            showRestoreButton: showRestoreButton
        }))

        return true
    }

    getFilters () {
        const columnFilter = this.state.projects.length
            ? <DisplayColumns onChange={this.updateIgnoredColumns} columns={Object.keys(this.state.projects[0])}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterProjects}/>
                </Col>

                <Col md={2}>
                    {columnFilter}
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        customer={this.state.filters.customer_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.filterProjects}
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterProjects}
                            id="status_id"
                            name="status_id"
                        >
                            <option value="">Select Status</option>
                            <option value='active'>Active</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter update={this.addUserToState}
                            data={this.state.cachedData}/>
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    userList () {
        const { projects, custom_fields, users, ignoredColumns } = this.state
        if (projects && projects.length) {
            return projects.map(project => {
                const restoreButton = project.deleted_at
                    ? <RestoreModal id={project.id} entities={projects} updateState={this.addUserToState}
                        url={`/api/projects/restore/${project.id}`}/> : null
                const archiveButton = !project.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteProject} id={project.id}/> : null
                const deleteButton = !project.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteProject} id={project.id}/> : null
                const editButton = !project.deleted_at ? <EditProject
                    listView={true}
                    custom_fields={custom_fields}
                    users={users}
                    project={project}
                    projects={projects}
                    action={this.addUserToState}
                /> : null

                const columnList = Object.keys(project).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.toggleViewedEntity(project, project.title)} data-label={key}
                        key={key}>{project[key]}</td>
                })
                return <tr key={project.id}>
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
        const { projects, users, custom_fields, ignoredColumns, view } = this.state
        const { status_id, customer_id, searchText } = this.state.filters
        const fetchUrl = `/api/projects?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}`
        const { error } = this.state
        const filters = this.getFilters()

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <FilterTile filters={filters}/>
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
