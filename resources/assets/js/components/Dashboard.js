import React, { Component } from 'react'
import {
    Row, Col, Nav,
    NavItem,
    NavLink,
    TabContent, TabPane
} from 'reactstrap'
import { CardModule } from './common/Card.jsx'
import ReactEcharts from 'echarts-for-react'
import { StatsCard } from './common/StatsCard.jsx'
import axios from 'axios'
import MessageContainer from './activity/MessageContainer'

class Dashboard extends Component {
    constructor (props) {
        super(props)
        this.getOption = this.getOption.bind(this)
        this.state = {
            sources: [],
            leadCounts: [],
            totalBudget: 0,
            totalEarnt: 0,
            leadsToday: 0,
            newDeals: 0,
            newCustomers: 0,
            deals: [],
            activeTab: '1'
        }

        this.toggle = this.toggle.bind(this)
    }

    componentDidMount () {
        axios.get('/api/dashboard')
            .then((r) => {
                if (r.data) {
                    this.setState(
                        {
                            sources: r.data.sources,
                            leadCounts: r.data.leadCounts,
                            totalBudget: r.data.totalBudget,
                            totalEarnt: r.data.totalEarnt,
                            leadsToday: r.data.leadsToday,
                            newDeals: r.data.newDeals,
                            newCustomers: r.data.newCustomers,
                            deals: r.data.deals
                        }
                    )
                }
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    getPieOptions () {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['Website', 'Personal Contact', 'Email', 'Other', 'Call']
            },
            series: [
                {
                    name: 'Sources',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.state.sources,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    getOption () {
        return {
            backgroundColor: '#1b1b1b',
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%'
            },
            legend: {
                orient: 'horizontal',
                x: 'left',
                y: 0,
                data: ['Opened', 'Lost', 'Demo', 'Contacted', 'Won', 'No Show']
            },
            // Add Custom Colors
            color: ['#0FB365', '#1EC481', '#28D094', '#48D7A4', '#94E8CA', '#BFF1DF'],
            // Enable drag recalculate
            calculable: true,
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: 'Deals',
                    type: 'funnel',
                    funnelAlign: 'left',
                    x: '25%',
                    x2: '25%',
                    y: '17.5%',
                    width: '50%',
                    height: '80%',
                    data: this.state.leadCounts
                }
            ]
        }
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    render () {
        const onEvents = {
            click: this.onChartClick,
            legendselectchanged: this.onChartLegendselectchanged
        }

        let leads = ''

        if (this.state.deals.length) {
            let count = 1

            leads = this.state.deals.map((lead, index) => {
                return (
                    <React.Fragment key={index}>
                        <div key={index} className="media mt-1">
                            <div className="media-left pr-2">
                                <img className="media-object avatar avatar-md rounded-circle"
                                    src={`/files/avatar${count++}.png`} alt="Generic placeholder image"/>
                            </div>
                            <div className="media-body">
                                <p className="text-bold-600 m-0">{lead.title.substring(0, 40)} <span
                                    className="float-right badge badge-success">{lead.status_name}</span></p>
                                <p className="font-small-2 text-muted m-0">{lead.valued_at}<i
                                    className="ft-calendar pl-1"/>{lead.due_date}</p>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })
        }
        return (
            <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('1')
                            }}>
                            Dashboard
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                this.toggle('2')
                            }}>
                            Activity
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col className="col-xl-4" lg={6} md={12}>
                                <CardModule
                                    body={true}
                                    hCenter={true}
                                    header={
                                        <React.Fragment>
                                            <span className="success darken-1">Total Budget</span>
                                            <h3 className="font-large-2 grey darken-1 text-bold-200">{this.state.totalBudget}</h3>
                                        </React.Fragment>
                                    }
                                    content={
                                        <React.Fragment>
                                            <input type="text" value="75"
                                                className="knob hide-value responsive angle-offset"
                                                data-angleOffset="0" data-thickness=".15"
                                                data-linecap="round" data-width="150"
                                                data-height="150" data-inputColor="#e1e1e1"
                                                data-readOnly="true" data-fgColor="#37BC9B"
                                                data-knob-icon="ft-trending-up"/>

                                            <ul className="list-inline clearfix mt-2 mb-0">
                                                <li className="border-right-grey border-right-lighten-2 pr-2">
                                                    <h2 className="grey darken-1 text-bold-400">75%</h2>
                                                    <span className="success">Completed</span>
                                                </li>
                                                <li className="pl-2">
                                                    <h2 className="grey darken-1 text-bold-400">25%</h2>
                                                    <span className="danger">Remaining</span>
                                                </li>
                                            </ul>
                                        </React.Fragment>
                                    }
                                />
                            </Col>
                            <Col className="col-xl-4" lg={6} md={12}>
                                <CardModule
                                    body={false}
                                    content={
                                        <div className="earning-chart position-relative">
                                            <div className="chart-title position-absolute mt-2 ml-2">
                                                <h1 className="font-large-2 grey darken-1 text-bold-200">{this.state.totalEarnt}</h1>
                                                <span className="text-muted">Total Earning</span>
                                            </div>
                                            <div className="chartjs height-400">
                                                <canvas id="earning-chart" className="height-400 block"/>
                                            </div>
                                            <div
                                                className="chart-stats position-absolute position-bottom-0 position-right-0 mb-2 mr-3">
                                                <a href="#" className="btn bg-info mr-1 white">Statistics <i
                                                    className="ft-bar-chart"/></a> <span
                                                    className="text-muted">for the <a
                                                        href="#">last year.</a></span>
                                            </div>
                                        </div>
                                    }
                                />
                            </Col>
                            <Col className="col-xl-4" lg={12} md={12}>
                                <CardModule
                                    body={true}
                                    content={
                                        <div>
                                            <div className="media">
                                                <div className="media-body text-left">
                                                    <h3 className="success">{this.state.leadsToday}</h3>
                                                    <span>Today's Leads</span>
                                                </div>
                                                <div className="media-right media-middle">
                                                    <i className="ft-award success font-large-2 float-right"/>
                                                </div>
                                            </div>

                                            <div className="progress mt-1 mb-0" style={{ height: '7px' }}>
                                                <div className="progress-bar bg-success" role="progressbar"
                                                    style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0"
                                                    aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    }
                                />

                                <CardModule
                                    body={true}
                                    content={
                                        <div>
                                            <div className="media">
                                                <div className="media-body text-left">
                                                    <h3 className="deep-orange">{this.state.newDeals}</h3>
                                                    <span>New Deal</span>
                                                </div>
                                                <div className="media-right media-middle">
                                                    <i className="ft-package deep-orange font-large-2 float-right"/>
                                                </div>
                                            </div>

                                            <div className="progress mt-1 mb-0" style={{ height: '7px' }}>
                                                <div className="progress-bar bg-deep-orange" role="progressbar"
                                                    style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0"
                                                    aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    }
                                />

                                <CardModule
                                    body={true}
                                    content={
                                        <div>
                                            <div className="media">
                                                <div className="media-body text-left">
                                                    <h3 className="info">{this.state.newCustomers}</h3>
                                                    <span>New Customers</span>
                                                </div>
                                                <div className="media-right media-middle">
                                                    <i className="ft-users info font-large-2 float-right"/>
                                                </div>
                                            </div>

                                            <div className="progress mt-1 mb-0" style={{ height: '7px' }}>
                                                <div className="progress-bar bg-success" role="progressbar"
                                                    style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0"
                                                    aria-valuemax="100"/>
                                            </div>
                                        </div>
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className="match-height">
                            <Col className="col-xl-6" lg={12}>
                                <CardModule
                                    body={true}
                                    header={
                                        <React.Fragment>
                                            <h4 className="card-title">Deals Funnel <span
                                                className="text-muted text-bold-400">This Month</span></h4>
                                            <a className="heading-elements-toggle"><i
                                                className="ft-more-horizontal font-medium-3"/></a>
                                            <div className="heading-elements">
                                                <ul className="list-inline mb-0">
                                                    <li><a data-action="reload"><i className="ft-rotate-cw"/></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    }
                                    content={
                                        <ReactEcharts option={this.getOption()}/>
                                    }
                                />

                            </Col>
                            <Col className="col-xl-6" lg={12}>
                                <CardModule
                                    cardHeight='410px'
                                    body={true}
                                    header={
                                        <React.Fragment>
                                            <h4 className="card-title">Deals <span className="text-muted text-bold-400">- Won 5</span>
                                            </h4>
                                            <a className="heading-elements-toggle"><i
                                                className="ft-more-horizontal font-medium-3"/></a>
                                            <div className="heading-elements">
                                                <ul className="list-inline mb-0">
                                                    <li><a data-action="reload"><i className="ft-rotate-cw"/></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    }
                                    content={
                                        <div style={{
                                            height: '300px',
                                            overflowY: 'auto'
                                        }} id="deals-list-scroll"
                                        className="card-body height-350 position-relative ps-container ps-theme-default"
                                        data-ps-id="6205b797-6d0d-611f-25fd-16195eadda29">
                                            {leads}
                                        </div>
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className="match-height">
                            <Col className="col-xl-8" lg={12}>
                                <StatsCard/>
                            </Col>

                            <Col className="col-xl-4" lg={12}>
                                <CardModule
                                    body={true}
                                    header={
                                        <React.Fragment>
                                            <h4 className="card-title">Sources <span
                                                className="text-muted text-bold-400">This Month</span></h4>
                                            <a className="heading-elements-toggle"><i
                                                className="ft-more-horizontal font-medium-3"/></a>
                                            <div className="heading-elements">
                                                <ul className="list-inline mb-0">
                                                    <li><a data-action="reload"><i className="ft-rotate-cw"/></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    }
                                    content={
                                        <ReactEcharts
                                            option={this.getPieOptions()}
                                            style={{ height: 300 }}
                                            onChartReady={this.onChartReady}
                                            onEvents={onEvents}
                                        />
                                    }
                                />
                            </Col>
                        </Row>

                    </TabPane>
                </TabContent>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="2" >
                        <MessageContainer />
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default Dashboard
