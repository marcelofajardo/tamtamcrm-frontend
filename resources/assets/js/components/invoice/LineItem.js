import React, { Component } from 'react'
import { Button, Input, Col, Row, FormGroup, Label } from 'reactstrap'
import ProductDropdown from '../common/ProductDropdown'

class LineItem extends Component {
    constructor (props) {
        super(props)
        // this.state = Object.assign({}, props.lineItemData)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleDeleteClick () {
        this.props.onDelete(this.props.id)
    }

    renderErrorFor () {

    }

    render () {
        return this.props.rows.map((lineItem, index) =>
            <React.Fragment>
                <Row form>
                    <Col md={3} data-id={index}>
                        <FormGroup>
                            <Label>Product</Label>
                            <ProductDropdown
                                dataId={index}
                                renderErrorFor={this.renderErrorFor}
                                name="product_id"
                                handleInputChanges={this.props.onChange}
                                product={lineItem.product_id}
                                products={this.props.products}
                            />
                        </FormGroup>
                    </Col>

                    <Col md={2} data-id={index}>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input name="unit_price" data-line={index} type='text' data-column="5"
                                value={lineItem.unit_price} onChange={this.props.onChange}
                                className='pa2 mr2 f6 form-control'/>
                        </FormGroup>
                    </Col>

                    <Col md={1} data-id={index}>
                        <FormGroup>
                            <Label>Quantity</Label>
                            <Input name="quantity" data-line={index} type='text' value={lineItem.quantity}
                                onChange={this.props.onChange} className='pa2 mr2 f6 form-control'/>
                        </FormGroup>
                    </Col>

                    <Col md={2} data-id={index}>
                        <FormGroup>
                            <Label>Discount</Label>
                            <Input name="unit_discount" data-line={index} type='text'
                                value={lineItem.unit_discount}
                                onChange={this.props.onChange} className='pa2 mr2 f6 form-control'/>
                        </FormGroup>
                    </Col>

                    <Col md={2} data-id={index}>
                        <FormGroup>
                            <Label>Tax</Label>
                            <Input name="unit_tax" data-line={index} type='select' value={lineItem.unit_tax}
                                onChange={this.props.onChange} className='pa2 mr2 f6 form-control'>
                                <option value="0">No Tax</option>
                                {this.props.tax_rates.map(tax_rate =>
                                    <option value={tax_rate.rate} key={tax_rate.id}>{tax_rate.rate}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <FormGroup className="mr-4">
                        <Label>Tax Total</Label>
                        <p className='pa2 mr2 f6'>{lineItem.tax_total}</p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Sub Total</Label>
                        <p className='pa2 mr2 f6'>{lineItem.sub_total}</p>
                    </FormGroup>
                </Row>

                <Row form>
                    <Col md={2} data-id={index}>
                        <Button color="danger" onClick={(event) => {
                            this.props.onDelete(index)
                        }}>Delete</Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default LineItem
