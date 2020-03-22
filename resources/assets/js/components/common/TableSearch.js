import React, { Component } from 'react'
import { Button, Input, InputGroup, UncontrolledTooltip } from 'reactstrap'

export default class TableSearch extends Component {
    constructor (props) {
        super(props)
        this.state = {
            query: ''
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.reset = this.reset.bind(this)
    }

    handleSearchChange (event) {
        const query = event.target.value
        if (query.length === 0 || query.length > 3) {
            this.props.onChange(event)
        }

        this.setState({ query: query })
    }

    reset () {
        const e = {
            target: {
                name: 'searchText',
                value: ''
            }
        }

        this.setState({ query: '' }, () => this.props.onChange(e))
    }

    render () {
        const { query } = this.state

        return (
            <React.Fragment>
                <UncontrolledTooltip placement="right" target="clearSearch">
                    Clear Search
                </UncontrolledTooltip>

                <UncontrolledTooltip placement="top" target="searchText">
                    Search
                </UncontrolledTooltip>

                <InputGroup className="mb-3">
                    <Input id="searchText" name="searchText" type="text" placeholder="Search..." value={query} onChange={this.handleSearchChange}/>
                    <Button color="link" className="bg-transparent"
                        style={{ marginLeft: '-40px', zIndex: 100, color: '#e4e7ea' }}
                        onClick={() => this.reset()}>
                        <i id="clearSearch" className="fa fa-times"/>
                    </Button>
                </InputGroup>
            </React.Fragment>
        )
    }
}
