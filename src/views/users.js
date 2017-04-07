import React from 'react';

const users = [
  {
    name: "Matthijs"
  },
  {
    name: "Pascal"
  }
];

const UserProfile = function(props) {
  const user = props.user;

  return (
    <div className="userprofile">
      <div className="name">{user.name}</div>
      <button onClick={() => props.onClick(user)}>Click me</button>
    </div>
  )
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    const selectedUserName = props.match.params.user;
    const selectedUser = users.filter((u) => u.name.toLowerCase() === selectedUserName)[0];

    this.state = {users: users, selectedUser: selectedUser};
  }

  selectUser(user) {
    this.props.history.push(`/users/${user.name.toLowerCase()}`)
  }

  render() {
    return (
      <div>
        <div className="user-list">
        {
          this.state.users.map((user, index) => {
            return <UserProfile user={user} key={index} onClick={this.selectUser.bind(this)}/>
          })
        }
        </div>

        <div className="user-selected">
          Selected:

          {this.state.selectedUser
            && <UserProfile user={this.state.selectedUser} />
            || <span>No user selected</span>
          }
        </div>
      </div>
    )
  }
}
