import React from 'react'
import Avatar from '../common/Avatar'

export default function CustomerPresenter (props) {
    const { field, entity } = props

    switch (field) {
        case 'id':
            return <td data-label="Name"><Avatar name={entity.name}/></td>

        default:
            return <td onClick={() => props.toggleViewedEntity(entity, entity.name)} key={field}
                data-label={field}>{entity[field]}</td>
    }
}
