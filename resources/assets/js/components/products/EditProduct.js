import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    CardHeader,
    DropdownItem, TabPane
} from 'reactstrap'
import axios from 'axios'
import PropTypes from 'prop-types'
import ProductAttribute from './ProductAttribute'
import SuccessMessage from '../common/SucessMessage'
import ErrorMessage from '../common/ErrorMessage'
import DetailsForm from './DetailsForm'
import CostsForm from './CostsForm'
import ImageForm from './ImageForm'
import ProductListDropdown from './ProductListDropdown'
import CustomFieldsForm from '../common/CustomFieldsForm'

class EditProduct extends React.Component {
    constructor (props) {
        super(props)

        this.productAttributes = {
            range_from: this.props.product.range_from ? this.props.product.range_from : 0,
            range_to: this.props.product.range_to ? this.props.product.range_to : 0,
            payable_months: this.props.product.payable_months ? this.props.product.payable_months : 12,
            minimum_downpayment: this.props.product.minimum_downpayment ? this.props.product.minimum_downpayment : 0,
            number_of_years: this.props.product.number_of_years ? this.props.product.number_of_years : 0,
            interest_rate: this.props.product.interest_rate ? this.props.product.interest_rate : 0
        }

        this.state = {
            modal: false,
            loading: false,
            changesMade: false,
            dropdownOpen: false,
            showSuccessMessage: false,
            showErrorMessage: false,
            errors: [],
            name: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price,
            cost: this.props.product.cost,
            quantity: this.props.product.quantity,
            sku: this.props.product.sku,
            images: this.props.product.images,
            id: this.props.product.id,
            categories: [],
            selectedCategories: this.props.product.category_ids ? this.props.product.category_ids : [],
            company_id: this.props.product.company_id,
            assigned_user_id: this.props.product.assigned_user_id,
            notes: this.props.product.notes,
            custom_value1: this.props.product.custom_value1,
            custom_value2: this.props.product.custom_value2,
            custom_value3: this.props.product.custom_value3,
            custom_value4: this.props.product.custom_value4
        }

        this.initialState = this.state
        this.state = { ...this.state, ...this.productAttributes }

        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    getFormData () {
        const formData = new FormData()
        formData.append('cover', this.state.cover)

        if (this.state.image && this.state.image.length) {
            for (let x = 0; x < this.state.image.length; x++) {
                formData.append('image[]', this.state.image[x])
            }
        }

        formData.append('name', this.state.name)
        formData.append('assigned_user_id', this.state.assigned_user_id)
        formData.append('notes', this.state.notes)
        formData.append('description', this.state.description)
        formData.append('quantity', this.state.quantity)
        formData.append('price', this.state.price)
        formData.append('cost', this.state.cost)
        formData.append('sku', this.state.sku)
        formData.append('company_id', this.state.company_id)
        formData.append('category', this.state.selectedCategories)
        formData.append('range_from', this.state.range_from)
        formData.append('range_to', this.state.range_to)
        formData.append('payable_months', this.state.payable_months)
        formData.append('number_of_years', this.state.number_of_years)
        formData.append('minimum_downpayment', this.state.minimum_downpayment)
        formData.append('interest_rate', this.state.interest_rate)
        formData.append('custom_value1', this.state.custom_value1)
        formData.append('custom_value2', this.state.custom_value2)
        formData.append('custom_value3', this.state.custom_value3)
        formData.append('custom_value4', this.state.custom_value4)
        formData.append('_method', 'PUT')

        return formData
    }

    handleClick () {
        const formData = this.getFormData()

        axios.post(`/api/products/${this.state.id}`, formData)
            .then((response) => {
                this.setState({ changesMade: false })
                const index = this.props.products.findIndex(product => parseInt(product.id) === this.state.id)
                this.props.products[index] = response.data
                this.props.action(this.props.products)
                this.toggle()
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    handleInput (e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value,
            changesMade: true
        })
    }

    handleMultiSelect (e) {
        this.setState({ selectedCategories: Array.from(e.target.selectedOptions, (item) => item.value) })
    }

    handleFileChange (e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    onChangeHandler (e) {
        const files = e.target.files

        console.log('files', files)

        // if return true allow to setState
        this.setState({
            [e.target.name]: e.target.files
        })
    }

    toggle () {
        if (this.state.modal && this.state.changesMade) {
            if (window.confirm('Your changes have not been saved?')) {
                this.setState({ ...this.initialState })
            }

            return
        }

        this.setState({
            modal: !this.state.modal,
            errors: []
        })
    }

    deleteImage (e) {
        const src = e.target.getAttribute('data-src')

        axios.post('/api/products/removeImages', {
            product: this.state.id,
            image: src
        })
            .then(function (response) {
                // const arrProducts = [...self.state.products]
                // const index = arrProducts.findIndex(product => product.id === id)
                // arrProducts.splice(index, 1)
                // self.addProductToState(arrProducts)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        const successMessage = this.state.showSuccessMessage === true
            ? <SuccessMessage message="Invoice was updated successfully"/> : null
        const errorMessage = this.state.showErrorMessage === true
            ? <ErrorMessage message="Something went wrong"/> : null

        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Product
                    </ModalHeader>
                    <ModalBody>

                        <ProductListDropdown id={this.state.id} formData={this.getFormData()}/>
                        {successMessage}
                        {errorMessage}

                        <DetailsForm errors={this.state.errors} handleInput={this.handleInput} product={this.state}
                            handleMultiSelect={this.handleMultiSelect} categories={this.props.categories}
                            selectedCategories={this.state.selectedCategories}
                            companies={this.state.companies}/>

                        <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                            custom_value2={this.state.custom_value2}
                            custom_value3={this.state.custom_value3}
                            custom_value4={this.state.custom_value4}
                            custom_fields={this.props.custom_fields}/>

                        <CostsForm product={this.state} errors={this.state.errors} handleInput={this.handleInput}
                        />

                        <ImageForm errors={this.state.errors} product={this.props.product} images={this.state.images}
                            deleteImage={this.deleteImage} handleFileChange={this.handleFileChange}
                            onChangeHandler={this.onChangeHandler}/>

                        <Card>
                            <CardHeader>Attributes</CardHeader>
                            <CardBody>

                                <ProductAttribute values={this.productAttributes} product={this.props.product}
                                    onChange={this.handleInput}/>
                            </CardBody>
                        </Card>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditProduct

EditProduct.propTypes = {
    product: PropTypes.object,
    products: PropTypes.array,
    action: PropTypes.func
}
