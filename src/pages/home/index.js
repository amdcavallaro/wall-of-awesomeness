import React, { Component } from 'react';

import './style.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1 className="home__title">GDG Wall of Awesomeness</h1>

        <a className="home__start">Start</a>
      </div>
    );
  }
}

export default Home;
