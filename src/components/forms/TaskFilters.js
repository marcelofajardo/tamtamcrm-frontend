import React, { Component } from 'react'
import {
    FormGroup, Input, Col, Row
} from 'reactstrap'
import TableSearch from '../common/TableSearch'
import DateFilter from '../common/DateFilter'
import CsvImporter from '../common/CsvImporter'
import FilterTile from '../common/FilterTile'
import UserDropdown from '../common/UserDropdown'
import CustomerDropdown from '../common/CustomerDropdown'
import TaskStatusDropdown from '../common/TaskStatusDropdown'

export default class TaskFilters extends Component {
    constructor (props) {
        super(props)

        this.state = {
            dropdownButtonActions: ['download'],
            filters: {
                start_date: '',
                end_date: '',
                project_id: '',
                status_id: 'active',
                task_status: '',
                user_id: '',
                customer_id: '',
                task_type: '',
                searchText: ''
            }
        }

        this.filterTasks = this.filterTasks.bind(this)
        this.getFilters = this.getFilters.bind(this)
    }

    filterTasks (event) {
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
        const { searchText, start_date, end_date, customer_id, project_id, task_status, task_type, user_id } = this.state.filters

        return (

            <Row form>
                <Col md={2}>
                    <TableSearch onChange={this.filterTasks}/>
                </Col>

                <Col md={3}>
                    <CustomerDropdown
                        customer={this.props.filters.customer_id}
                        handleInputChanges={this.filterTasks}
                        name="customer_id"
                    />
                </Col>

                <Col md={3}>
                    <UserDropdown
                        handleInputChanges={this.filterTasks}
                        users={this.props.users}
                        name="user_id"
                    />
                </Col>

                <Col md={2}>

                    <TaskStatusDropdown
                        task_type={1}
                        handleInputChanges={this.filterTasks}
                    />
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <Input type='select'
                            onChange={this.filterTasks}
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
                    <CsvImporter filename="tasks.csv"
                        url={`/api/tasks?search_term=${searchText}&project_id=${project_id}&task_status=${task_status}&task_type=${task_type}&customer_id=${customer_id}&user_id=${user_id}&start_date=${start_date}&end_date=${end_date}&page=1&per_page=5000`}/>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <DateFilter onChange={this.filterTasks} />
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
