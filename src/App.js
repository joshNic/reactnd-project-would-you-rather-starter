import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page from "./components/Page";
import Question from "./components/Question";
import LeaderBoard from "./components/LeaderBoard";
import Login from "./components/Login";
import AnswerPoll from './components/AnswerPoll'
import PollResult from './components/PollResult'
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";
import NotFound from './components/NotFound'

class App extends React.Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        {authedUser == null ? (
          <div className="jumbotron" style={{ backgroundColor: "white" }}>
            <Route render={() => <Login />} />
          </div>
        ) : (
          <Switch>
            {/* <Route exact path="/login" component={Login} /> */}
            <Page>
              
              {/* <Route component={NotFound} /> */}
              <Route exact path="/" component={Home} />
              <Route  exact path="/add" component={Question} />
              <Route exact path="/leaderboard" component={LeaderBoard} />
              <Route exact path="/questions/:question_id" component={AnswerPoll} />
              {/* <Route exact path="/result/:question_id" component={PollResult} /> */}
              <Route exact path="/not_found" component={NotFound} />
            </Page>
          </Switch>
        )}
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
