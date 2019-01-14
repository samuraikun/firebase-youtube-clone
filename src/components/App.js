import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import VideoUpload from './VideoUpload';
import VideosContainer from '../container/videosContainer'; 

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={VideosContainer} />
            <Route path="/upload" component={VideoUpload} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;