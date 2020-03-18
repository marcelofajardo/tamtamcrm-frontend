import React, { Component } from 'react'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditCompany from './EditCompany'
import CompanyPresenter from '../presenters/CompanyPresenter'

export default class CompanyItem extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { brands, custom_fields, users, ignoredColumns } = this.props
        if (brands && brands.length) {
            return brands.map(brand => {
                const restoreButton = brand.deleted_at
                    ? <RestoreModal id={brand.id} entities={brands} updateState={this.props.addUserToState}
                        url={`/api/companies/restore/${brand.id}`}/> : null
                const archiveButton = !brand.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteBrand} id={brand.id}/> : null
                const deleteButton = !brand.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteBrand} id={brand.id}/> : null
                const editButton = !brand.deleted_at ? <EditCompany
                    custom_fields={custom_fields}
                    users={users}
                    brand={brand}
                    brands={brands}
                    action={this.props.addUserToState}
                /> : null

                const columnList = Object.keys(brand).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <CompanyPresenter key={key} toggleViewedEntity={this.props.toggleViewedEntity}
                        field={key} entity={brand}/>
                })
                return <tr key={brand.id}>
                    <td>
                        <Input value={brand.id} type="checkbox" onChange={this.props.onChangeBulk}/>
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
