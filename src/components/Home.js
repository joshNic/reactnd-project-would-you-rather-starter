import React from "react";
import { Tabs } from 'antd';

import { connect } from 'react-redux';

import QuestionCard from './QuestionCard'


class Home extends React.Component {

    callback=(key)=>(
        console.log(key)
    )
  render() {
    const { TabPane } = Tabs;
    console.log(this.props)
    const { answeredQuestionId, unAnsweredQuestionId} = this.props;
    return (
        <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Unanswered Questions" key="1">
          {unAnsweredQuestionId.map(question_id=>(
            <QuestionCard
            key={question_id}
            question_id={question_id}
            type={'answered'}
            />
          ))}
          
        </TabPane>
        <TabPane tab="Answered Questions" key="2">
        {answeredQuestionId.map(question_id=>(
            <QuestionCard
            key={question_id}
            question_id={question_id}
            type={'unanswered'}
            />
          ))}
        </TabPane>
      </Tabs>
    );
  }
}

const getAnsweredAndUnansweredQuestions=(authedUser,questions)=>{
  const unAnsweredQuestions = Object.values(questions).filter((question) =>
  !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))

const answeredQuestions = Object.values(questions).filter((question) =>
  question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))

  const answeredQuestionId = Object.values(answeredQuestions).sort((a, b) => b.timestamp - a.timestamp).map((question) => question.id)
  const unAnsweredQuestionId= Object.values(unAnsweredQuestions)
  .sort((a, b) => b.timestamp - a.timestamp).map((question) => question.id)

  return {
    answeredQuestionId,
    unAnsweredQuestionId
  }

}

const mapStateToProps=({ authedUser, questions })=> getAnsweredAndUnansweredQuestions(authedUser,questions)

export default connect(mapStateToProps)(Home);
