import React, { Component } from 'react'
import {
    Input,
    FormGroup,
    Label
} from 'reactstrap'
import FormBuilder from './FormBuilder'

class EmailFields extends Component {
    constructor (props) {
        super(props)

        this.state = {
            id: localStorage.getItem('account_id'),
            loaded: false,
            activeTab: '1',
            company_logo: null,
            preview: []
        }
    }

    getFormFields (key = null) {
        const settings = this.props.settings
        const formFields = {
            email_template_invoice: {
                name: 'Invoice',
                is_remider: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_invoice',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_invoice,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_invoice',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_invoice,
                        group: 1
                    }
                ]
            },

            email_template_payment: {
                name: 'Payment',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_payment',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_payment,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_payment',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_payment,
                        group: 1
                    }
                ]
            },
            email_template_payment_partial: {
                name: 'Partal Payment',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_payment_partial',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_payment_partial,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_payment_partial',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_payment_partial,
                        group: 1
                    }
                ]
            },
            email_template_quote: {
                name: 'Quote',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_quote',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_quote,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_quote',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_quote,
                        group: 1
                    }
                ]
            },
            email_template_credit: {
                name: 'Credit',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_credit',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_credit,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_credit',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_credit,
                        group: 1
                    }
                ]
            },
            email_template_lead: {
                name: 'Lead',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_lead',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_lead,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_lead',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_lead,
                        group: 1
                    }
                ]
            },
            email_template_order: {
                name: 'Order',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_order',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_order,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_order',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_order,
                        group: 1
                    }
                ]
            },
            email_template_reminder_endless: {
                name: 'Endless',
                is_reminder: false,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_reminder_endless',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_reminder_endless,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_reminder_endless',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_reminder_endless,
                        group: 1
                    },
                    {
                        id: 'endless_reminder_frequency_id',
                        name: 'endless_reminder_frequency_id',
                        label: 'Schedule',
                        type: 'select',
                        options: [
                            {
                                value: '1',
                                text: 'Daily'
                            },
                            {
                                value: '2',
                                text: 'Weekly'
                            },
                            {
                                value: '3',
                                text: 'Every 2 weeks'
                            },
                            {
                                value: '4',
                                text: 'Every 4 weeks'
                            },
                            {
                                value: '5',
                                text: 'Monthly'
                            },
                            {
                                value: '6',
                                text: 'Every 2 months'
                            },
                            {
                                value: '7',
                                text: 'Every 3 months'
                            },
                            {
                                value: '8',
                                text: 'Every 4 months'
                            },
                            {
                                value: '9',
                                text: 'Every 6 months'
                            },
                            {
                                value: '10',
                                text: 'Annually'
                            },
                            {
                                value: '11',
                                text: 'Every 2 years'
                            },
                            {
                                value: '12',
                                text: 'Every 3 years'
                            }
                        ],
                        value: settings.endless_reminder_frequency_id
                    },
                    {
                        id: 'late_fee_endless_amount',
                        name: 'late_fee_endless_amount',
                        label: 'Fee Amount',
                        type: 'text',
                        placeholder: 'Fee Amount',
                        value: settings.late_fee_endless_amount,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'late_fee_endless_percent',
                        label: 'Fee Percent',
                        type: 'text',
                        placeholder: 'Fee Percent',
                        value: settings.late_fee_endless_percent,
                        group: 1
                    }
                ]
            },
            email_template_custom1: {
                name: 'Custom 1',
                is_reminder: false,
                is_custom: true,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_custom1',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_custom1,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_custom1',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_custom1,
                        group: 1
                    }
                ]
            },
            email_template_custom2: {
                name: 'Custom 2',
                is_reminder: false,
                is_custom: true,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_custom2',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_custom2,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_custom2',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_custom2,
                        group: 1
                    }
                ]
            },
            email_template_custom3: {
                name: 'Custom 3',
                is_reminder: false,
                is_custom: true,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_custom3',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_custom3,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_custom3',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_custom3,
                        group: 1
                    }
                ]
            },
            email_template_reminder1: {
                name: 'Reminder 1',
                is_reminder: true,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_reminder1',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Name',
                        value: settings.email_subject_reminder1,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_reminder1',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_reminder1,
                        group: 1
                    },
                    {
                        id: 'num_days_reminder1',
                        name: 'num_days_reminder1',
                        label: 'Days',
                        type: 'text',
                        placeholder: 'Days',
                        value: settings.num_days_reminder1,
                        group: 1
                    },
                    {
                        id: 'schedule_reminder1',
                        name: 'schedule_reminder1',
                        label: 'Schedule',
                        type: 'select',
                        options: [
                            {
                                value: '1',
                                text: 'After Invoice Date'
                            },
                            {
                                value: '2',
                                text: 'Before Due Date'
                            },
                            {
                                value: '3',
                                text: 'After Due Date'
                            }
                        ],
                        value: settings.schedule_reminder1
                    },
                    {
                        id: 'late_fee_amount1',
                        name: 'late_fee_amount1',
                        label: 'Late Fee Amount',
                        type: 'text',
                        placeholder: 'Late Fee Amount',
                        value: settings.late_fee_amount1,
                        group: 1
                    },
                    {
                        id: 'enable_reminder1',
                        name: 'enable_reminder1',
                        label: 'Send Email',
                        type: 'switch',
                        placeholder: 'Send Email',
                        value: settings.enable_reminder1,
                        group: 1
                    }
                ]
            },
            email_template_reminder2: {
                name: 'Reminder 2',
                is_reminder: true,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_reminder2',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_reminder2,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_reminder2',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Body',
                        value: settings.email_template_reminder2,
                        group: 1
                    },
                    {
                        id: 'num_days_reminder2',
                        name: 'num_days_reminder2',
                        label: 'Days',
                        type: 'text',
                        placeholder: 'Days',
                        value: settings.num_days_reminder2,
                        group: 1
                    },
                    {
                        id: 'schedule_reminder2',
                        name: 'schedule_reminder2',
                        label: 'Schedule',
                        type: 'select',
                        options: [
                            {
                                value: '1',
                                text: 'After Invoice Date'
                            },
                            {
                                value: '2',
                                text: 'Before Due Date'
                            },
                            {
                                value: '3',
                                text: 'After Due Date'
                            }
                        ],
                        value: settings.schedule_reminder2
                    },
                    {
                        id: 'late_fee_amount2',
                        name: 'late_fee_amount2',
                        label: 'Late Fee Amount',
                        type: 'text',
                        placeholder: 'Late Fee Amount',
                        value: settings.late_fee_amount2,
                        group: 1
                    },
                    {
                        id: 'enable_reminder2',
                        name: 'enable_reminder2',
                        label: 'Send Email',
                        type: 'switch',
                        placeholder: 'Send Email',
                        value: settings.enable_reminder2,
                        group: 1
                    }
                ]
            },
            email_template_reminder3: {
                name: 'Reminder 3',
                is_reminder: true,
                is_custom: false,
                fields: [
                    {
                        id: 'subject',
                        name: 'email_subject_reminder3',
                        label: 'Subject',
                        type: 'text',
                        placeholder: 'Subject',
                        value: settings.email_subject_reminder3,
                        group: 1
                    },
                    {
                        id: 'body',
                        name: 'email_template_reminder3',
                        label: 'Body',
                        type: 'textarea',
                        inputClass: 'textarea-lg',
                        placeholder: 'Website',
                        value: settings.email_template_reminder3,
                        group: 1
                    },
                    {
                        id: 'num_days_reminder3',
                        name: 'num_days_reminder3',
                        label: 'Days',
                        type: 'text',
                        placeholder: 'Days',
                        value: settings.num_days_reminder3,
                        group: 1
                    },
                    {
                        id: 'schedule_reminder3',
                        name: 'schedule_reminder3',
                        label: 'Schedule',
                        type: 'select',
                        options: [
                            {
                                value: '1',
                                text: 'After Invoice Date'
                            },
                            {
                                value: '2',
                                text: 'Before Due Date'
                            },
                            {
                                value: '3',
                                text: 'After Due Date'
                            }
                        ],
                        value: settings.schedule_reminder3
                    },
                    {
                        id: 'late_fee_amount3',
                        name: 'late_fee_amount3',
                        label: 'Late Fee Amount',
                        type: 'text',
                        placeholder: 'Late Fee Amount',
                        value: settings.late_fee_amount3,
                        group: 1
                    },
                    {
                        id: 'enable_reminder3',
                        name: 'enable_reminder3',
                        label: 'Send Email',
                        type: 'switch',
                        placeholder: 'Send Email',
                        value: settings.enable_reminder3,
                        group: 1
                    }
                ]
            }
        }

        return key !== null ? formFields[key] : formFields
    }

    _buildTemplate () {
        const allFields = this.getFormFields(this.props.template_type)
        const sectionFields = allFields.fields
        const test = []
        test.push(sectionFields)
        return test
    }

    render () {
        const fields = this.getFormFields()

        const test2 = Object.keys(fields).filter(key2 => {
            if (fields[key2].is_custom || fields[key2].is_reminder || key2 === this.props.template_type) {
                return fields[key2]
            }
        })

        const toMap = this.props.custom_only && this.props.custom_only === true ? test2 : Object.keys(fields)

        const options = toMap.map(key => {
            return <option data-name={fields[key].name} key={key} value={key}>{fields[key].name}</option>
        })

        const test = this._buildTemplate()
        const form = this.props.return_form === true ? <FormBuilder
            handleChange={this.props.handleSettingsChange}
            formFieldsRows={test}
            submitBtnTitle="Calculate"
        /> : null

        return <React.Fragment>
            <FormGroup>
                <Label>Template</Label>
                <Input type="select"
                    name="template_type"
                    onChange={this.props.handleChange}
                >
                    {options}
                </Input>
            </FormGroup>

            {form}

        </React.Fragment>
    }
}

export default EmailFields
