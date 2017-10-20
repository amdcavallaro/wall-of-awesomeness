import React, { Component } from 'react';

import Camera from '../../components/camera';

import './style.css';

class CameraPage extends Component {
  render() {
    return (
      <div className="camera">
        <Camera enabled={true} />
      </div>
    );
  }
}

export default CameraPage;
