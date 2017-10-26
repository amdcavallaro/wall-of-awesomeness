import React, { Component } from 'react';

import Title from '../../components/title';
import Button from '../../components/button';
import Camera from '../../components/camera';

import './style.css';

class CameraPage extends Component {
  render() {
    return (
      <div className="camera">
        <div>
          <Title>Do you want to take a picture with your camera?</Title>

          <Button>Yes!</Button>
          <Button>No</Button>
        </div>

        <Camera enabled={false} />
      </div>
    );
  }
}

export default CameraPage;
