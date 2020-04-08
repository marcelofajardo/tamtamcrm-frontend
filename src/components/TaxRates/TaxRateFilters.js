import React, { Component } from 'react'
import {
    FormGroup, Input, Row, Col
} from 'reactstrap'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'

export default class TaxRateFilters extends Component {
    constructor (props) {
        super(props)
        this.state = {

            dropdownButtonActions: ['download'],

            filters: {
                start_date: '',
                end_date: '',
                status_id: 'active',
                role_id: '',
                department_id: '',
                searchText: ''
            }
        }

        this.getFilters = this.getFilters.bind(this)
        this.filterTaxRates = this.filterTaxRates.bind(this)
    }

    filterTaxRates (event) {
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
        const { searchText, status_id, start_date, end_date } = this.props.filters

        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterTaxRates}/>
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

                <Col md={1}>
                    <CsvImporter filename="taxRates.csv"
                        url={`/api/taxRates?search_term=${searchText}&status=${status_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterTaxRates} />
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
