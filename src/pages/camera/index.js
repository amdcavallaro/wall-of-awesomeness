import React, { Component } from 'react';

import Title from '../../components/title';
import Button from '../../components/button';
import Camera from '../../components/camera';

import './style.css';

class CameraPage extends Component {
  WAITING = 0;
  CAMERA_ENABLED = 1;

  constructor() {
    super();

    this.state = {
      currentStep: this.WAITING,
    };
  }

  renderWaiting() {
    return [
      <Title key="title">
        Do you want to take a picture with your camera?
      </Title>,
      <Button
        key="yes"
        onClick={() => this.setState({ currentStep: this.CAMERA_ENABLED })}
      >
        Yes!
      </Button>,
      <Button key="no">No</Button>,
    ];
  }

  renderCamera() {
    return <Camera enabled={true} />;
  }

  renderCurrentStep() {
    switch (this.state.currentStep) {
      case this.WAITING:
      default:
        return this.renderWaiting();
      case this.CAMERA_ENABLED:
        return this.renderCamera();
    }
  }

  render() {
    return <div className="camera">{this.renderCurrentStep()}</div>;
  }
}

export default CameraPage;
