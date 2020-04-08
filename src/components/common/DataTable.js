import React, { Component } from 'react'
import axios from 'axios'
import { Table, Spinner, UncontrolledTooltip, Collapse } from 'reactstrap'
import PaginationBuilder from './PaginationBuilder'
import TableSort from './TableSort'
import ViewEntity from './ViewEntity'
import DisplayColumns from './DisplayColumns'
import BulkActionDropdown from './BulkActionDropdown'

export default class DataTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            bulk: [],
            showCheckboxes: false,
            displayAsTable: false,
            showColumns: false,
            width: window.innerWidth,
            view: this.props.view,
            ignoredColumns: this.props.ignore || [],
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
        this.handleTableActions = this.handleTableActions.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleWindowSizeChange)
        this.setPage()
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleWindowSizeChange)
    }

    handleWindowSizeChange () {
        this.setState({ width: window.innerWidth })
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.state.fetchUrl && this.state.fetchUrl !== nextProps.fetchUrl) {
            this.reset(nextProps.fetchUrl)
        }
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('line_items', 'emails') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post(this.props.bulk_save_url, { ids: this.state.bulk, action: action }).then(function (response) {
            // const arrQuotes = [...self.state.invoices]
            // const index = arrQuotes.findIndex(payment => payment.id === id)
            // arrQuotes.splice(index, 1)
            // self.updateInvoice(arrQuotes)
        })
            .catch(function (error) {
                self.setState(
                    {
                        error: error.response.data
                    }
                )
            })
    }

    handleTableActions (event) {
        if (event.target.id === 'toggle-checkbox') {
            this.setState({ showCheckboxes: !this.state.showCheckboxes })
        }

        if (event.target.id === 'toggle-table') {
            this.setState({ displayAsTable: !this.state.displayAsTable })
        }

        if (event.target.id === 'toggle-columns') {
            this.setState({ showColumns: !this.state.showColumns })
        }
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

    onChangeBulk (e) {
        // current array of options
        const options = this.state.bulk
        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(+e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }

        // update the state with the new array of options
        this.setState({ bulk: options }, () => console.log('bulk', this.state.bulk))
    }

    render () {
        const { loading, message, width } = this.state
        const isMobile = width <= 500
        const loader = loading ? <Spinner style={{
            width: '3rem',
            height: '3rem'
        }}/> : null

        const columnFilter = this.state.entities.data && this.state.entities.data.length
            ? <DisplayColumns onChange2={this.updateIgnoredColumns}
                columns={Object.keys(this.state.entities.data[0]).concat(this.state.ignoredColumns)}
                ignored_columns={this.state.ignoredColumns}/> : null

        const table_class = this.state.displayAsTable || isMobile ? 'mt-2 data-table mobile' : 'mt-2 data-table'

        const table = <Table className={table_class} striped bordered hover responsive dark>
            <TableSort fetchEntities={this.fetchEntities}
                columnMapping={this.props.columnMapping}
                columns={this.props.order ? this.props.order : this.state.columns}
                ignore={this.state.ignoredColumns}
                disableSorting={this.props.disableSorting} sorted_column={this.state.sorted_column}
                order={this.state.order}/>
            <tbody>
                {this.props.userList({
                    ignoredColumns: this.state.ignoredColumns,
                    toggleViewedEntity: this.toggleViewedEntity,
                    showCheckboxes: this.state.showCheckboxes,
                    onChangeBulk: this.onChangeBulk
                })}
            </tbody>
        </Table>

        return (
            <React.Fragment>

                {message && <p className="message">{message}</p>}

                {loader}

                <UncontrolledTooltip placement="top" target="refresh">
                    Refresh
                </UncontrolledTooltip>

                <UncontrolledTooltip placement="top" target="toggle-checkbox">
                    Toggle Checkbox
                </UncontrolledTooltip>

                <UncontrolledTooltip placement="top" target="toggle-table">
                    Toggle Table
                </UncontrolledTooltip>

                <UncontrolledTooltip placement="top" target="toggle-columns">
                    Toggle Columns
                </UncontrolledTooltip>

                <Collapse className="pull-left col-8" isOpen={this.state.showColumns}>
                    {columnFilter}
                </Collapse>

                <div style={{ lineHeight: '32px' }} className="row justify-content-end">
                    {this.props.dropdownButtonActions && <BulkActionDropdown
                        dropdownButtonActions={this.props.dropdownButtonActions}
                        saveBulk={this.saveBulk}/> }
                    <i onClick={this.fetchEntities} id="refresh" className="fa fa-gear"
                        style={{ fontSize: '28px', color: '#fff', cursor: 'pointer', marginRight: '6px' }}/>
                    <i onClick={this.handleTableActions} id="toggle-checkbox" className="fa fa-check-square mr-2"
                        style={{ fontSize: '28px' }}/>
                    <i onClick={this.handleTableActions} id="toggle-table" className="fa fa-table mr-2"
                        style={{ fontSize: '28px' }}/>
                    <i onClick={this.handleTableActions} id="toggle-columns" className="fa fa-columns mr-4"
                        style={{ fontSize: '28px' }}/>
                </div>

                {table}

                {this.props.view && <ViewEntity
                    ignore={this.state.view.ignore}
                    toggle={this.toggleViewedEntity}
                    title={this.state.view.title}
                    viewed={this.state.view.viewMode}
                    entity={this.state.view.viewedId}
                    entity_type={this.props.entity_type}
                />}

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
