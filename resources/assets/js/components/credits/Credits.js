import React, { Component } from 'react'
import DataTable from '../common/DataTable'
import axios from 'axios'
import AddCredit from './AddCredit'
import EditCredit from './EditCredit'
import CustomerDropdown from '../common/CustomerDropdown'
import { Badge, FormGroup, Input, Card, CardBody, Col, Row } from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import DisplayColumns from '../common/DisplayColumns'
import ActionsMenu from '../common/ActionsMenu'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import ViewEntity from '../common/ViewEntity'
import CreditPresenter from '../presenters/CreditPresenter'
import DateFilter from '../common/DateFilter'

export default class Credits extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            credits: [],
            cachedData: [],
            customers: [],
            custom_fields: [],
            ignoredColumns: [
                'id',
                'type_id',
                'terms',
                'footer',
                'notes',
                'invoice_id',
                'user_id'
            ],
            // columns: ['Number', 'Customer', 'Total', 'Status'],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: ''
            },
            showRestoreButton: false
        }

        this.updateCustomers = this.updateCustomers.bind(this)
        this.customerList = this.customerList.bind(this)
        this.deleteCredit = this.deleteCredit.bind(this)
        this.filterCredits = this.filterCredits.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.getFilters = this.getFilters.bind(this)
    }

    componentDidMount () {
        this.getCustomers()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer', 'notes', 'terms', 'footer', 'user_id', 'invoice_id') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    filterCredits (event) {
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

    getCustomers () {
        axios.get('/api/customers')
            .then((r) => {
                this.setState({
                    customers: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Credit')
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

    updateCustomers (credits) {
        const cachedData = !this.state.cachedData.length ? credits : this.state.cachedData
        this.setState({
            credits: credits,
            cachedData: cachedData
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

    getFilters () {
        const { customers } = this.state
        const columnFilter = this.state.credits.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns}
                columns={Object.keys(this.state.credits[0]).concat(this.state.ignoredColumns)}
                ignored_columns={this.state.ignoredColumns}/> : null

        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterCredits}/>
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        customer={this.state.filters.customer_id}
                        renderErrorFor={this.renderErrorFor}
                        handleInputChanges={this.filterCredits}
                        customers={customers}
                        name="customer_id"
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterCredits}
                            id="status_id"
                            name="status_id"
                        >
                            <option value="">Select Status</option>
                            <option value='draft'>Draft</option>
                            <option value='partial'>Partial</option>
                            <option value='applied'>Applied</option>
                            <option value='active'>Active</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter update={this.updateCustomers}
                            data={this.state.cachedData}/>
                    </FormGroup>
                </Col>

                <Col md={8}>
                    {columnFilter}
                </Col>
            </Row>
        )
    }

    customerList () {
        const { credits, customers, custom_fields, ignoredColumns } = this.state
        if (credits && credits.length && customers.length) {
            return credits.map(credit => {
                const editButton = !credit.deleted_at ? <EditCredit
                    custom_fields={custom_fields}
                    credit={credit}
                    action={this.updateCustomers}
                    credits={credits}
                    customers={customers}
                    modal={true}
                /> : null
                const restoreButton = credit.deleted_at
                    ? <RestoreModal id={credit.id} entities={credits} updateState={this.updateCustomers}
                        url={`/api/credits/restore/${credit.id}`}/> : null
                const archiveButton = !credit.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteCredit} id={credit.id}/> : null
                const deleteButton = !credit.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteCredit} id={credit.id}/> : null

                const columnList = Object.keys(credit).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <CreditPresenter customers={customers} toggleViewedEntity={this.toggleViewedEntity}
                        field={key} entity={credit}/>
                })
                return (
                    <tr key={credit.id}>
                        <td>
                            <ActionsMenu edit={editButton} delete={deleteButton} archive={archiveButton}
                                restore={restoreButton}/>
                        </td>
                        {columnList}
                    </tr>
                )
            })
        } else {
            return <tr>
                <td className="text-center">No Records Found.</td>
            </tr>
        }
    }

    deleteCredit (id, archive = true) {
        const url = archive === true ? `/api/credits/archive/${id}` : `/api/credits/${id}`
        const self = this
        axios.delete(url)
            .then(function (response) {
                const arrPayments = [...self.state.credits]
                const index = arrPayments.findIndex(payment => payment.id === id)
                arrPayments.splice(index, 1)
                self.updateCustomers(arrPayments)
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
        const { customers, credits, custom_fields, view } = this.state
        const fetchUrl = `/api/credits?status=${this.state.filters.status_id}&customer_id=${this.state.filters.customer_id}`
        const filters = this.state.customers.length ? this.getFilters() : 'Loading filters'
        const addButton = customers.length ? <AddCredit
            custom_fields={custom_fields}
            customers={customers}
            action={this.updateCustomers}
            credits={credits}
        /> : null

        return this.state.customers.length ? (
            <div className="data-table">
                <Card>
                    <CardBody>

                        <FilterTile filters={filters}/>
                        {addButton}
                        <DataTable
                            columnMapping={{ customer_id: 'Customer' }}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='total'
                            userList={this.customerList}
                            fetchUrl={fetchUrl}
                            updateState={this.updateCustomers}
                        />
                    </CardBody>
                </Card>

                <ViewEntity ignore={[]} toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}/>
            </div>
        ) : null
    }
}
