import React, { Component } from 'react'
import {
    FormGroup, Input, Col, Row
} from 'reactstrap'
import CategoryDropdown from '../common/CategoryDropdown'
import CompanyDropdown from '../common/CompanyDropdown'
import DisplayColumns from '../common/DisplayColumns'
import TableSearch from '../common/TableSearch'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import BulkActionDropdown from '../common/BulkActionDropdown'
import FilterTile from '../common/FilterTile'

export default class ProductFilters extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dropdownButtonActions: ['download'],

            filters: {
                status: 'active',
                category_id: '',
                company_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            }
        }

        this.getFilters = this.getFilters.bind(this)
        this.filterProducts = this.filterProducts.bind(this)
    }

    filterProducts (event) {
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
        const { status, searchText, category_id, company_id, start_date, end_date } = this.state.filters
        const columnFilter = this.props.products.length
            ? <DisplayColumns onChange2={this.props.updateIgnoredColumns} columns={Object.keys(this.props.products[0])}
                ignored_columns={this.props.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={2}>
                    <TableSearch onChange={this.filterProducts}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterProducts}
                            id="status"
                            name="status"
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
                        company_id={this.props.filters.company_id}
                        handleInputChanges={this.filterProducts}
                        companies={this.props.companies}
                        name="company_id"
                    />
                </Col>

                <Col md={3}>
                    <CategoryDropdown
                        name="category_id"
                        handleInputChanges={this.filterProducts}
                        categories={this.props.categories}
                    />
                </Col>

                <Col>
                    <BulkActionDropdown
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        saveBulk={this.props.saveBulk}/>
                </Col>

                <Col>
                    <CsvImporter filename="products.csv"
                        url={`/api/products?search_term=${searchText}&status=${status}&category_id=${category_id}&company_id=${company_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterProducts} />
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
