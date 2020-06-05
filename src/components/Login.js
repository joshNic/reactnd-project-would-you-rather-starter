import React from "react";

import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';

class Login extends React.Component {
  state = {
    value: "",
  };
  handleChange = (event) => this.setState({ value: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const {setAuthedUser } = this.props;
    const authedUser = this.state.value;
    setAuthedUser(authedUser);

  };
  render() {
    const {users} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleSelect2">Select User To Login</label>
          <select
            className="form-control"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option>select user....</option>
            {users.map((user)=>
            <option key={user.id} value={user.id}>{user.name}</option>
            )}
          </select>
          <button type="submit" className="btn btn-success">Login</button>
        </div>
      </form>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}
export default connect(mapStateToProps,{ setAuthedUser })(Login);
