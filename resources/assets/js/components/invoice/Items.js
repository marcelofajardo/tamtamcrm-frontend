import React from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import LineItemEditor from '../common/LineItemEditor'

export default function Items (props) {
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
                    setTotal={props.setTotal}
                    total_custom_values={props.total_custom_values}
                    total_custom_tax={props.total_custom_tax}/>
                <br/>
                <br/>
            </CardBody>
        </Card>

    )
}
