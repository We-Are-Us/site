import * as React from 'react';
import * as ReactDOM from 'react-dom';
import routeHistory from './routeHistory';
import App from './components/App';

const rootEl = document.getElementById('react-root');

routeHistory.init();

ReactDOM.render(
  <App history={routeHistory.history} />,
  rootEl
);
