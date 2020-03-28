import React from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import LineItemEditor from '../common/LineItemEditor'

export default function Items (props) {
    return (
        <Card>
            <CardHeader>Items</CardHeader>
            <CardBody>
                <LineItemEditor
                    invoice={props.order}
                    delete={props.handleDelete}
                    update={props.handleFieldChange}
                    onAddFiled={props.handleAddFiled}
                    setTotal={props.setTotal}
                />
                <br/>
                <br/>
            </CardBody>
        </Card>

    )
}
