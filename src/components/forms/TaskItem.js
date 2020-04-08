import axios from 'axios'
import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditTask from './EditTask'
import TaskPresenter from '../presenters/TaskPresenter'

export default class TaskItem extends Component {
    constructor (props) {
        super(props)

        this.deleteTask = this.deleteTask.bind(this)
    }

    deleteTask (id, archive = false) {
        const self = this
        const url = archive === true ? `/api/tasks/archive/${id}` : `/api/tasks/${id}`

        axios.delete(url)
            .then(function (response) {
                const arrTasks = [...self.props.tasks]
                const index = arrTasks.findIndex(task => task.id === id)
                arrTasks.splice(index, 1)
                self.props.addUserToState(arrTasks)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        const { tasks, custom_fields, users, ignoredColumns } = this.props
        if (tasks && tasks.length && users.length) {
            return tasks.map(task => {
                const restoreButton = task.deleted_at
                    ? <RestoreModal id={task.id} entities={tasks} updateState={this.props.addUserToState}
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
                    allTasks={tasks}
                    action={this.props.addUserToState}
                /> : null

                const columnList = Object.keys(task).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <TaskPresenter key={key} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={task} custom_fields={custom_fields}
                        users={users}
                        customers={this.props.customers}
                        tasks={tasks}
                        action={this.props.action}
                        task={task}/>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return <tr key={task.id}>
                    <td>
                        <Input className={checkboxClass} value={task.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
}
