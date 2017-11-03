import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

import FirebaseProvider from './containers/firebase';

import 'reset-css/reset.css';

ReactDOM.render(
  <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
