import React, { Component } from 'react'
import axios from 'axios'
import AddTaxRate from './AddTaxRate'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import ViewEntity from '../common/ViewEntity'
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
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
    }

    addUserToState (taxRates) {
        const cachedData = !this.state.cachedData.length ? taxRates : this.state.cachedData
        this.setState({
            taxRates: taxRates,
            cachedData: cachedData
        })
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
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

    onChangeBulk (e) {
        // current array of options
        const options = this.state.bulk
        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(+e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ bulk: options })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/user/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
            // const arrQuotes = [...self.state.invoices]
            // const index = arrQuotes.findIndex(payment => payment.id === id)
            // arrQuotes.splice(index, 1)
            // self.updateInvoice(arrQuotes)
        })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    filterTaxRates (filters) {
        this.setState({ filters: filters })
    }

    resetFilters () {
        this.props.reset()
    }

    userList () {
        const { taxRates, ignoredColumns } = this.state
        return <TaxRateItem taxRates={taxRates}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
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
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='name'
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
