import React, { Component } from 'react'
import axios from 'axios'
import { Table, Spinner, UncontrolledTooltip } from 'reactstrap'
import PaginationBuilder from './PaginationBuilder'
import TableSort from './TableSort'

export default class DataTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            query: '',
            message: '',
            loading: false,
            entities: {
                current_page: 1,
                from: 1,
                last_page: 1,
                per_page: 5,
                to: 1,
                total: 1,
                data: []
            },
            first_page: 1,
            current_page: 1,
            sorted_column: this.props.defaultColumn ? this.props.defaultColumn : [],
            data: [],
            columns: [],
            offset: 4,
            order: 'asc'
        }
        this.cancel = ''
        this.fetchEntities = this.fetchEntities.bind(this)
        this.setPage = this.setPage.bind(this)
    }

    componentWillMount () {
        this.setPage()
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.state.fetchUrl && this.state.fetchUrl !== nextProps.fetchUrl) {
            this.reset(nextProps.fetchUrl)
        }
    }

    reset (fetchUrl = null) {
        this.setState({
            query: '',
            current_page: 1,
            loading: true,
            fetchUrl: fetchUrl !== null ? fetchUrl : this.state.fetchUrl
        }, () => {
            this.fetchEntities()
        })
    }

    setPage () {
        this.setState({
            current_page: this.state.entities.current_page,
            loading: true,
            fetchUrl: this.props.fetchUrl
        }, () => {
            this.fetchEntities()
        })
    }

    preferredOrder (arrObjects, order) {
        const newObject = []

        arrObjects.forEach((obj) => {
            const test = {}
            for (let i = 0; i < order.length; i++) {
                // eslint-disable-next-line no-prototype-builtins
                if (obj.hasOwnProperty(order[i])) {
                    test[order[i]] = obj[order[i]]
                }
            }

            newObject.push(test)
        })

        return newObject
    }

    fetchEntities (pageNumber = false, order = false, sorted_column = false) {
        if (this.cancel) {
            this.cancel.cancel()
        }

        pageNumber = !pageNumber || typeof pageNumber === 'object' ? this.state.current_page : pageNumber
        order = !order ? this.state.order : order
        sorted_column = !sorted_column ? this.state.sorted_column : sorted_column
        const noPerPage = !this.state.perPage ? Math.ceil(window.innerHeight / 90) : this.state.perPage
        this.cancel = axios.CancelToken.source()
        const fetchUrl = `${this.props.fetchUrl}${this.props.fetchUrl.includes('?') ? '&' : '?'}page=${pageNumber}&column=${sorted_column}&order=${order}&per_page=${noPerPage}`

        axios.get(fetchUrl, {})
            .then(response => {
                let data = response.data.data && Object.keys(response.data.data).length ? response.data.data : []
                const columns = (this.props.columns && this.props.columns.length) ? (this.props.columns) : ((Object.keys(data).length) ? (Object.keys(data[0])) : null)

                if (this.props.order) {
                    data = this.preferredOrder(data, this.props.order)
                }

                this.setState({
                    order: order,
                    current_page: pageNumber,
                    sorted_column: sorted_column,
                    entities: response.data,
                    perPage: noPerPage,
                    loading: false,
                    data: data,
                    columns: columns
                }, () => this.props.updateState(data))
            })
            .catch(error => {
                alert(error)
                this.setState({
                    loading: false,
                    message: 'Failed to fetch the data. Please check network'
                })
            })
    }

    render () {
        const { loading, message } = this.state
        const loader = loading ? <Spinner style={{
            width: '3rem',
            height: '3rem'
        }}/> : null
        const table = <Table className="mt-2 data-table" striped bordered hover responsive dark>
            <TableSort fetchEntities={this.fetchEntities}
                columnMapping={this.props.columnMapping}
                columns={this.props.order ? this.props.order : this.state.columns} ignore={this.props.ignore}
                disableSorting={this.props.disableSorting} sorted_column={this.state.sorted_column}
                order={this.state.order}/>
            <tbody>
                {this.props.userList()}
            </tbody>
        </Table>

        return (
            <React.Fragment>

                {message && <p className="message">{message}</p>}

                {loader}

                <UncontrolledTooltip placement="top" target="refresh">
                    Refresh
                </UncontrolledTooltip>

                <a className="row justify-content-end" id="refresh" style={{ color: '#fff', cursor: 'pointer', marginRight: '6px' }} onClick={this.fetchEntities} >
                    <i className="fa fa-gear" style={{ fontSize: '28px' }} />
                </a>

                {table}

                <PaginationBuilder last_page={this.state.entities.last_page} page={this.state.entities.page}
                    current_page={this.state.entities.current_page}
                    from={this.state.entities.from}
                    offset={this.state.offset}
                    to={this.state.entities.to} fetchEntities={this.fetchEntities}
                    recordCount={this.state.entities.total} perPage={this.state.perPage}/>
            </React.Fragment>
        )
    }
}
