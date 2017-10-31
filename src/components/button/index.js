import React from 'react';

import { Link } from 'react-router-dom';

import './style.css';

class Button extends React.Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <button className="button" {...props}>
        {children}
      </button>
    );
  }
}

export class ButtonLink extends React.Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <Link className="button" {...props}>
        {children}
      </Link>
    );
  }
}

export default Button;
