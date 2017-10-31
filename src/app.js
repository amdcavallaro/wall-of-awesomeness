import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home';
import Wall from './pages/wall';
import Camera from './pages/camera';

import './app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/wall" component={Wall} />
          <Route exact path="/camera" component={Camera} />
        </div>
      </Router>
    );
  }
}

export default App;
