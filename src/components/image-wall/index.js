import React from 'react';

import Image from '../image';

import './style.css';

class ImageWall extends React.Component {
  render() {
    return (
      <div className="wall">
        {this.props.images.map(img => (
          <Image key={img.url} ratio={1} src={img.url} alt="" />
        ))}
      </div>
    );
  }
}

export default ImageWall;
