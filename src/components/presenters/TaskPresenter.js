import React from 'react'
import ViewTask from '../forms/ViewTask'

export default function TaskPresenter (props) {
    const { field, entity } = props

    switch (field) {
        case 'title':
            return <td data-label="Title"><ViewTask custom_fields={props.custom_fields}
                project_id={props.task.project_id}
                users={props.users}
                customers={props.customers}
                task_type={1}
                allTasks={props.tasks}
                action={props.action}
                task={props.task} /></td>
        default:
            return <td onClick={() => props.toggleViewedEntity(entity, entity.title)} key={field}
                data-label={field}>{entity[field]}</td>
    }
}
