import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Practicioner from './Practicioner';
import Category from '../domain/Category';

interface InitialState {
  categories?: Array<Category>;
  lead?: string;
  modality?: Category;
}

const categories = (window.__INITIAL_STATE__ as InitialState).categories || [];
const lead = (window.__INITIAL_STATE__ as InitialState).lead || '';
const modality = (window.__INITIAL_STATE__ as InitialState).modality || {name: ''};


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
    const white = history.location.pathname === '/';

    return (
      <React.Fragment>
        <div className="my-0 position-relative">
          <Navbar white={white} />
        </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => (
              <Homepage categories={categories} lead={lead} modality={modality.name} />
            )} />
            <Route exact path="/practicioner" component={Practicioner} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
