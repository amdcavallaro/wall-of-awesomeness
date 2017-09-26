import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import 'reset-css/reset.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
