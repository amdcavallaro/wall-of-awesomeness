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
      webcamEnabled: false,
    };
  }

  handlePicture = imageUrl => {
    this.setState({
      imageUrl,
      currentStep: this.PICTURE_TAKEN,
    });
  };

  handleFileChange = e => {
    const fileList = Array.from(e.target.files).filter(f =>
      f.type.match(/^image\//),
    );

    const file = fileList[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        currentStep: this.PICTURE_TAKEN,
        imageUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  renderWaiting() {
    return [
      <Title key="title">
        Do you want to take a picture with your camera?
      </Title>,
      <Button
        key="yes"
        onClick={() =>
          this.setState({
            currentStep: this.CAMERA_ENABLED,
            webcamEnabled: true,
          })}
      >
        Yes!
      </Button>,
      <Button
        onClick={() =>
          this.setState({
            currentStep: this.CAMERA_DISABLED,
            webcamEnabled: false,
          })}
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
    return [
      <Title>You can upload a picture here.</Title>,
      <input type="file" accept="image/*" onChange={this.handleFileChange} />,
    ];
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
        onClick={() =>
          this.setState({
            currentStep: this.state.webcamEnabled
              ? this.CAMERA_ENABLED
              : this.CAMERA_DISABLED,
          })}
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
