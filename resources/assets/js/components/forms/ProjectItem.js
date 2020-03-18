import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditProject from './EditProject'

export default class ProjectItem extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const { projects, custom_fields, users, ignoredColumns } = this.props
        if (projects && projects.length) {
            return projects.map(project => {
                const restoreButton = project.deleted_at
                    ? <RestoreModal id={project.id} entities={projects} updateState={this.props.addUserToState}
                        url={`/api/projects/restore/${project.id}`}/> : null
                const archiveButton = !project.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteProject} id={project.id}/> : null
                const deleteButton = !project.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteProject} id={project.id}/> : null
                const editButton = !project.deleted_at ? <EditProject
                    listView={true}
                    custom_fields={custom_fields}
                    users={users}
                    project={project}
                    projects={projects}
                    action={this.props.addUserToState}
                /> : null

                const columnList = Object.keys(project).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.props.toggleViewedEntity(project, project.title)} data-label={key}
                        key={key}>{project[key]}</td>
                })
                return <tr key={project.id}>
                    <td>
                        <Input value={project.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
