import React, { Component } from 'react'
import {
    Card,
    CardText
} from 'reactstrap'
import FormatMoney from './FormatMoney'

export default class CustomerTotals extends Component {
    render () {
        return (
            <Card body outline color="danger">
                <CardText className="text-white">
                    <div className="d-flex">
                        <div
                            className="p-2 flex-fill">
                            <h4>Paid to Date</h4>
                            {<FormatMoney
                                amount={this.props.entity.paid_to_date}/>}
                        </div>

                        <div
                            className="p-2 flex-fill">
                            <h4>Balance</h4>
                            {<FormatMoney
                                amount={this.props.entity.balance} />}
                        </div>
                    </div>
                </CardText>
            </Card>
        )
    }
}
