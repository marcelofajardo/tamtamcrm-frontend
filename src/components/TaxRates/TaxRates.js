import React, { Component } from 'react'
import AddTaxRate from './AddTaxRate'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import TaxRateFilters from './TaxRateFilters'
import TaxRateItem from './TaxRateItem'

export default class TaxRates extends Component {
    constructor (props) {
        super(props)

        this.state = {
            taxRates: [],
            cachedData: [],
            dropdownButtonActions: ['download'],
            filters: {
                status_id: 'active',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            view: {
                ignore: [],
                viewMode: false,
                viewedId: null,
                title: null
            },
            ignoredColumns: [
                'created_at',
                'deleted_at',
                'updated_at'
            ],
            errors: [],
            error: '',
            showRestoreButton: false
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.filterTaxRates = this.filterTaxRates.bind(this)
    }

    addUserToState (taxRates) {
        const cachedData = !this.state.cachedData.length ? taxRates : this.state.cachedData
        this.setState({
            taxRates: taxRates,
            cachedData: cachedData
        })
    }

    filterTaxRates (filters) {
        this.setState({ filters: filters })
    }

    resetFilters () {
        this.props.reset()
    }

    userList (props) {
        const { taxRates } = this.state
        return <TaxRateItem showCheckboxes={props.showCheckboxes} taxRates={taxRates}
            ignoredColumns={props.ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
    }

    render () {
        const { taxRates, error, view, filters } = this.state
        const { searchText, status_id, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/taxRates?search_term=${searchText}&status=${status_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = <AddTaxRate taxRates={taxRates} action={this.addUserToState}/>

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <Card>
                    <CardBody>
                        <TaxRateFilters taxRates={taxRates}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterTaxRates}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}

                        <DataTable
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Tax Rate"
                            bulk_save_url="/api/taxRate/bulk"
                            view={view}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='name'
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.addUserToState}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
