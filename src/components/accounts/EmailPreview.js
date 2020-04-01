import React, { Component } from 'react'
import parse from 'html-react-parser'

class EmailPreview extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: localStorage.getItem('account_id'),
            loaded: false,
            preview: [],
            template_type: ''
        }
    }

    render () {
        return Object.keys(this.props.preview).length
            ? <div className="col-12" style={{ height: '600px', overflowY: 'auto' }}>
                <div>Subject: {parse(this.props.preview.subject)}</div>
                <iframe style={{ width: '900px', height: '460px' }} srcDoc={this.props.preview.wrapper}/>

            </div>
            : null
    }
}

export default EmailPreview
