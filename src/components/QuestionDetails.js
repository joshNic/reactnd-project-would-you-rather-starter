import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { handleSaveQuestionAnswer } from "../actions/users";
import NotFound from "./NotFound";
import PollStats from "./PollStats";
import UnAnsweredQuestion from "./UnAnsweredQuestion";

class QuestionDetails extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <>
        {question === undefined ? (
          <NotFound />
        ) : (
          <>
            {this.props.type === "unanswered" ? (
              <UnAnsweredQuestion />
            ) : (
              <PollStats />
            )}
          </>
        )}
      </>
    );
  }
}
function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { question_id } = match.params;
  const question = questions[question_id];
  const user = users[authedUser];
  let type;
  if (question !== undefined) {
    if (Object.keys(user.answers).includes(question.id)) {
      type = "answered";
    } else {
      type = "unanswered";
    }
    return {
      type,
      question,
    };
  } else {
    return {
      question_id,
    };
  }
}

export default withRouter(
  connect(mapStateToProps, { handleSaveQuestionAnswer })(QuestionDetails)
);
