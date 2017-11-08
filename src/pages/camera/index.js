import React, { Component } from 'react';

import uuid from 'uuid';

import firebase from 'firebase';

import Title from '../../components/title';
import Button from '../../components/button';
import Camera from '../../components/camera';

import './style.css';

class CameraPage extends Component {
  WAITING = 0;
  CAMERA_ENABLED = 1;
  CAMERA_DISABLED = 2;
  PICTURE_TAKEN = 3;
  UPLOADING = 4;
  UPLOADED = 5;

  constructor() {
    super();

    this.state = {
      currentStep: this.WAITING,
      webcamEnabled: false,
      uploadProgress: 0,
    };
  }

  handlePicture = imageUrl => {
    this.setState({
      imageUrl,
      currentStep: this.PICTURE_TAKEN,
    });
  };

  handleReset = imageUrl => {
    this.setState({
      currentStep: this.WAITING,
      webcamEnabled: false,
      uploadProgress: 0,
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

  handleUploadPicture = () => {
    const storageRef = firebase.storage().ref();

    const id = uuid.v4();

    this.setState({
      currentStep: this.UPLOADING,
    });

    fetch(this.state.imageUrl)
      .then(b => b.blob())
      .then(blob => {
        storageRef
          .child(`user-images/${id}.jpg`)
          .put(blob)
          .on(
            'state_changed',
            snapshot => {
              const progress =
                snapshot.bytesTransferred / snapshot.totalBytes * 100;

              this.setState({
                uploadProgress: progress,
              });
            },
            error => {
              // Handle unsuccessful uploads
              alert(error);
            },
            () => {
              this.setState({
                currentStep: this.UPLOADED,
              });
            },
          );
      });
  };

  renderWaiting() {
    return [
      <Title key="title">
        Do you want to take a picture with your camera?
      </Title>,
      <div className="camera__actions" key="actions">
        <Button
          onClick={() =>
            this.setState({
              currentStep: this.CAMERA_ENABLED,
              webcamEnabled: true,
            })}
        >
          Yes!
        </Button>
        <Button
          onClick={() =>
            this.setState({
              currentStep: this.CAMERA_DISABLED,
              webcamEnabled: false,
            })}
        >
          No
        </Button>
      </div>,
    ];
  }

  renderCamera() {
    return <Camera enabled={true} onPicture={this.handlePicture} />;
  }

  renderInput() {
    return [
      <Title key="title">You can upload a picture here.</Title>,
      <input
        key="input"
        type="file"
        accept="image/*"
        onChange={this.handleFileChange}
      />,
    ];
  }

  renderPreview() {
    return [
      <Title key="title">
        Wow, amazing one! Do you want to upload it to the wall?
      </Title>,

      <div key="image">
        <img src={this.state.imageUrl} alt="This should be you" />
      </div>,

      <div key="actions" className="camera__actions">
        <Button onClick={this.handleUploadPicture}>Yes!</Button>
        <Button
          onClick={() =>
            this.setState({
              currentStep: this.state.webcamEnabled
                ? this.CAMERA_ENABLED
                : this.CAMERA_DISABLED,
            })}
        >
          Retry
        </Button>
      </div>,
    ];
  }

  renderUploading() {
    return <Title>Uploading {Math.floor(this.state.uploadProgress)}%</Title>;
  }

  renderUploaded() {
    return [
      <Title key="title">
        Perfect! The picture is going to be shown on the wall in a few moments!
        Do you want to take another picture?
      </Title>,

      <div key="actions" className="camera__actions">
        <Button onClick={this.handleReset}>Yes!</Button>
      </div>,
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
      case this.UPLOADING:
        return this.renderUploading();
      case this.UPLOADED:
        return this.renderUploaded();
    }
  }

  render() {
    return <div className="camera">{this.renderCurrentStep()}</div>;
  }
}

export default CameraPage;
