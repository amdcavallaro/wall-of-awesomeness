import React from 'react';
import PropTypes from 'prop-types';

import { getFirebase } from '../../utils/firebase';

export default class FirebaseProvider extends React.Component {
  static childContextTypes = {
    firebase: PropTypes.object,
  };

  getChildContext() {
    return { firebase: this.firebase };
  }

  componentDidMount() {
    this.firebase = getFirebase();
  }

  render() {
    return this.props.children;
  }
}
