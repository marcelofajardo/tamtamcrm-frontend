import React, { Component } from 'react'
import axios from 'axios'
import {
    Input
} from 'reactstrap'
import RestoreModal from '../common/RestoreModal'
import DeleteModal from '../common/DeleteModal'
import ActionsMenu from '../common/ActionsMenu'
import EditProduct from './EditProduct'

export default class ProductItem extends Component {
    constructor (props) {
        super(props)

        this.deleteProduct = this.deleteProduct.bind(this)
    }

    deleteProduct (id, archive = false) {
        const self = this
        const url = archive === true ? `/api/products/archive/${id}` : `/api/products/${id}`
        axios.delete(url)
            .then(function (response) {
                const arrProducts = [...self.props.products]
                const index = arrProducts.findIndex(product => product.id === id)
                arrProducts.splice(index, 1)
                self.props.addProductToState(arrProducts)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        const { products, custom_fields, companies, categories, ignoredColumns } = this.props

        if (products && products.length) {
            return products.map(product => {
                const restoreButton = product.deleted_at
                    ? <RestoreModal id={product.id} entities={products} updateState={this.props.addProductToState}
                        url={`/api/products/restore/${product.id}`}/> : null
                const deleteButton = !product.deleted_at
                    ? <DeleteModal archive={false} deleteFunction={this.deleteProduct} id={product.id}/> : null
                const editButton = !product.deleted_at ? <EditProduct
                    custom_fields={custom_fields}
                    companies={companies}
                    categories={categories}
                    product={product}
                    products={products}
                    action={this.props.addProductToState}
                /> : null

                const archiveButton = !product.deleted_at
                    ? <DeleteModal archive={true} deleteFunction={this.deleteProduct} id={product.id}/> : null

                const columnList = Object.keys(product).filter(key => {
                    return ignoredColumns && !ignoredColumns.includes(key)
                }).map(key => {
                    return <td onClick={() => this.props.toggleViewedEntity(product, product.name)} data-label={key}
                        key={key}>{product[key]}</td>
                })

                const checkboxClass = this.props.showCheckboxes === true ? '' : 'd-none'

                return <tr key={product.id}>
                    <td>
                        <Input className={checkboxClass} value={product.id} type="checkbox" onChange={this.props.onChangeBulk} />
                        <ActionsMenu edit={editButton} delete={deleteButton} archive={archiveButton}
                            restore={restoreButton}/>
                    </td>
                    {columnList}
                </tr>
            })
        } else {
            return <tr>
                <td className="text-center">No Records Found.</td>
            </tr>
        }
    }
}
