import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MembershipDetailsForm, {
  MembershipDetailsFormProps
} from './components/MembershipDetailsForm';
import ErrorBoundary from './components/ErrorBoundary';
// import routeHistory from './routeHistory';
// import App from './components/App';

const rootEl = document.getElementById('react-root');

/*
routeHistory.init();

ReactDOM.render(
  <App history={routeHistory.history} />,
  rootEl
);
*/
const props: MembershipDetailsFormProps = {
  membership: 'standard',
  total: 0,
  recurringTotal: 0,
  renewal: new Date(2019, 0, 1)
};

ReactDOM.render(
  <ErrorBoundary>
    <MembershipDetailsForm {...props} />
  </ErrorBoundary>,
  rootEl
);
