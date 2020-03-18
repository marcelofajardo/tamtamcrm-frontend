import React, { Component } from 'react'
import {
    FormGroup, Input, Row, Col
} from 'reactstrap'
import DepartmentDropdown from '../common/DepartmentDropdown'
import RoleDropdown from '../common/RoleDropdown'
import DisplayColumns from '../common/DisplayColumns'
import TableSearch from '../common/TableSearch'
import FilterTile from '../common/FilterTile'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import BulkActionDropdown from '../common/BulkActionDropdown'

export default class UserFilters extends Component {
    constructor (props) {
        super(props)
        this.state = {

            dropdownButtonActions: ['download'],

            filters: {
                start_date: '',
                end_date: '',
                status: 'active',
                role_id: '',
                department_id: '',
                searchText: ''
            }
        }

        this.getFilters = this.getFilters.bind(this)
        this.filterUsers = this.filterUsers.bind(this)
    }

    filterUsers (event) {
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
        const { status, role_id, department_id, searchText, start_date, end_date } = this.state.filters
        const columnFilter = this.props.users.length
            ? <DisplayColumns onChange2={this.props.updateIgnoredColumns} columns={Object.keys(this.props.users[0])}
                ignored_columns={this.props.ignoredColumns}/> : null
        return (
            <Row form>
                <Col md={3}>
                    <TableSearch onChange={this.filterUsers}/>
                </Col>

                <Col md={3}>
                    <DepartmentDropdown
                        name="department_id"
                        handleInputChanges={this.filterUsers}
                        departments={this.props.departments}
                    />
                </Col>

                <Col md={2}>
                    <RoleDropdown
                        name="role_id"
                        handleInputChanges={this.filterUsers}
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterUsers}
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

                <Col>
                    <CsvImporter filename="users.csv"
                        url={`/api/users?search_term=${searchText}&status=${status}&role_id=${role_id}&department_id=${department_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col>
                    <BulkActionDropdown
                        dropdownButtonActions={this.state.dropdownButtonActions}
                        saveBulk={this.props.saveBulk}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterUsers} />
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
