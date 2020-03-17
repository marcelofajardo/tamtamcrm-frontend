import React, { Component } from 'react'
import FormBuilder from './FormBuilder'
import { Button, Card, CardHeader, CardBody } from 'reactstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

class ProductSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: localStorage.getItem('account_id'),
            settings: {}
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.getAccount = this.getAccount.bind(this)
    }

    componentDidMount () {
        this.getAccount()
    }

    getAccount () {
        axios.get(`api/accounts/${this.state.id}`)
            .then((r) => {
                this.setState({
                    loaded: true,
                    settings: r.data.settings
                })
            })
            .catch((e) => {
                console.log(e)
                // this.setState({
                //     loading: false,
                //     err: e
                // })
            })
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSettingsChange (event) {
        const name = event.target.name
        const value = event.target.value

        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                [name]: value
            }
        }))
    }

    handleSubmit (e) {
        const formData = new FormData()
        formData.append('settings', JSON.stringify(this.state.settings))
        formData.append('_method', 'PUT')

        axios.post(`/api/accounts/${this.state.id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                toast.success('Settings updated successfully')
            })
            .catch((error) => {
                console.error(error)
                toast.error('There was an issue updating the settings')
            })
    }

    getProductFields () {
        const settings = this.state.settings

        const formFields = [
            [
                {
                    name: 'update_products',
                    label: 'Update Products',
                    type: 'checkbox',
                    placeholder: 'Update Products',
                    value: settings.update_products
                },
                {
                    name: 'show_cost',
                    label: 'Show Cost',
                    type: 'checkbox',
                    placeholder: 'Show Cost',
                    value: settings.show_cost
                },
                {
                    name: 'show_product_quantity',
                    label: 'Show Product Quantity',
                    type: 'checkbox',
                    placeholder: 'Show Product Quantity',
                    value: settings.show_product_quantity
                },
                {
                    name: 'fill_products',
                    label: 'Fill Products',
                    type: 'checkbox',
                    placeholder: 'Fill Products',
                    value: settings.fill_products
                },
                {
                    name: 'convert_products',
                    label: 'Convert Products',
                    type: 'checkbox',
                    placeholder: 'Convert Products',
                    value: settings.convert_products
                },
                {
                    name: 'default_quantity',
                    label: 'Default Quantity',
                    type: 'checkbox',
                    placeholder: 'Default Quantity',
                    value: settings.default_quantity
                }
            ]
        ]

        return formFields
    }

    handleCheckboxChange (e) {
        const value = e.target.checked
        const name = e.target.name

        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                [name]: value
            }
        }))
    }

    render () {
        return this.state.loaded === true ? (
            <React.Fragment>
                <ToastContainer/>
                <Card>
                    <CardHeader>Product Settings</CardHeader>
                    <CardBody>
                        <FormBuilder
                            handleCheckboxChange={this.handleCheckboxChange}
                            handleChange={this.handleSettingsChange}
                            formFieldsRows={this.getProductFields()}
                        />
                        <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                    </CardBody>
                </Card>
            </React.Fragment>
        ) : null
    }
}

export default ProductSettings
