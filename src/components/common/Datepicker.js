import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class Datepicker extends Component {
    constructor (props) {
        super(props)
        this.state = {
            roles: [],
            modal: false
        }

        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange (date) {
        const e = {}
        e.target = {
            name: this.props.name,
            value: moment(date).format('YYYY-MM-DD')
        }

        this.props.handleInput(e)
    }

    render () {
        const date = !this.props.date || this.props.date === 'undefined' || this.props.date === '' ? moment(new Date()).add(1, 'days').format('YYYY-MM-DD') : this.props.date
        const class_name = this.props.className === '' ? 'form-control' : this.props.className
        return (
            <DatePicker selected={new Date(date)}
                dateFormat="MMMM d, yyyy"
                className={class_name}
                todayButton="Today"
                onChange={this.handleDateChange.bind(this)}/>
        )
    }
}
