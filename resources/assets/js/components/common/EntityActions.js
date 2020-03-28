export default class EntityActions {
    constructor (handler) {
        this.entities = {}
        this.entities.mark_sent = <DropdownItem onClick={() => handler('mark_sent')}>Mark Sent</DropdownItem>
        this.entities.mark_paid = <DropdownItem color="primary" onClick={() => handler('mark_paid')}>Mark Paid</DropdownItem>
        this.entities.send_email = <DropdownItem className="primary" onClick={() => handler('email')}>Send
            Email</DropdownItem>
        this.entities.download = <DropdownItem className="primary"
            onClick={() => handler('download')}>Download</DropdownItem>
        this.entities.delete = <DropdownItem className="primary"
                onClick={() => handler('delete')}>Delete</DropdownItem> 
        this.entities.archive = <DropdownItem className="primary"
                onClick={() => handler('archive')}>Archive</DropdownItem>
        this.entities.clone_to_quote = <DropdownItem className="primary" onClick={() => handler('clone_to_quote')}>Clone To
                Quote</DropdownItem>
        this.entities.clone_to_invoice =
            <DropdownItem className="primary"
                onClick={() => handler('clone_to_invoice')}>Clone</DropdownItem>
    }

    getEntity (name) {
        return this.entities[name]
    }
}
