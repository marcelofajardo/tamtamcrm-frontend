import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditUser from './EditUser'
import UserPresenter from '../presenters/UserPresenter'

export default class UserItem extends Component {
    constructor (props) {
        super(props)

        this.deleteUser = this.deleteUser.bind(this)
    }

    deleteUser (id, archive = false) {
        const url = archive === true ? `/api/users/archive/${id}` : `/api/users/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrUsers = [...self.props.users]
                const index = arrUsers.findIndex(user => user.id === id)
                arrUsers.splice(index, 1)
                self.props.addUserToState(arrUsers)
            })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    render () {
        const { users, departments, custom_fields, ignoredColumns } = this.props

        if (users && users.length) {
            return users.map(user => {
                const restoreButton = user.deleted_at
                    ? <RestoreModal id={user.id} entities={users} updateState={this.props.addUserToState}
                        url={`/api/users/restore/${user.id}`}/> : null
                const archiveButton = !user.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteUser} id={user.id}/> : null
                const deleteButton = !user.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteUser} id={user.id}/> : null
                const editButton = !user.deleted_at
                    ? <EditUser accounts={this.props.accounts} departments={departments} user_id={user.id}
                        custom_fields={custom_fields} users={users}
                        action={this.props.addUserToState}/> : null

                const columnList = Object.keys(user).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <UserPresenter key={key} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={user}/>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return <tr key={user.id}>
                    <td>
                        <Input className={checkboxClass} value={user.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
