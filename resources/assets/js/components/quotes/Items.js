import React from 'react'
import { FormGroup, Label, Input, Card, CardHeader, CardBody, TabPane } from 'reactstrap'
import TaxRateDropdown from '../common/TaxRateDropdown'
import DesignDropdown from '../common/DesignDropdown'
import LineItemEditor from '../common/LineItemEditor'

export default function Items (props) {
    const hasErrorFor = (field) => {
        return props.errors && !!props.errors[field]
    }

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{props.errors[field][0]}</strong>
                </span>
            )
        }
    }

    return (
        <Card>
            <CardHeader>Items</CardHeader>
            <CardBody>
                <LineItemEditor
                    total={props.total}
                    sub_total={props.sub_total}
                    tax_total={props.tax_total}
                    discount_total={props.discount_total}
                    rows={props.data}
                    delete={props.handleDelete}
                    update={props.handleFieldChange}
                    onAddFiled={props.handleAddFiled}
                    setTotal={props.setTotal}/>

                <br/>
                <br/>
            </CardBody>
        </Card>

    )
}
