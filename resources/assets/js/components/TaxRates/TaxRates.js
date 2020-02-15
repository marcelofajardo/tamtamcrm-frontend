import React, { Component } from 'react'
import axios from 'axios'
import EditTaxRate from './EditTaxRate'
import AddTaxRate from './AddTaxRate'
import DataTable from '../common/DataTable'
import DeleteModal from '../common/DeleteModal'
import RestoreModal from '../common/RestoreModal'
import { Card, CardBody, FormGroup, Input, Row, Col } from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'
import DateFilter from '../common/DateFilter'

export default class TaxRates extends Component {
    constructor (props) {
        super(props)

        this.state = {
            taxRates: [],
            cachedData: [],
            filters: {
                status_id: 'active',
                searchText: ''
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
        this.deleteTaxRate = this.deleteTaxRate.bind(this)
        this.filterTaxRates = this.filterTaxRates.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
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

    filterTaxRates (event) {
        const column = event.target.id
        const value = event.target.value

        if (value === 'all') {
            const updatedRowState = this.state.filters.filter(filter => filter.column !== column)
            this.setState({ filters: updatedRowState })
            return true
        }

        const showRestoreButton = column === 'status_id' && value === 'archived'

        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [column]: value
            },
            showRestoreButton: showRestoreButton
        }))

        return true
    }

    resetFilters () {
        this.props.reset()
    }

    getFilters () {
        const columnFilter = this.state.taxRates.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns} columns={Object.keys(this.state.taxRates[0])}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterTaxRates}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        {columnFilter}
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type='select'
                            onChange={this.filterTaxRates}
                            id="status_id"
                            name="status_id"
                        >
                            <option value="">Select Status</option>
                            <option value='active'>Active</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter update={this.addUserToState}
                            data={this.state.cachedData}/>
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    userList () {
        const { taxRates, ignoredColumns } = this.state
        if (taxRates && taxRates.length) {
            return taxRates.map(taxRate => {
                const restoreButton = taxRate.deleted_at
                    ? <RestoreModal id={taxRate.id} entities={taxRates} updateState={this.addUserToState}
                        url={`/api/taxRate/restore/${taxRate.id}`}/> : null

                const deleteButton = !taxRate.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteTaxRate} id={taxRate.id}/> : null

                const archiveButton = !taxRate.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteTaxRate} id={taxRate.id}/> : null

                const editButton = !taxRate.deleted_at
                    ? <EditTaxRate taxRate={taxRate} taxRates={taxRates} action={this.addUserToState}/>
                    : null

                const columnList = Object.keys(taxRate).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.toggleViewedEntity(taxRate, taxRate.name)} data-label={key}
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

    deleteTaxRate (id, archive = true) {
        const url = archive === true ? `/api/taxRates/archive/${id}` : `/api/taxRates/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrTaxRates = [...self.state.taxRates]
                const index = arrTaxRates.findIndex(taxRate => taxRate.id === id)
                arrTaxRates.splice(index, 1)
                self.addUserToState(arrTaxRates)
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
        const { taxRates, error, view } = this.state
        const { searchText, status_id } = this.state.filters
        const fetchUrl = `/api/taxRates?search_term=${searchText}&status=${status_id}`
        const filters = this.getFilters()
        const addButton = <AddTaxRate taxRates={taxRates} action={this.addUserToState}/>

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <Card>
                    <CardBody>
                        <FilterTile filters={filters}/>
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
