import React, { Component } from 'react'
import axios from 'axios'
import AddGroupSetting from './AddGroupSetting'
import { CardBody, Card } from 'reactstrap'
import DataTable from '../common/DataTable'
import ViewEntity from '../common/ViewEntity'
import GroupSettingFilters from './GroupSettingFilters'
import GroupSettingItem from './GroupSettingItem'

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
        this.userList = this.userList.bind(this)
        this.filterGroups = this.filterGroups.bind(this)
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

    filterGroups (filters) {
        this.setState({ filters: filters })
    }

    resetFilters () {
        this.props.reset()
    }

    userList () {
        const { groups, ignoredColumns } = this.state
        return <GroupSettingItem groups={groups}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
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
        const { view, groups } = this.state
        const fetchUrl = `/api/groups?search_term=${searchText}&status=${status}&start_date=${start_date}&end_date=${end_date} `

        return (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <GroupSettingFilters groups={groups}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={this.state.filters} filter={this.filterGroups}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>

                        <AddGroupSetting
                            groups={groups}
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
