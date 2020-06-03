import React from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

import { handleSaveQuestionAnswer } from '../actions/users';
import NotFound from './NotFound'
import PollResult from './PollResult'

class AnswerPoll extends React.Component {
  state = {
    value: "optionOne",
  };
  handleChange = (event) => {
   
    this.setState({ value: event.target.value });
  };
  handleSubmit =async(event) => {
    event.preventDefault();
    const{authedUser, question,handleSaveQuestionAnswer} = this.props
    await handleSaveQuestionAnswer(authedUser, question.id, this.state.value);
    this.props.history.push(`/questions/${question.id}`);
  };
  render() {
    console.log(this.props,"this is propss")
      const{question,users} = this.props
    return (
      <>
      {question===undefined?<NotFound/>:(
        <>
        {this.props.ty==="unanswered"?(
          <div
          className="card text-white bg-primary mb-3"
          style={{ width: "30em" }}
        >
          <div className="card-header">{users[question.author].name} asks</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img src={users[question.author].avatarURL} style={{ width: "60px", height: "60px" }} alt='user avatar' />
              </div>
              <div className="col-md-8">
                <h4 className="card-title">Would You Rather....</h4>
                <form className="form-group" onSubmit={this.handleSubmit}>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        name="optionsRadios"
                        className="form-check-input"
                        value="optionOne"
                        checked={this.state.value === "optionOne"}
                        onChange={this.handleChange}
                      />
                      {question.optionOne.text}
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        name="optionsRadios"
                        className="form-check-input"
                        value="optionTwo"
                        checked={this.state.value === "optionTwo"}
                        onChange={this.handleChange}
                      />
                      {question.optionTwo.text}
                    </label>
                  </div>
                    <button className="btn btn-success mt-2" type="submit">
                      Submit
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        ):(
          <PollResult/>
        )
      }
        
      </>
      )}
      
      </>
    );
  }
}
function mapStateToProps({ authedUser,questions,users }, { match }) {
    const { question_id } = match.params;
    const question = questions[question_id];
    const user = users[authedUser];
    let ty

    if(Object.keys(user.answers).includes(question.id)){
      ty="answered"
    }else{
      ty="unanswered"
    }
  
    return {
      authedUser,
      question,
      users,
      ty
    };
  }
  


export default withRouter(connect(mapStateToProps,{ handleSaveQuestionAnswer })(AnswerPoll));
