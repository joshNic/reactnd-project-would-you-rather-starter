import React from "react";

import { connect } from "react-redux";
import {Link} from 'react-router-dom'

class Card extends React.Component {
  render() {
    const { author, question,type } = this.props;
    return (
      <div
        className="card text-white bg-primary mb-3"
        style={{ width: "30em" }}
      >
        <div className="card-header">{author.name} asks</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={author.avatarURL}
                style={{ width: "60px", height: "60px" }}
                alt='user avatar'
              />
            </div>
            <div className="col-md-8">
              <h4 className="card-title">Would You Rather</h4>
              <p className="card-text">
                ..
                {question.optionOne.text.substring(
                  0,
                  question.optionOne.text.indexOf(" ")
                )}
              </p>
              <Link to={`/questions/${question.id}`}>
              <button type="button" className="btn btn-success">{type==='answered'?"View Poll":"View Result"}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(
  { users, questions },
  { question_id }
) {
 
  const question = questions[question_id];
  const author = users[question.author];

  return {
    author,
    question,
  };
}
export default connect(mapStateToProps)(Card);
