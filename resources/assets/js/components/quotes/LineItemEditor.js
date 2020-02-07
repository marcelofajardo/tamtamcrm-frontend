/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import LineItem from './LineItem'
import { Button } from 'reactstrap'
import axios from 'axios'

class LineItemEditor extends Component {
    constructor (props) {
        super(props)
        this.state = {
            rowData: [],
            products: [],
            taxRates: [],
            total: this.props.total
        }

        this.handleRowChange = this.handleRowChange.bind(this)
        this.handleRowDelete = this.handleRowDelete.bind(this)
        this.handleRowAdd = this.handleRowAdd.bind(this)
        this.loadProducts = this.loadProducts.bind(this)
        this.loadTaxRates = this.loadTaxRates.bind(this)
    }

    componentDidMount () {
        this.loadProducts()
        this.loadTaxRates()
    }

    loadProducts () {
        axios.get('/api/products').then(data => {
            this.setState({ products: data.data })
        })
    }

    loadTaxRates () {
        axios.get('/api/taxRates').then(data => {
            this.setState({ taxRates: data.data })
        })
    }

    handleRowChange (e) {
        const row = e.target.dataset.line

        this.props.update(e.target.name, e.target.value, row)

        if (e.target.name === 'product_id') {
            const index = this.state.products.findIndex(product => product.id === parseInt(e.target.value))
            const product = this.state.products[index]
            const price = product.price

            setTimeout(() => {
                this.props.update('unit_price', price, row)
            })
        }
    }

    handleRowDelete (index) {
        this.props.delete(index)
    }

    handleRowAdd () {
        this.props.onAddFiled()
    }

    render () {
        const lineItemRows = <LineItem
            rows={this.props.rows}
            tax_rates={this.state.taxRates}
            products={this.state.products}
            new={true}
            onChange={this.handleRowChange}
            handleTaskChange={this.updateTasks}
            onDelete={this.handleRowDelete}
        />

        return (
            <React.Fragment>
                {lineItemRows}

                <table id='lines-table'>
                    <tfoot>
                        <tr>
                            <th/>
                            <th>Tax total:</th>
                            <th>{this.props.tax_total}</th>
                            <th/>
                        </tr>

                        <tr>
                            <th/>
                            <th>Discount total:</th>
                            <th>{this.props.discount_total}</th>
                            <th/>
                        </tr>

                        <tr>
                            <th/>
                            <th>Sub total:</th>
                            <th>{this.props.sub_total}</th>
                            <th/>
                        </tr>

                        <tr>
                            <th/>
                            <th>Grand total:</th>
                            <th>{this.props.total}</th>
                            <th/>
                        </tr>
                    </tfoot>
                </table>

                <Button color="success" onClick={this.handleRowAdd}
                    className='f6 link dim ph3 pv1 mb2 dib white bg-dark-green bn'>Add
                </Button>
            </React.Fragment>
        )
    }
}

export default LineItemEditor
