import React from "react";
import { withRouter } from "react-router-dom";
import { handleSaveQuestion } from '../actions/questions';
import { connect } from 'react-redux';

class Question extends React.Component {
  state = {
    // validSubmit: false,
    // isLoading: false,
    option1: '',
    option2: ''
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { authedUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      // this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authedUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: ''
      });
      // this.setState({ validSubmit: true });
      this.props.history.push('/');
    });
  };
  render() {
    return (
      <div className="card text-white bg-primary mb-6" style={{width: '40em'}}>
        <div className="card-header">Create New Question</div>
        <div className="card-body">
          <h4 className="card-title">Complete the question</h4>
          <p className="card-text">
            Would you rather .....
          </p>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          <input type="text" className="form-control"  value={this.state.option1}
                onChange={this.handleChange} name="option1" placeholder="Enter option one text here"/>
          </div>
          <p className="card-text" style={{marginLeft:'15em'}}>
            OR
          </p>
          <div className="form-group"> 
          <input type="text" className="form-control" value={this.state.option2}
                onChange={this.handleChange} name="option2" placeholder="Enter option two text here"/>
          </div>
          <div className="form-group"> 
          <button type="submit" className="btn btn-success" style={{width:'34.4em'}}>Submit</button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(
  mapStateToProps,
  { handleSaveQuestion }
)(Question))
