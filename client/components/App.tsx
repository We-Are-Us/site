import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';

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

    return (
      <React.Fragment>
        <div className="my-0">
          <Navbar />
        </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Homepage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
