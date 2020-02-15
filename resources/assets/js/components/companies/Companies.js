import React, { Component } from 'react'
import axios from 'axios'
import EditCompany from './EditCompany'
import AddCompany from './AddCompany'
import DataTable from '../common/DataTable'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import { FormGroup, Input, Card, CardBody, Row, Col } from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'
import CompanyPresenter from '../presenters/CompanyPresenter'
import DateFilter from '../common/DateFilter'

export default class Companies extends Component {
    constructor (props) {
        super(props)

        this.state = {
            users: [],
            brands: [],
            cachedData: [],
            errors: [],
            error: '',
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            filters: {
                status_id: 'active',
                searchText: ''
            },
            custom_fields: [],
            ignoredColumns: [
                'contacts',
                'deleted_at',
                'address_1',
                'company_logo',
                'address_2',
                'postcode',
                'town',
                'city',
                'token',
                'currency_id',
                'industry_id',
                'country_id',
                'user_id',
                'assigned_user_id',
                'notes'
            ],
            showRestoreButton: false
        }

        this.addUserToState = this.addUserToState.bind(this)
        this.userList = this.userList.bind(this)
        this.deleteBrand = this.deleteBrand.bind(this)
        this.filterCompanies = this.filterCompanies.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
    }

    componentDidMount () {
        this.getUsers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('settings') }, function () {
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

    addUserToState (brands) {
        this.setState({ brands: brands })
    }

    v

    filterCompanies (event) {
        const column = event.target.name
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

    getFilters () {
        const columnFilter = this.state.brands.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns} columns={Object.keys(this.state.brands[0])}
                ignored_columns={this.state.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterCompanies}/>
                </Col>

                <Col md={6}>
                    {columnFilter}
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterCompanies}
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
        const { brands, custom_fields, users, ignoredColumns } = this.state
        if (brands && brands.length) {
            return this.state.brands.map(brand => {
                const restoreButton = brand.deleted_at
                    ? <RestoreModal id={brand.id} entities={brands} updateState={this.addUserToState}
                        url={`/api/brands/restore/${brand.id}`}/> : null
                const archiveButton = !brand.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteBrand} id={brand.id}/> : null
                const deleteButton = !brand.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteBrand} id={brand.id}/> : null
                const editButton = !brand.deleted_at ? <EditCompany
                    custom_fields={custom_fields}
                    users={users}
                    brand={brand}
                    brands={brands}
                    action={this.addUserToState}
                /> : null

                const columnList = Object.keys(brand).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <CompanyPresenter toggleViewedEntity={this.toggleViewedEntity}
                        field={key} entity={brand}/>
                })
                return <tr key={brand.id}>
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

    deleteBrand (id, archive = true) {
        const self = this
        const url = archive === true ? `/api/companies/archive/${id}` : `/api/companies/${id}`

        axios.delete(url)
            .then(function (response) {
                const arrBrands = [...self.state.brands]
                const index = arrBrands.findIndex(brand => brand.id === id)
                arrBrands.splice(index, 1)
                self.addUserToState(arrBrands)
            })
            .catch(function (error) {
                console.log(error)
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Company')
            .then((r) => {
                this.setState({
                    custom_fields: r.data.fields
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    getUsers () {
        axios.get('api/users')
            .then((r) => {
                this.setState({
                    users: r.data
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    render () {
        const { custom_fields, users, error, view } = this.state
        const { searchText, status_id } = this.state.filters
        const fetchUrl = `/api/companies?search_term=${searchText}&status=${status_id}`
        const filters = this.getFilters()
        const addButton = users.length
            ? <AddCompany users={users} action={this.addUserToState}
                custom_fields={custom_fields}/> : null

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
                            disableSorting={['id']}
                            defaultColumn='name'
                            ignore={this.state.ignoredColumns}
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
