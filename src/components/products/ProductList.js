import React, { Component } from 'react'
import axios from 'axios'
import AddProduct from './AddProduct'
import DataTable from '../common/DataTable'
import {
    Card, CardBody
} from 'reactstrap'
import ProductItem from './ProductItem'
import ProductFilters from './ProductFilters'

export default class ProductList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            per_page: 5,
            view: {
                ignore: [],
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
        this.getCompanies = this.getCompanies.bind(this)
    }

    componentDidMount () {
        this.getCompanies()
        this.getCategories()
        this.getCustomFields()
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

    userList (props) {
        const { products, custom_fields, companies, categories } = this.state

        return <ProductItem showCheckboxes={props.showCheckboxes} products={products} categories={categories}
            companies={companies} custom_fields={custom_fields}
            ignoredColumns={props.ignoredColumns} addProductToState={this.addProductToState}
            toggleViewedEntity={props.toggleViewedEntity}
            onChangeBulk={props.onChangeBulk}/>
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
                            dropdownButtonActions={this.state.dropdownButtonActions}
                            entity_type="Product"
                            bulk_save_url="/api/product/bulk"
                            view={view}
                            ignore={this.state.ignoredColumns}
                            disableSorting={['id']}
                            defaultColumn='name'
                            userList={this.userList}
                            fetchUrl={fetchUrl}
                            updateState={this.addProductToState}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
