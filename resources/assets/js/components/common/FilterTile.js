import React, { Component } from 'react'
import { Collapse, Form } from 'reactstrap'

export default class FilterTile extends Component {
    constructor (props) {
        super(props)

        this.state = {
            collapse: false
        }

        this.toggleFilters = this.toggleFilters.bind(this)
    }

    toggleFilters () {
        this.setState({ collapse: !this.state.collapse })
    }

    render () {
        return (
            <Form>
                <span className="d-md-none" onClick={this.toggleFilters}
                    style={{ marginBottom: '1rem', fontSize: '18px' }}>
                    <i style={{ display: (this.state.collapse === false ? 'block' : 'none'), marginTop: '6px' }}
                        className="fa fa-fw fa-chevron-right pull-left"/>
                    <i style={{ display: (this.state.collapse === true ? 'block' : 'none'), marginTop: '6px' }}
                        className="fa fa-fw fa-chevron-down pull-left"/>
                  Filters
                </span>

                <Collapse
                    className="d-md-block"
                    isOpen={this.state.collapse}
                >
                    {this.props.filters}
                </Collapse>
            </Form>
        )
    }
}
