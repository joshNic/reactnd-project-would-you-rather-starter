import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotFound from "./NotFound";

class PollStats extends React.Component {
  handleOnClick = () => {
    this.props.history.push("/");
  };
  render() {
    console.log(this.props, "this is propssss");
    if (this.props.question === undefined) {
      return <NotFound />;
    } else {
      const { resultData, user, question } = this.props;
      const {
        optionOneVotes,
        optionTwoVotes,
        optionOnePercentage,
        optionTwoPercentage,
        total,
      } = resultData;

      const userVote = user.answers[question.id];
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
                {userVote === "optionOne" && (
                  <span className="badge badge-success">Your Vote</span>
                )}
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
                  {optionOneVotes} out of {total} votes
                </p>
                <p className="card-text">{question.optionTwo.text}</p>
                {userVote === "optionTwo" && (
                  <span className="badge badge-success">Your Vote</span>
                )}
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
                  {optionTwoVotes} out of {total} votes
                </p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleOnClick}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const getPercentile = (optionOneVotes, optionTwoVotes) => {
  const total = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = ((optionOneVotes / total) * 100).toFixed(2);
  const optionTwoPercentage = ((optionTwoVotes / total) * 100).toFixed(2);
  return {
    optionOneVotes,
    optionTwoVotes,
    optionOnePercentage,
    optionTwoPercentage,
    total,
  };
};

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { question_id } = match.params;
  const question = questions[question_id];
  const user = users[authedUser];
  if (question !== undefined) {
    const resultData = getPercentile(
      question.optionOne.votes.length,
      question.optionTwo.votes.length
    );
    return {
      authedUser,
      question,
      user,
      resultData,
    };
  } else {
    return {
      question_id,
    };
  }
}

export default withRouter(connect(mapStateToProps)(PollStats));
