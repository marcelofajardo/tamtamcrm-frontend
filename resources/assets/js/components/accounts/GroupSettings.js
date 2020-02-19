import React, { Component } from 'react'
import axios from 'axios'
import EditGroupSetting from './EditGroupSetting'
import AddGroupSetting from './AddGroupSetting'
import { CardBody, Card, FormGroup, Input, Col, Row } from 'reactstrap'
import DataTable from '../common/DataTable'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'
import DateFilter from '../common/DateFilter'

export default class GroupSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            groups: [],
            cachedData: [],
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            errors: [],
            ignoredColumns: ['settings', 'deleted_at', 'created_at'],
            filters: {
                searchText: '',
                status: 'active',
                start_date: '',
                end_date: ''
            }
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
        this.userList = this.userList.bind(this)
        this.filterGroups = this.filterGroups.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
    }

    addUserToState (groups) {
        const cachedData = !this.state.cachedData.length ? groups : this.state.cachedData
        this.setState({
            groups: groups,
            cachedData: cachedData
        })
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('settings') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    filterGroups (event) {
        console.log('event', event)

        if ('start_date' in event) {
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    start_date: event.start_date,
                    end_date: event.end_date
                }
            }))
            return
        }

        const column = event.target.name
        const value = event.target.value

        if (value === 'all') {
            const updatedRowState = this.state.filters.filter(filter => filter.column !== column)
            this.setState({ filters: updatedRowState })
            return true
        }

        const showRestoreButton = column === 'status' && value === 'archived'

        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [column]: value
            },
            showRestoreButton: showRestoreButton
        }))

        return true
    }

    resetFilters () {
        this.props.reset()
    }

    getFilters () {
        const columnFilter = this.state.groups.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns} columns={Object.keys(this.state.groups[0])}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterGroups}/>
                </Col>

                <Col md={2}>
                    {columnFilter}
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterGroups}
                            name="status"
                            id="status_id"
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
                        <DateFilter onChange={this.filterGroups} update={this.addUserToState}
                            data={this.state.cachedData}/>
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    userList () {
        const { groups, ignoredColumns } = this.state
        if (groups && groups.length) {
            return this.state.groups.map(group => {
                const restoreButton = group.deleted_at
                    ? <RestoreModal id={group.id} entities={groups} updateState={this.addUserToState}
                        url={`/api/groups/restore/${group.id}`}/> : null
                const deleteButton = !group.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteGroup} id={group.id}/> : null
                const archiveButton = !group.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteGroup} id={group.id}/> : null

                const editButton = !group.deleted_at ? <EditGroupSetting
                    groups={groups}
                    group={group}
                    action={this.addUserToState}
                /> : null

                const columnList = Object.keys(group).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.toggleViewedEntity(group, group.name)} data-label={key}
                        key={key}>{group[key]}</td>
                })

                return <tr key={group.id}>
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

    deleteGroup (id, archive = true) {
        const url = archive === true ? `/api/groups/archive/${id}` : `/api/groups/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrGroups = [...self.state.groups]
                const index = arrGroups.findIndex(group => group.id === id)
                arrGroups.splice(index, 1)
                self.addUserToState(arrGroups)
            })
            .catch(function (error) {
                console.log(error)
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
        const { searchText, status, start_date, end_date } = this.state.filters
        const { view } = this.state
        const fetchUrl = `/api/groups?search_term=${searchText}&status=${status}&start_date=${start_date}&end_date=${end_date} `
        const filters = this.getFilters()

        return (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <FilterTile filters={filters}/>

                        <AddGroupSetting
                            groups={this.state.groups}
                            action={this.addUserToState}
                        />

                        <DataTable
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
