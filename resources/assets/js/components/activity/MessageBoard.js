import * as React from 'react'
import MessageCard from './MessageCard'

class MessageBoard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            messageText: ''
        }
    }

    render () {
        const { messages, activeUser, deleteMessage, submitMessage, setMode, setActiveMessage, users } = this.props

        return (

            messages.length ? (
                messages.map((message) => (
                    !message.parent_id ? (
                        <MessageCard
                            setMode={setMode}
                            currentMessage={message}
                            messages={messages}
                            submitMessage={submitMessage}
                            deleteMessage={deleteMessage}
                            activeUser={activeUser}
                            users={users}
                            setActiveMessage={setActiveMessage}
                        />
                    ) : null
                ))
            ) : ''

        )
    }
}

export default MessageBoard
