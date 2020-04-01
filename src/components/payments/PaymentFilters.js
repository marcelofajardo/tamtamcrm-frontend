import React, { Component } from 'react'
import {
    FormGroup, Input, Row, Col
} from 'reactstrap'
import CustomerDropdown from '../common/CustomerDropdown'
import DisplayColumns from '../common/DisplayColumns'
import TableSearch from '../common/TableSearch'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import BulkActionDropdown from '../common/BulkActionDropdown'
import FilterTile from '../common/FilterTile'

export default class PaymentFilters extends Component {
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

        this.getFilters = this.getFilters.bind(this)
        this.filterPayments = this.filterPayments.bind(this)
    }

    filterPayments (event) {
        if ('start_date' in event) {
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    start_date: event.start_date,
                    end_date: event.end_date
                }
            }))
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
        const { status_id, searchText, customer_id, start_date, end_date } = this.state.filters
        const columnFilter = this.props.payments.length
            ? <DisplayColumns onChange2={this.props.updateIgnoredColumns}
                columns={Object.keys(this.props.payments[0]).concat(this.props.ignoredColumns)}
                ignored_columns={this.props.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterPayments}/>
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        handleInputChanges={this.filterPayments}
                        customer={this.state.filters.customer_id}
                        name="customer_id"
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterPayments}
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

                <Col>
                    <CsvImporter filename="payments.csv"
                        url={`/api/payments?search_term=${searchText}&status=${status_id}&customer_id=${customer_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col>
                    <BulkActionDropdown
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        saveBulk={this.props.saveBulk}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterPayments} />
                    </FormGroup>
                </Col>

                <Col md={8}>
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
