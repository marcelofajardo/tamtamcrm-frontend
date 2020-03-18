import React, { Component } from 'react'
import {
    FormGroup, Input, Row, Col
} from 'reactstrap'
import CompanyDropdown from '../common/CompanyDropdown'
import DisplayColumns from '../common/DisplayColumns'
import CustomerGroupDropdown from '../common/CustomerGroupDropdown'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import BulkActionDropdown from '../common/BulkActionDropdown'

export default class CustomerFilters extends Component {
    constructor (props) {
        super(props)
        this.state = {

            dropdownButtonActions: ['download'],
            filters: {
                status: 'active',
                company_id: '',
                group_settings_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            }

        }

        this.filterCustomers = this.filterCustomers.bind(this)
        this.getFilters = this.getFilters.bind(this)
    }

    filterCustomers (event) {
        if ('start_date' in event) {
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    start_date: event.start_date,
                    end_date: event.end_date
                }
            }), () => this.props.filter(this.state.filters))
            return
        }

        const column = event.target.id
        const value = event.target.value

        if (value === 'all') {
            const updatedRowState = this.state.filters.filter(filter => filter.column !== column)
            this.setState({ filters: updatedRowState }, () => this.props.filter(this.state.filters))
            return true
        }

        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [column]: value
            }
        }), () => this.props.filter(this.state.filters))

        return true
    }

    getFilters () {
        const { searchText, status, company_id, group_settings_id, start_date, end_date } = this.props.filters
        const columnFilter = this.props.customers.length
            ? <DisplayColumns onChange2={this.props.updateIgnoredColumns} columns={Object.keys(this.props.customers[0])}
                ignored_columns={this.props.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={2}>
                    <TableSearch onChange={this.filterCustomers}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterCustomers}
                            name="status"
                            id="status"
                        >
                            <option value="">Select Status</option>
                            <option value='active'>Active</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={3}>
                    <CompanyDropdown
                        companies={this.props.companies}
                        company_id={this.props.filters.company_id}
                        handleInputChanges={this.filterCustomers}
                    />
                </Col>

                <Col md={3}>
                    <CustomerGroupDropdown
                        customer_group={this.props.filters.group_settings_id}
                        handleInputChanges={this.filterCustomers}
                    />
                </Col>

                <Col md={1}>
                    <CsvImporter filename="customers.csv"
                        url={`/api/customers?search_term=${searchText}&status=${status}&company_id=${company_id}&group_settings_id=${group_settings_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col md={2}>
                    <BulkActionDropdown
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        saveBulk={this.props.saveBulk}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterCustomers} />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        {columnFilter}
                    </FormGroup>
                </Col>
            </Row>
        )
    }

    render () {
        const filters = this.getFilters()

        return (<FilterTile filters={filters}/>)
    }
}
