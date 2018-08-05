import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import {History} from 'history';

class RouteHistory {
  private static history: History;

  public init() {
    // if window.location.href === 'about:blank' we're running in JSDom
    if (window.location.href === 'about:blank') {
      RouteHistory.history = createMemoryHistory();
    } else {
      RouteHistory.history = createBrowserHistory();
    }
  }

  get history(): History {
    if (RouteHistory.history == null) {
      throw new Error('History has not been initialised');
    }

    return RouteHistory.history;
  }
}

const routeHistory = new RouteHistory();

export default routeHistory;
