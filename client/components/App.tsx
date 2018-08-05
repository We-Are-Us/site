import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Practicioner from './Practicioner';

interface Props {
  history: any;
}

class App extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const {history} = this.props;
    const className = history.location === '' ? 'text-white' : 'text-dark';

    return (
      <React.Fragment>
        <div className="my-0 position-relative">
          <Navbar className={className} />
        </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/practicioner" component={Practicioner} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
