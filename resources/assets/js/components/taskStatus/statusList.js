/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import EditTaskStatus from './EditTaskStatus'
import AddTaskStatus from './AddTaskStatus'
import { Button } from 'reactstrap'
import DataTable from '../common/DataTable'

export default class statusList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            statuses: [],
            errors: []
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)

        this.ignoredColumns = [
            'task_type_id'
        ]
    }

    addUserToState (statuses) {
        this.setState({ statuses: statuses })
    }

    userList () {
        if (this.state.statuses && this.state.statuses.length) {
            return this.state.statuses.map(status => {
                const columns = Object.keys(this.state.statuses[0])

                const columnList = columns.map(key => {
                    if (this.ignoredColumns && !this.ignoredColumns.includes(key)) {
                        return <td key={key}>{status[key]}</td>
                    }
                })
                return <tr key={status.id}>
                    <td>
                        <Button color="danger" onClick={() => this.deleteStatus(status.id)}>Delete</Button>
                        <EditTaskStatus status={status} statuses={this.state.statuses} action={this.addUserToState}/>
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

    deleteStatus (id) {
        const self = this
        axios.delete('/api/taskStatus/' + id)
            .then(function (response) {
                const arrStatuses = [...self.state.statuses]
                const index = arrStatuses.findIndex(status => status.id === id)
                arrStatuses.splice(index, 1)
                self.addUserToState(arrStatuses)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        const fetchUrl = '/api/taskStatus/search/'

        return (
            <div className="data-table m-md-3 m-0">

                <AddTaskStatus statuses={this.state.statuses} action={this.addUserToState}/>

                <DataTable
                    ignore={this.ignoredColumns}
                    userList={this.userList}
                    fetchUrl={fetchUrl}
                    updateState={this.addUserToState}
                />
            </div>
        )
    }
}
