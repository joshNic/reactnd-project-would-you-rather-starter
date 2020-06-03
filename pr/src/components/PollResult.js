import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotFound from './NotFound'

class PollResult extends React.Component {
    handleOnClick = () => {
        this.props.history.push('/');
      };
  render() {
    if(this.props.question===undefined){
      return(<NotFound/>)
    }else{
      const { question, users, authedUser } = this.props;
    const user = users[authedUser];
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    const optionOnePercentage = ((optionOneVotes / votesTotal) * 100).toFixed(
      2
    );
    const optionTwoPercentage = ((optionTwoVotes / votesTotal) * 100).toFixed(
      2
    );
    return (
    
      
      <div
      className="card text-white bg-primary mb-3"
      style={{ width: "30em" }}
    >
      <div className="card-header">{user.name} asks</div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img
              src={user.avatarURL}
              style={{ width: "60px", height: "60px" }}
              alt="user avatar"
            />
          </div>
          <div className="col-md-8">
            <h4 className="card-title">Would You Rather....</h4>

            <p className="card-text">{question.optionOne.text}</p>
            {userVote==='optionOne'&&<span className="badge badge-success">Your Vote</span>}
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: optionOnePercentage.toString() + "%" }}
                aria-valuenow={optionOnePercentage.toString()}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p>
              {optionOneVotes} out of {votesTotal} votes
            </p>
            <p className="card-text">{question.optionTwo.text}</p>
            {userVote==='optionTwo'&&<span className="badge badge-success">Your Vote</span>}
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: optionTwoPercentage.toString() + "%" }}
                aria-valuenow={optionTwoPercentage.toString()}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            <p>
              {optionTwoVotes} out of {votesTotal} votes
            </p>
            <button type="button" className="btn btn-success" onClick={this.handleOnClick}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
}
function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { question_id } = match.params;
  const question = questions[question_id];

  return {
    authedUser,
    question,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));
