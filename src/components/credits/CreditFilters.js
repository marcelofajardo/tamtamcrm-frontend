import React, { Component } from 'react'
import CustomerDropdown from '../common/CustomerDropdown'
import {
    FormGroup, Input, Col, Row
} from 'reactstrap'
import DisplayColumns from '../common/DisplayColumns'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import BulkActionDropdown from '../common/BulkActionDropdown'

export default class CreditFilters extends Component {
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

        this.filterCredits = this.filterCredits.bind(this)
        this.getFilters = this.getFilters.bind(this)
    }

    filterCredits (event) {
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
        const columnFilter = this.props.credits.length
            ? <DisplayColumns onChange2={this.props.updateIgnoredColumns}
                columns={Object.keys(this.props.credits[0]).concat(this.props.ignoredColumns)}
                ignored_columns={this.props.ignoredColumns}/> : null

        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterCredits}/>
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        customer={this.props.filters.customer_id}
                        handleInputChanges={this.filterCredits}
                        customers={this.props.customers}
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
                            <option value='sent'>Sent</option>
                            <option value='partial'>Partial</option>
                            <option value='applied'>Applied</option>
                            <option value='active'>Active</option>
                            <option value='archived'>Archived</option>
                            <option value='deleted'>Deleted</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col>
                    <BulkActionDropdown
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        saveBulk={this.props.saveBulk}/>
                </Col>

                <Col>
                    <CsvImporter filename="credits.csv"
                        url={`/api/credits?status=${this.state.filters.status_id}&customer_id=${this.state.filters.customer_id} &start_date=${this.state.filters.start_date}&end_date=${this.state.filters.end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterCredits}/>
                    </FormGroup>
                </Col>

                <Col md={8}>
                    {columnFilter}
                </Col>
            </Row>
        )
    }

    render () {
        const filters = this.getFilters()

        return (<FilterTile filters={filters}/>)
    }
}
