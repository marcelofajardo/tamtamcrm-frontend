import React, { Component } from 'react'

class Checkbox extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <input className="form-check-input" type="checkbox" name={this.props.name} checked={this.props.checked} onChange={this.props.onChange}/>
        )
    }
}

export default Checkbox
