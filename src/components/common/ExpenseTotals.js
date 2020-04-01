import React, { Component } from 'react'
import {
    Card,
    CardText
} from 'reactstrap'
import FormatMoney from './FormatMoney'
import ExpenseModel from '../models/ExpenseModel'

export default class ExpenseTotals extends Component {
    render () {
        const expenseModel = new ExpenseModel(this.props.entity)
        const convertedAmount = expenseModel.convertedAmount

        return (
            <Card body outline color="success">
                <CardText className="text-white">
                    <div className="d-flex">
                        <div
                            className="p-2 flex-fill">
                            <h4>Amount</h4>
                            {<FormatMoney
                                amount={this.props.entity.amount}/>}
                        </div>

                        <div
                            className="p-2 flex-fill">
                            <h4>Converted</h4>
                            {<FormatMoney
                                amount={convertedAmount}/>}
                        </div>
                    </div>
                </CardText>
            </Card>
        )
    }
}
