import React from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import axios from 'axios'
import AddButtons from '../common/AddButtons'
import LeadModel from '../models/LeadModel'
import Contact from './Contact'
import Address from './Address'
import Details from './Details'
import Notes from '../common/Notes'

class AddLeadForm extends React.Component {
    constructor (props) {
        super(props)

        this.leadModel = new LeadModel(null)
        this.initialState = this.leadModel.fields
        this.state = this.initialState

        this.state = this.initialState
        this.toggle = this.toggle.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.handleInputChanges = this.handleInputChanges.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount () {
        this.getSourceTypes()
    }

    toggleTab (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleInputChanges (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick (event) {
        this.setState({ loading: true })
        const data = {
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
            task_status: this.props.status
        }

        this.leadModel.save(data).then(response => {
            if (!response) {
                this.setState({ errors: this.leadModel.errors, message: this.taskModel.error_message })
                return
            }
            this.props.leads.push(response)
            this.props.action(this.props.leads)
            this.setState(this.initialState)
            localStorage.removeItem('leadForm')
        })
    }

    toggle () {
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
        const contact = <Contact handleInputChanges={this.handleInputChanges} errors={this.state.errors}
            lead={this.state}/>
        const address = <Address handleInputChanges={this.handleInputChanges} errors={this.state.errors}
            lead={this.state}/>
        const details = <Details users={this.props.users} sourceTypes={this.state.sourceTypes}
            handleInputChanges={this.handleInputChanges} errors={this.state.errors}
            lead={this.state}/>

        const notes = <Notes handleInput={this.handleInputChanges} private_notes={this.state.private_notes}
            public_notes={this.state.public_notes}/>

        return (
            <React.Fragment>
                <AddButtons toggle={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Add Lead
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
                            </TabContent>
                        </React.Fragment>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.handleClick.bind(this)}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>

                        {loading &&
                        <span className="fa fa-circle-o-notch fa-spin"/>
                        }
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AddLeadForm
