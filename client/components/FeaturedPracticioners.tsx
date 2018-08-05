import * as React from 'react';
import {Link} from 'react-router-dom';

const FeaturedPracticioners: React.SFC<{}> = () => (
  <div className="container mt-4">
    <div className="row">
      <div className="col-12">
        <h2 className="h2">Featured Practicioners</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <Link to="/practicioner">example</Link>
      </div>
    </div>
  </div>
);

export default FeaturedPracticioners;
