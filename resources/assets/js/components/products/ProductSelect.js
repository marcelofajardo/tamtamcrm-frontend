/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import axios from 'axios'

class ProductSelect extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            products: [],
            selectedProducts: [],
            errors: [],
            success: false
        }

        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.getProductList = this.getProductList.bind(this)
    }

    componentDidMount () {
        this.getProducts()
    }

    getProducts () {
        axios.get(`/api/tasks/products/${this.props.task_id}`)
            .then((r) => {
                this.setState({
                    products: r.data.products,
                    selectedProducts: r.data.selectedIds
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    handleClick () {
        axios.post(`/api/tasks/products/${this.props.task_id}`, {
            products: this.state.selectedProducts
        })
            .then((response) => {
                this.setState({ success: true })
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleMultiSelect (e) {
        this.setState({ selectedProducts: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    getProductList () {
        let productList = null
        if (!this.state.products.length) {
            productList = <option value="">Loading...</option>
        } else {
            productList = this.state.products.map((product, index) => {
                return <option key={index} value={product.id}>{product.name}</option>
            })
        }

        return productList
    }

    render () {
        const productList = this.getProductList()
        const { success } = this.state

        return (
            <React.Fragment>

                {success && <div className="alert alert-success" role="alert">
                    Products added to task successfully
                </div>}

                <FormGroup>
                    <Label for="users">Products</Label>
                    <Input value={this.state.selectedProducts} onChange={this.handleMultiSelect} type="select"
                        name="products" id="products" multiple>
                        {productList}
                    </Input>
                </FormGroup>

                <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
            </React.Fragment>
        )
    }
}

export default ProductSelect
