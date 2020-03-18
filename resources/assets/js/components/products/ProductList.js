import React, { Component } from 'react'
import axios from 'axios'
import AddProduct from './AddProduct'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import ViewEntity from '../common/ViewEntity'
import ProductItem from './ProductItem'
import ProductFilters from './ProductFilters'

export default class ProductList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                viewMode: false,
                viewedId: null,
                title: null
            },
            products: [],
            companies: [],
            cachedData: [],
            categories: [],
            custom_fields: [],
            dropdownButtonActions: ['download'],
            bulk: [],
            filters: {
                status: 'active',
                category_id: '',
                company_id: '',
                searchText: '',
                start_date: '',
                end_date: ''
            },
            ignoredColumns: [
                'deleted_at',
                'created_at',
                'cover',
                'images',
                'company_id',
                'category_ids',
                'status',
                'range_from',
                'range_to',
                'payable_months',
                'minimum_downpayment',
                'number_of_years',
                'assigned_user_id',
                'user_id',
                'notes',
                'cost',
                'quantity',
                'interest_rate',
                'price',
                'custom_value1',
                'custom_value2',
                'custom_value3',
                'custom_value4'
            ],
            showRestoreButton: false
        }

        this.addProductToState = this.addProductToState.bind(this)
        this.userList = this.userList.bind(this)
        this.filterProducts = this.filterProducts.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.updateIgnoredColumns = this.updateIgnoredColumns.bind(this)
        this.toggleViewedEntity = this.toggleViewedEntity.bind(this)
        this.onChangeBulk = this.onChangeBulk.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
        this.saveBulk = this.saveBulk.bind(this)
    }

    componentDidMount () {
        this.getCompanies()
        this.getCategories()
        this.getCustomFields()
    }

    updateIgnoredColumns (columns) {
        this.setState({ ignoredColumns: columns.concat('customer') }, function () {
            console.log('ignored columns', this.state.ignoredColumns)
        })
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
        this.setState({ bulk: options })
    }

    saveBulk (e) {
        const action = e.target.id
        const self = this
        axios.post('/api/product/bulk', { ids: this.state.bulk, action: action }).then(function (response) {
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

    addProductToState (products) {
        const cachedData = !this.state.cachedData.length ? products : this.state.cachedData
        this.setState({
            products: products,
            cachedData: cachedData
        })
    }

    filterProducts (filters) {
        this.setState({ filters: filters })
    }

    renderErrorFor () {

    }

    getCompanies () {
        axios.get('/api/companies')
            .then((r) => {
                this.setState({
                    companies: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    getCustomFields () {
        axios.get('api/accounts/fields/Product')
            .then((r) => {
                this.setState({
                    custom_fields: r.data.fields
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                    err: e
                })
            })
    }

    getCategories () {
        axios.get('/api/categories')
            .then((r) => {
                this.setState({
                    categories: r.data
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    userList () {
        const { products, custom_fields, companies, categories, ignoredColumns } = this.state

        return <ProductItem products={products} categories={categories} companies={companies} custom_fields={custom_fields}
            ignoredColumns={ignoredColumns} addProductToState={this.addProductToState}
            deleteProduct={this.deleteProduct} toggleViewedEntity={this.toggleViewedEntity}
            onChangeBulk={this.onChangeBulk}/>
    }

    deleteProduct (id, archive = true) {
        const self = this
        const url = archive === true ? `/api/products/archive/${id}` : `/api/products/${id}`
        axios.delete(url)
            .then(function (response) {
                const arrProducts = [...self.state.products]
                const index = arrProducts.findIndex(product => product.id === id)
                arrProducts.splice(index, 1)
                self.addProductToState(arrProducts)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        const { products, custom_fields, companies, categories, view, filters } = this.state
        const { status, searchText, category_id, company_id, start_date, end_date } = this.state.filters
        const fetchUrl = `/api/products?search_term=${searchText}&status=${status}&category_id=${category_id}&company_id=${company_id}&start_date=${start_date}&end_date=${end_date}`
        const addButton = companies.length && categories.length ? <AddProduct
            custom_fields={custom_fields}
            companies={companies}
            categories={categories}
            products={products}
            action={this.addProductToState}
        /> : null

        return (
            <div className="data-table">

                <Card>
                    <CardBody>
                        <ProductFilters products={products}
                            updateIgnoredColumns={this.updateIgnoredColumns}
                            filters={filters} filter={this.filterProducts}
                            saveBulk={this.saveBulk} ignoredColumns={this.state.ignoredColumns}/>
                        {addButton}
                        <DataTable
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='name'
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.addProductToState}
                        />
                    </CardBody>
                </Card>

                <ViewEntity ignore={[]} toggle={this.toggleViewedEntity} title={view.title}
                    viewed={view.viewMode}
                    entity={view.viewedId}/>
            </div>
        )
    }
}
