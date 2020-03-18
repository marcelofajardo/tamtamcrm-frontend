import React, { Component } from 'react'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditTaxRate from './EditTaxRate'

export default class TaxRateItem extends Component {
    constructor (props) {
        super(props)

        this.state = {

        }
    }

    render () {
        const { taxRates, ignoredColumns } = this.props
        if (taxRates && taxRates.length) {
            return taxRates.map(taxRate => {
                const restoreButton = taxRate.deleted_at
                    ? <RestoreModal id={taxRate.id} entities={taxRates} updateState={this.props.addUserToState}
                        url={`/api/taxRate/restore/${taxRate.id}`}/> : null

                const deleteButton = !taxRate.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.props.deleteTaxRate} id={taxRate.id}/> : null

                const archiveButton = !taxRate.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.props.deleteTaxRate} id={taxRate.id}/> : null

                const editButton = !taxRate.deleted_at
                    ? <EditTaxRate taxRate={taxRate} taxRates={taxRates} action={this.props.addUserToState}/>
                    : null

                const columnList = Object.keys(taxRate).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.props.toggleViewedEntity(taxRate, taxRate.name)} data-label={key}
                        key={key}>{taxRate[key]}</td>
                })

                return <tr key={taxRate.id}>
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
}
