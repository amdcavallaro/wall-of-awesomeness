import React, { Component } from 'react';

import 'firebase/firestore';

import { getFirebase } from '../../utils/firebase';

import ImageWall from '../../components/image-wall';

import './style.css';

class Wall extends Component {
  state = {
    images: [],
  };
  componentDidMount() {
    const db = getFirebase().firestore();

    db.collection('images').onSnapshot(querySnapshot => {
      const images = querySnapshot.docs.map(doc => doc.data());

      this.setState({ images });
    });
  }

  render() {
    return <ImageWall images={this.state.images} />;
  }
}

export default Wall;
