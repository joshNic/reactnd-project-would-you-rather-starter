import React from "react";
import { Tabs } from 'antd';

import { connect } from 'react-redux';

import Card from './Card'


class Home extends React.Component {

    callback=(key)=>(
        console.log(key)
    )
  render() {
    const { TabPane } = Tabs;
    const { userQuestionData } = this.props;
    return (
        <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Unanswered Questions" key="1">
          {userQuestionData.answered.map(question=>(
            <Card
            key={question.id}
            question_id={question.id}
            type={'answered'}
            />
          ))}
          
        </TabPane>
        <TabPane tab="Answered Questions" key="2">
        {userQuestionData.unanswered.map(question=>(
            <Card
            key={question.id}
            question_id={question.id}
            type={'unanswered'}
            />
          ))}
        </TabPane>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers);
  const answered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}
export default connect(mapStateToProps)(Home);
