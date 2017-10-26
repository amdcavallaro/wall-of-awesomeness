import React, { Component } from 'react';

import { ButtonLink } from '../../components/button';

import './style.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1 className="home__title">GDG Wall of Awesomeness</h1>

        <ButtonLink to="/camera">Start</ButtonLink>
      </div>
    );
  }
}

export default Home;
