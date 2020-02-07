constructor(props)
{
    super(props)
    this.state = {
        users: [{
            firstName: '',
            lastName: ''
        }]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
}

addClick()
{
    this.setState(prevState => ({
        users: [...prevState.users, {
            firstName: '',
            lastName: ''
        }]
    }))
}

createUI()
{
    return this.state.users.map((el, i) => (
        <div key={i}>
            <input placeholder="First Name" name="firstName" value={el.firstName || ''}
                   onChange={this.handleChange.bind(this, i)}/>
            <input placeholder="Last Name" name="lastName" value={el.lastName || ''}
                   onChange={this.handleChange.bind(this, i)}/>
            <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
        </div>
    ))
}

handleChange(i, e)
{
    const {name, value} = e.target
    let users = [...this.state.users]
    users[i] = {
        ...users[i],
        [name]: value
    }
    this.setState({users})
}

removeClick(i)
{
    let users = [...this.state.users]
    users.splice(i, 1)
    this.setState({users})
}

handleSubmit(event)
{
    alert('A name was submitted: ' + JSON.stringify(this.state.users))
    event.preventDefault()
}

render()
{
    return (
        <form onSubmit={this.handleSubmit}>
            {this.createUI()}
            <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
            <input type="submit" value="Submit"/>
        </form>
    )
}
}
