import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { registerServiceWorker } from './utilities/serviceWorker';

import store from './redux/store';

import './styles/index.css';
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

registerServiceWorker();
