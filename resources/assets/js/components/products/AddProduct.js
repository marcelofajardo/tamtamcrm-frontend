import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, TabPane
} from 'reactstrap'
import axios from 'axios'
import AddButtons from '../common/AddButtons'
import CostsForm from './CostsForm'
import ImageForm from './ImageForm'
import DetailsForm from './DetailsForm'
import CustomFieldsForm from '../common/CustomFieldsForm'

class AddProduct extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal: false,
            name: '',
            description: '',
            company_id: null,
            quantity: 0,
            cost: 0,
            assigned_user_id: null,
            custom_value1: '',
            custom_value2: '',
            custom_value3: '',
            custom_value4: '',
            notes: '',
            price: '',
            sku: '',
            loading: false,
            errors: [],
            categories: [],
            selectedCategories: []
        }

        this.toggle = this.toggle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    componentDidMount () {
        if (Object.prototype.hasOwnProperty.call(localStorage, 'productForm')) {
            const storedValues = JSON.parse(localStorage.getItem('productForm'))
            this.setState({ ...storedValues }, () => console.log('new state', this.state))
        }
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
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

    handleClick () {
        const formData = new FormData()
        formData.append('cover', this.state.cover)

        if (this.state.image && this.state.image.length) {
            for (let x = 0; x < this.state.image.length; x++) {
                formData.append('image[]', this.state.image[x])
            }
        }

        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('price', this.state.price)
        formData.append('cost', this.state.cost)
        formData.append('quantity', this.state.quantity)
        formData.append('sku', this.state.sku)
        formData.append('company_id', this.state.company_id)
        formData.append('category', this.state.selectedCategories)
        formData.append('notes', this.state.notes)
        formData.append('assigned_user_id', this.state.assigned_user_id)
        formData.append('custom_value1', this.state.custom_value1)
        formData.append('custom_value2', this.state.custom_value2)
        formData.append('custom_value3', this.state.custom_value3)
        formData.append('custom_value4', this.state.custom_value4)

        axios.post('/api/products', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                this.toggle()
                const newProduct = response.data
                this.props.products.push(newProduct)
                this.props.action(this.props.products)
                localStorage.removeItem('productForm')
                this.setState({
                    name: '',
                    description: '',
                    company_id: null,
                    quantity: 0,
                    cost: 0,
                    assigned_user_id: null,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    notes: '',
                    price: '',
                    sku: '',
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    handleFileChange (e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    onChangeHandler (e) {
        // if return true allow to setState
        this.setState({
            [e.target.name]: e.target.files
        }, () => localStorage.setItem('productForm', JSON.stringify(this.state)))
    }

    handleMultiSelect (e) {
        this.setState({ selectedCategories: Array.from(e.target.selectedOptions, (item) => item.value) }, () => localStorage.setItem('productForm', JSON.stringify(this.state)))
    }

    handleInput (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => localStorage.setItem('productForm', JSON.stringify(this.state)))
    }

    toggle () {
        this.setState({
            modal: !this.state.modal,
            errors: []
        }, () => {
            if (!this.state.modal) {
                this.setState({
                    name: '',
                    description: '',
                    company_id: null,
                    quantity: 0,
                    cost: 0,
                    assigned_user_id: null,
                    custom_value1: '',
                    custom_value2: '',
                    custom_value3: '',
                    custom_value4: '',
                    notes: '',
                    price: '',
                    sku: ''
                }, () => localStorage.removeItem('productForm'))
            }
        })
    }

    render () {
        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Product
                    </ModalHeader>
                    <ModalBody>
                        <DetailsForm errors={this.state.errors} handleInput={this.handleInput} notes={this.state.notes}
                            assigned_user_id={this.state.assigned_user_id}
                            handleMultiSelect={this.handleMultiSelect} categories={this.props.categories}
                            selectedCategories={this.state.selectedCategories}
                            company_id={this.state.company_id} companies={this.state.companies}
                            sku={this.state.sku} description={this.state.description}
                            quantity={this.state.quantity} name={this.state.name}/>

                        <CustomFieldsForm handleInput={this.handleInput} custom_value1={this.state.custom_value1}
                            custom_value2={this.state.custom_value2}
                            custom_value3={this.state.custom_value3}
                            custom_value4={this.state.custom_value4}
                            custom_fields={this.props.custom_fields}/>

                        <CostsForm errors={this.state.errors} price={this.state.price} handleInput={this.handleInput}
                            cost={this.state.cost}/>

                        <ImageForm errors={this.state.errors} images={this.state.images}
                            deleteImage={null} handleFileChange={this.handleFileChange}
                            onChangeHandler={this.onChangeHandler}/>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AddProduct
