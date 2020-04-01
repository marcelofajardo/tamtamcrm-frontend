import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    DropdownItem, Nav, NavItem, NavLink, TabPane, TabContent
} from 'reactstrap'
import axios from 'axios'
import LeadModel from '../models/LeadModel'
import Contact from './Contact'
import Address from './Address'
import Details from './Details'
import Notes from '../common/Notes'
import Emails from '../emails/Emails'

class EditLeadForm extends React.Component {
    constructor (props) {
        super(props)

        this.leadModel = new LeadModel(this.props.lead)
        this.initialState = this.leadModel.fields
        this.state = this.initialState

        this.toggle = this.toggle.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.handleInputChanges = this.handleInputChanges.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.convertLead = this.convertLead.bind(this)
    }

    componentDidMount () {
        this.getSourceTypes()
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    convertLead () {
        axios.get(`/api/lead/convert/${this.state.id}`)
            .then(function (response) {
                const arrTasks = [...this.props.allTasks]
                const index = arrTasks.findIndex(task => task.id === this.props.task.id)
                arrTasks.splice(index, 1)
                this.props.action(arrTasks)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    handleInputChanges (e) {
        this.setState({
            [e.target.name]: e.target.value,
            changesMade: true
        })
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handleClick (event) {
        this.setState({ loading: true })
        const formData = {
            public_notes: this.state.public_notes,
            private_notes: this.state.private_notes,
            website: this.state.website,
            industry_id: this.state.industry_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            address_1: this.state.address_1,
            address_2: this.state.address_2,
            zip: this.state.zip,
            city: this.state.city,
            job_title: this.state.job_title,
            company_name: this.state.company_name,
            description: this.state.description,
            title: this.state.title,
            valued_at: this.state.valued_at,
            assigned_user_id: this.state.assigned_user_id,
            source_type: this.state.source_type,
            task_type: this.props.task_type,
            task_status: this.state.task_status
        }

        this.leadModel.save(formData).then(response => {
            if (!response) {
                this.setState({ errors: this.leadModel.errors, message: this.taskModel.error_message })
                return
            }

            const index = this.props.allTasks.findIndex(lead => lead.id === this.props.lead.id)
            this.props.allTasks[index] = response
            this.props.action(this.props.allTasks)
            this.setState({
                editMode: false,
                changesMade: false
            })
            this.toggle()
        })
    }

    toggle () {
        if (this.state.modal && this.state.changesMade) {
            if (window.confirm('Your changes have not been saved?')) {
                this.setState({ ...this.initialState })
            }

            return
        }

        this.setState({
            modal: !this.state.modal
        })
    }

    getSourceTypes () {
        axios.get('/api/tasks/source-types')
            .then((r) => {
                this.setState({
                    sourceTypes: r.data,
                    err: ''
                })
            })
            .then((r) => {
                console.warn(this.state.users)
            })
            .catch((e) => {
                console.error(e)
                this.setState({
                    err: e
                })
            })
    }

    render () {
        const { loading } = this.state
        const email_editor = this.state.id
            ? <Emails emails={this.state.emails} template="email_template_lead" show_editor={true} entity="lead"
                entity_id={this.state.id}/> : null
        const contact = <Contact handleInputChanges={this.handleInputChanges} errors={this.state.errors}
            lead={this.state}/>
        const address = <Address handleInputChanges={this.handleInputChanges} errors={this.state.errors}
            lead={this.state}/>
        const details = <Details users={this.props.users} sourceTypes={this.state.sourceTypes}
            handleInputChanges={this.handleInputChanges} errors={this.state.errors}
            lead={this.state}/>
        const button = this.props.listView && this.props.listView === true
            ? <DropdownItem onClick={this.toggle}><i className="fa fa-edit"/>Edit</DropdownItem>
            : <Button className="mr-2 ml-2" color="primary" onClick={this.toggle}>Edit Lead</Button>
        const notes = <Notes handleInput={this.handleInputChanges} private_notes={this.state.private_notes}
            public_notes={this.state.public_notes}/>

        return (
            <React.Fragment>
                {button}
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Lead
                    </ModalHeader>

                    <ModalBody>

                        <React.Fragment>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '1' ? 'active' : ''}
                                        onClick={() => {
                                            this.toggleTab('1')
                                        }}>
                                        Details
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '2' ? 'active' : ''}
                                        onClick={() => {
                                            this.toggleTab('2')
                                        }}>
                                        Contact
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '3' ? 'active' : ''}
                                        onClick={() => {
                                            this.toggleTab('3')
                                        }}>
                                        Address
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '4' ? 'active' : ''}
                                        onClick={() => {
                                            this.toggleTab('4')
                                        }}>
                                        Notes
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '5' ? 'active' : ''}
                                        onClick={() => {
                                            this.toggleTab('5')
                                        }}>
                                        Email
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    {details}
                                </TabPane>

                                <TabPane tabId="2">
                                    {contact}
                                </TabPane>

                                <TabPane tabId="3">
                                    {address}
                                </TabPane>

                                <TabPane tabId="4">
                                    {notes}
                                </TabPane>

                                <TabPane tabId="5">
                                    {email_editor}
                                </TabPane>
                            </TabContent>
                        </React.Fragment>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                        <Button color="success" onClick={this.convertLead}>Convert to Deal</Button>

                        {loading &&
                        <span className="fa fa-circle-o-notch fa-spin"/>
                        }
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditLeadForm
