import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import EditLead from './EditLeadForm'
import ActionsMenu from '../common/ActionsMenu'

export default class LeadItem extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const { leads, custom_fields, users, ignoredColumns } = this.props
        if (leads && leads.length) {
            return leads.map(lead => {
                const restoreButton = lead.deleted_at
                    ? <RestoreModal id={lead.id} entities={leads} updateState={this.props.addUserToState}
                        url={`/api/leads/restore/${lead.id}`}/> : null
                const archiveButton = !lead.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteLead} id={lead.id}/> : null
                const deleteButton = !lead.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteLead} id={lead.id}/> : null
                const editButton = !lead.deleted_at ? <EditLead
                    listView={true}
                    custom_fields={custom_fields}
                    users={users}
                    lead={lead}
                    leads={leads}
                    action={this.props.addUserToState}
                /> : null

                const columnList = Object.keys(lead).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.props.toggleViewedEntity(lead, lead.title)} data-label={key}
                        key={key}>{lead[key]}</td>
                })
                return <tr key={lead.id}>
                    <td>
                        <Input value={lead.id} type="checkbox" onChange={this.props.onChangeBulk} />
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
