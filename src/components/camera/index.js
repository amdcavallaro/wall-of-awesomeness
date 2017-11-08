import React from 'react';

import { bool, func } from 'prop-types';

import Button from '../button';

import './style.css';

/**
 * A component that shows a video feed from the
 * user's webcam if they give permissions.
 */
class Camera extends React.Component {
  static propTypes = {
    enabled: bool,
    onError: func,
    onPicture: func,
  };

  static defaultProps = {
    enabled: true,
    onError: () => {},
    onPicture: () => {},
  };

  constructor() {
    super();

    this.state = {
      cameraError: false,
      hasCamera: false,
    };
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.getCamera();
    }

    // allow inline video on iOS
    this.player.setAttribute('playsinline', true);
    this.ctx = this.canvas.getContext('2d');
  }

  componentWillUnmount() {
    if (this.player.srcObject) {
      // stop the video stream
      this.player.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  getCamera() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(stream => {
        this.setState({ hasCamera: true });
        this.player.srcObject = stream;
      })
      .catch(this.props.onError);
  }

  takePicture = () => {
    this.canvas.width = this.player.videoWidth;
    this.canvas.height = this.player.videoHeight;

    this.ctx.drawImage(
      this.player,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );

    this.player.srcObject.getVideoTracks().forEach(track => track.stop());

    this.props.onPicture(this.canvas.toDataURL());
  };

  render() {
    return (
      <div className="camera-feed">
        <video
          autoPlay
          ref={c => {
            this.player = c;
          }}
        />

        <Button onClick={this.takePicture}>Take selfie</Button>

        <canvas
          className="camera-feed__canvas"
          ref={c => {
            this.canvas = c;
          }}
        />
      </div>
    );
  }
}

export default Camera;
