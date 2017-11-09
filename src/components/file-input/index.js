import React from 'react';

import './style.css';

export class FileInput extends React.Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <div class="file-input">
        <button class="btn-file-input">{children}</button>
        <input type="file" name="file" {...props} />
      </div>
    );
  }
}

export default FileInput;
