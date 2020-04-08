import React, { Component } from 'react'
import axios from 'axios'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditGroupSetting from './EditGroupSetting'
import { Input } from 'reactstrap'

export default class GroupSettingItem extends Component {
    constructor (props) {
        super(props)

        this.deleteGroup = this.deleteGroup.bind(this)
    }

    deleteGroup (id, archive = false) {
        const url = archive === true ? `/api/groups/archive/${id}` : `/api/groups/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrGroups = [...self.props.groups]
                const index = arrGroups.findIndex(group => group.id === id)
                arrGroups.splice(index, 1)
                self.props.addUserToState(arrGroups)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        const { groups, ignoredColumns } = this.props
        if (groups && groups.length) {
            return groups.map(group => {
                const restoreButton = group.deleted_at
                    ? <RestoreModal id={group.id} entities={groups} updateState={this.props.addUserToState}
                        url={`/api/groups/restore/${group.id}`}/> : null
                const deleteButton = !group.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteGroup} id={group.id}/> : null
                const archiveButton = !group.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteGroup} id={group.id}/> : null

                const editButton = !group.deleted_at ? <EditGroupSetting
                    groups={groups}
                    group={group}
                    action={this.props.addUserToState}
                /> : null

                const columnList = Object.keys(group).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.props.toggleViewedEntity(group, group.name)} data-label={key}
                        key={key}>{group[key]}</td>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return <tr key={group.id}>
                    <td>
                        <Input className={checkboxClass} value={group.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
