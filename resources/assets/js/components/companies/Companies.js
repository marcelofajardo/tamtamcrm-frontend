import React, { Component } from 'react'
import axios from 'axios'
import EditCompany from './EditCompany'
import AddCompany from './AddCompany'
import DataTable from '../common/DataTable'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import {
    Input,
    Card,
    CardBody
} from 'reactstrap'
import ActionsMenu from '../common/ActionsMenu'
import ViewEntity from '../common/ViewEntity'
import CompanyPresenter from '../presenters/CompanyPresenter'
import CompanyFilters from './CompanyFilters'
import CreditItem from '../credits/CreditItem'
import CompanyItem from './CompanyItem'

export default class Companies extends Component {
    constructor (props) {
        super(props)

        this.state = {
            users: [],
            brands: [],
            bulk: [],
            cachedData: [],
            errors: [],
            dropdownButtonActions: ['download'],
            error: '',
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            filters: {
                status_id: 'active',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            custom_fields: [],
            ignoredColumns: [
                'contacts',
                'deleted_at',
                'created_at',
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
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
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
        axios.post('/api/company/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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

    filterCompanies (filters) {
        this.setState({ filters: filters })
    }

    userList () {
        const { brands, custom_fields, users, ignoredColumns } = this.state
        return <CompanyItem brands={brands} users={users} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} addUserToState={this.addUserToState}
            deleteBrand={this.deleteBrand} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
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
        const { custom_fields, users, error, view, brands } = this.state
        const { searchText, status_id, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/companies?search_term=${searchText}&status=${status_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = users.length
            ? <AddCompany brands={brands} users={users} action={this.addUserToState}
                custom_fields={custom_fields}/> : null

        return (
            <div className="data-table">

                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <Card>
                    <CardBody>
                        <CompanyFilters brands={brands} updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={this.state.filters} filter={this.filterCompanies}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
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
