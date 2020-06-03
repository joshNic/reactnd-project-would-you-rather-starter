import React from "react";

import {Link} from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  state = {
    current: "mail",
  };
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthedUser(null);
  };
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };
  render() {
    const { authedUser, users } = this.props;
    return (
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to='/add'>New Question</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to='/leaderboard'>Leader Board</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <img src={users[authedUser].avatarURL} style={{width:"30px",height:"30px"}} alt='user avatar'/> 
            </li>
            <li className="nav-item">
                <p className="nav-link">Hello {users[authedUser].name}</p>
            </li>
            <li className="nav-item" onClick={this.handleLogout}>
            <p className="nav-link">Log Out</p>
            </li>
            </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Navbar);
