import React from 'react';

import './style.css';

class Image extends React.Component {
  render() {
    return <img src={this.props.src} alt={this.props.alt} />;
  }
}

export default Image;
