import React, { Component } from 'react';

import Title from '../../components/title';
import Button from '../../components/button';
import Camera from '../../components/camera';

import './style.css';

class CameraPage extends Component {
  WAITING = 0;
  CAMERA_ENABLED = 1;
  CAMERA_DISABLED = 2;
  PICTURE_TAKEN = 3;

  constructor() {
    super();

    this.state = {
      currentStep: this.WAITING,
    };
  }

  handlePicture = imageUrl => {
    this.setState({
      imageUrl,
      currentStep: this.PICTURE_TAKEN,
    });
  };

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
      <Button
        onClick={() => this.setState({ currentStep: this.CAMERA_DISABLED })}
        key="no"
      >
        No
      </Button>,
    ];
  }

  renderCamera() {
    return <Camera enabled={true} onPicture={this.handlePicture} />;
  }

  renderInput() {
    return <Title>This is something not implemented yet.</Title>;
  }

  renderPreview() {
    return [
      <Title key="title">
        Wow, amazing one! Do you want to upload it to the wall?
      </Title>,

      <img src={this.state.imageUrl} alt="This should be you" />,

      <Button key="yes" onClick={() => alert('todo')}>
        Yes!
      </Button>,
      <Button
        onClick={() => this.setState({ currentStep: this.CAMERA_ENABLED })}
        key="no"
      >
        No, let's try again
      </Button>,
    ];
  }

  renderCurrentStep() {
    switch (this.state.currentStep) {
      case this.WAITING:
      default:
        return this.renderWaiting();
      case this.CAMERA_ENABLED:
        return this.renderCamera();
      case this.CAMERA_DISABLED:
        return this.renderInput();
      case this.PICTURE_TAKEN:
        return this.renderPreview();
    }
  }

  render() {
    return <div className="camera">{this.renderCurrentStep()}</div>;
  }
}

export default CameraPage;
