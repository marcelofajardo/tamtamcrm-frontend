import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
    CustomInput,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import axios from 'axios'
import CompanyDropdown from '../common/CompanyDropdown'
import CategoryDropdown from '../common/CategoryDropdown'
import UserDropdown from '../common/UserDropdown'
import FormBuilder from '../accounts/FormBuilder'
import AddButtons from '../common/AddButtons'

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
    }

    componentDidMount () {
        if (localStorage.hasOwnProperty('productForm')) {
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
        const customFields = this.props.custom_fields ? this.props.custom_fields : []
        const customForm = customFields && customFields.length ? <FormBuilder
            handleChange={this.handleInput.bind(this)}
            formFieldsRows={customFields}
        /> : null
        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Product
                    </ModalHeader>
                    <ModalBody>
                        <Card>
                            <CardHeader>Product</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label for="name">Name(*):</Label>
                                    <Input className={this.hasErrorFor('name') ? 'is-invalid' : ''} type="text"
                                        name="name" value={this.state.name} onChange={this.handleInput.bind(this)}/>
                                    {this.renderErrorFor('name')}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="description">Description:</Label>
                                    <Input className={this.hasErrorFor('description') ? 'is-invalid' : ''}
                                        value={this.state.description}
                                        type="textarea"
                                        name="description"
                                        onChange={this.handleInput.bind(this)}/>
                                    {this.renderErrorFor('description')}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="quantity">Quantity:</Label>
                                    <Input className={this.hasErrorFor('quantity') ? 'is-invalid' : ''}
                                        type="text"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.handleInput.bind(this)}/>
                                    {this.renderErrorFor('quantity')}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="sku">Sku(*):</Label>
                                    <Input className={this.hasErrorFor('sku') ? 'is-invalid' : ''}
                                        value={this.state.sku}
                                        type="text"
                                        name="sku"
                                        onChange={this.handleInput.bind(this)}/>
                                    {this.renderErrorFor('sku')}
                                </FormGroup>

                                <CompanyDropdown
                                    company_id={this.state.company_id}
                                    name="company_id"
                                    hasErrorFor={this.hasErrorFor}
                                    errors={this.state.errors}
                                    handleInputChanges={this.handleInput}
                                />

                                <CategoryDropdown
                                    multiple={true}
                                    name="category"
                                    errors={this.state.errors}
                                    handleInputChanges={this.handleMultiSelect}
                                    categories={this.props.categories}
                                />

                                <FormGroup>
                                    <Label for="postcode">Users:</Label>
                                    <UserDropdown
                                        name="assigned_user_id"
                                        errors={this.state.errors}
                                        handleInputChanges={this.handleInput.bind(this)}
                                    />
                                </FormGroup>

                                {customForm}

                                <FormGroup>
                                    <Label for="postcode">Notes:</Label>
                                    <Input
                                        value={this.state.notes}
                                        type='textarea'
                                        name="notes"
                                        errors={this.state.errors}
                                        onChange={this.handleInput.bind(this)}
                                    />
                                </FormGroup>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>Prices</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label for="price">Price(*):</Label>
                                    <Input className={this.hasErrorFor('price') ? 'is-invalid' : ''}
                                        value={this.state.price}
                                        type="text"
                                        name="price"
                                        onChange={this.handleInput.bind(this)}/>
                                    {this.renderErrorFor('price')}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="price">Cost(*):</Label>
                                    <Input className={this.hasErrorFor('cost') ? 'is-invalid' : ''}
                                        value={this.state.cost}
                                        type="text"
                                        name="cost"
                                        onChange={this.handleInput.bind(this)}/>
                                    {this.renderErrorFor('cost')}
                                </FormGroup>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>Images</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label>Cover Image </Label>
                                    <CustomInput className="mt-4 mb-4" onChange={this.handleFileChange.bind(this)}
                                        type="file" id="cover" name="cover"
                                        label="Cover!"/>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Thumbnails</Label>
                                    <Input className="mb-4" onChange={this.onChangeHandler.bind(this)} multiple
                                        type="file" id="image" name="image"
                                        label="Thumbnail!"/>
                                </FormGroup>
                            </CardBody>
                        </Card>

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
