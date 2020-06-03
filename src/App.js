import React from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page from "./components/Page";
import Question from "./components/Question";
import LeaderBoard from "./components/LeaderBoard";
import Login from "./components/Login";

import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";

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
            <Page>
              <Route exact path="/" component={Home} />
              <Route  exact path="/add" component={Question} />
              <Route exact path="/leaderboard" component={LeaderBoard} />
              {/* <Route exact path="/not_found" component={NotFound} /> */}
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
