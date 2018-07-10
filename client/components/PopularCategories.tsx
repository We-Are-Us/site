import * as React from 'react';

const PopularCategories: React.SFC<{}> = () => (
  <div className="container mt-4">
    <div className="row">
      <div className="col-12">
        <h2 className="h2">Featured Practicioners</h2>
      </div>
    </div>
    <div className="row">
      {['Yoga', 'Naturopathy', 'Homeopathy', 'Acupuncture'].map(modality => (
        <div key={modality.toLowerCase()} className="col-12 col-sm-6 col-md-3 py-2">
          <a href="/category/{modality.toLowerCase()}" className="btn btn-secondary btn-block">
            {modality}
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default PopularCategories;
