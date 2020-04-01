import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent, TabPane,
    Spinner
} from 'reactstrap'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import EmailEditorForm from '../emails/EmailEditorForm'
import ViewEmails from '../emails/ViewEmails'
import EmailFields from '../accounts/EmailFields'
import EmailPreview from '../accounts/EmailPreview'

export default class Emails extends Component {
    constructor (props) {
        super(props)

        this.state = {
            settings: [],
            id: localStorage.getItem('account_id'),
            loaded: false,
            activeTab: '1',
            preview: null,
            subject: '',
            body: '',
            showSpinner: true,
            showPreview: false,
            template_type: this.props.template,
            template_name: 'Invoice'
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.getAccount = this.getAccount.bind(this)
        this.getPreview = this.getPreview.bind(this)
        this.buildPreviewData = this.buildPreviewData.bind(this)
    }

    componentDidMount () {
        this.getAccount()
    }

    async getAccount () {
        return axios.get(`api/accounts/${this.state.id}`)
            .then((r) => {
                this.setState({
                    loaded: true,
                    settings: r.data.settings
                }, () => this.getPreview())
            })
            .catch((e) => {
                alert('There was an issue updating the settings')
            })
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value })

        if (event.target.name === 'template_type') {
            const name = event.target[event.target.selectedIndex].getAttribute('data-name')
            this.setState({ template_name: name })
        }
    }

    handleSettingsChange (name, value) {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                [name]: value
            }
        }), () => {
            const { subject, body } = this.buildPreviewData()
            this.setState({
                subject: subject,
                body: body
            })
        })
    }

    buildPreviewData () {
        const subjectKey = this.state.template_type.replace('template', 'subject')
        const bodyKey = this.state.template_type

        const subject = !this.state.settings[subjectKey] ? 'Subject Here' : this.state.settings[subjectKey]
        const body = !this.state.settings[bodyKey] ? 'Body Here' : this.state.settings[bodyKey]

        return {
            subject: subject,
            body: body,
            bodyKey: bodyKey
        }
    }

    getPreview () {
        this.setState({ showSpinner: true, showPreview: false })

        const { subject, body, bodyKey } = this.buildPreviewData()

        axios.post('api/template', {
            subject: subject,
            body: body,
            template: bodyKey,
            entity_id: this.props.entity_id,
            entity: this.props.entity
        })
            .then((r) => {
                this.setState({
                    preview: r.data,
                    showSpinner: false,
                    showPreview: true,
                    subject: subject,
                    body: body
                })
            })
            .catch((e) => {
                toast.error('There was an issue updating the settings')
            })
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab }, () => {
                if (tab === '1') {
                    this.getPreview()
                }
            })
        }
    }

    render () {
        const fields = this.state.settings[this.state.template_type] && this.state.settings[this.state.template_type].length
            ? <EmailFields custom_only={true} return_form={false} settings={this.state.settings}
                template_type={this.props.template}
                handleSettingsChange={this.handleSettingsChange}
                handleChange={this.handleChange}/> : null
        const preview = this.state.showPreview && this.state.preview && Object.keys(this.state.preview).length && this.state.settings[this.state.template_type] && this.state.settings[this.state.template_type].length
            ? <EmailPreview preview={this.state.preview} entity={this.props.entity} entity_id={this.props.entity_id}
                template_type={this.state.template_type}/> : null
        const editor = this.state.subject.length && this.state.body.length
            ? <EmailEditorForm
                subject={this.state.subject}
                body={this.state.body}
                handleSettingsChange={this.handleSettingsChange}
                calculated_template={this.state.template_type}
                template_type={this.props.template}
                show_editor={true} entity={this.props.entity}
                entity_id={this.props.entity_id}/> : null
        const spinner = this.state.showSpinner === true ? <Spinner style={{ width: '3rem', height: '3rem' }}/> : null

        return (
            <React.Fragment>
                <ToastContainer/>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('1')
                            }}>
                            Preview
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('2')
                            }}>
                            Customise
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('3')
                            }}>
                            History
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>

                    <TabPane tabId="1">
                        <Card>
                            <CardHeader>Preview</CardHeader>
                            <CardBody>
                                {fields}
                                {spinner}
                                {preview}
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="2">
                        <Card>
                            <CardHeader>Customise</CardHeader>
                            <CardBody>
                                {editor}
                            </CardBody>
                        </Card>
                    </TabPane>

                    <TabPane tabId="3">
                        <Card>
                            <CardHeader>History</CardHeader>
                            <CardBody>
                                <ViewEmails template_type={this.state.template_type}
                                    handleSettingsChange={this.handleSettingsChange}
                                    active_id={this.state.active_id}
                                    emails={this.props.emails}/>
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}
