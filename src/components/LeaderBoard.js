import React from 'react'

import { connect } from 'react-redux';

class LeaderBoard extends React.Component{
    render(){
        const { leaderboardData } = this.props;
        return(
            <>
            {leaderboardData.map((user) => (
                <div
                key={user.id}
                className="card text-white bg-primary mb-3"
                style={{ width: "30em" }}
              >
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
                      <h4 className="card-title">{user.name}</h4>
        
                      <p className="card-text">Answered Questions: {user.answerCount}</p>                      
                      
                      <p className="card-text">Created Questions: {user.questionCount}</p>
                      <p className="card-text">Score: {user.questionCount + user.answerCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </>
            
        )
    }
}

function mapStateToProps({ users }) {
    const leaderboardData = Object.values(users)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => b.total - a.total)
    return {
      leaderboardData
    };
  }

export default connect(mapStateToProps)(LeaderBoard)