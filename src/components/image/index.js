import React from 'react';

import { string, number } from 'prop-types';

import './style.css';

class Image extends React.Component {
  static propTypes = {
    src: string.isRequired,
    ratio: number.isRequired,
  };

  state = {
    loaded: false,
  };

  componentDidMount() {
    var self = this;
    var img = document.createElement('img');

    img.onload = function() {
      self.setState({ loaded: true });
    };

    img.src = this.props.src;
  }

  render() {
    let additionalClassNames = '';

    if (this.state.loaded) {
      additionalClassNames = 'image__wrapper--loaded';
    }

    return (
      <div className={`image__wrapper ${additionalClassNames}`}>
        <div
          style={{
            paddingBottom: `${Math.round(100 / Number(this.props.ratio))}%`,
          }}
        />
        <div
          className="image__image"
          style={{
            backgroundImage: `url(${this.props.src})`,
          }}
        />
      </div>
    );
  }
}

export default Image;
