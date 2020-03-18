import React, { Component } from 'react'
import {
    FormGroup, Input, Row, Col
} from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import TableSearch from '../common/TableSearch'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import BulkActionDropdown from '../common/BulkActionDropdown'
import FilterTile from '../common/FilterTile'

export default class LeadFilters extends Component {
    constructor (props) {
        super(props)

        this.state = {
            dropdownButtonActions: ['download'],
            filters: {
                status_id: 'active',
                customer_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            }
        }

        this.filterLeads = this.filterLeads.bind(this)
        this.getFilters = this.getFilters.bind(this)
    }

    filterLeads (event) {
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
            },
        }), () => this.props.filter(this.state.filters))

        return true
    }

    getFilters () {
        const { status_id, searchText, start_date, end_date } = this.state.filters
        const columnFilter = this.props.leads.length
            ? <DisplayColumns onChange={this.props.updateIgnoredColumns} columns={Object.keys(this.props.leads[0])}
                ignored_columns={this.props.ignoredColumns}/> : null
        return (
            <Row form>
                <Col className="h-100" md={3}>
                    <TableSearch onChange={this.filterLeads}/>
                </Col>

                <Col md={8}>
                    {columnFilter}
                </Col>

                <Col className="h-100" md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterLeads}
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

                <Col className="h-100" md={2}>
                    <BulkActionDropdown
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        saveBulk={this.props.saveBulk}/>
                </Col>

                <Col className="h-100" md={2}>
                    <CsvImporter filename="leads.csv"
                        url={`/api/leads?search_term=${searchText}&status=${status_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col className="h-100" md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterLeads} />
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
