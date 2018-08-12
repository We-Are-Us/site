import * as React from 'react';

const Practicioner: React.SFC<{}> = () => (
  <React.Fragment>
    <div className="container-fluid px-0">
      <div className="pt-5" />
      <img
        className="img-fluid w-100 mt-3 border-top-1"
        {/* tslint:disable-next-line */}
        src="https://images.ctfassets.net/xu4zh386cjva/2yqY5dMqvWAMCkYisSacKs/5b3bb62383444cb60caf16ec4812f6d3/placeholder_3.png"
      />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-8 pt-3">
          <div className="text-muted">
            <span className="pr-3">Yoga</span>
            <span className="pr-3">Modality 1</span>
            <span>Modality 2</span>
          </div>
          <h1 className="h1">Rachel Barclay</h1>
          <div className="text-muted">Mount Eden, Auckland</div>
          <div className="pt-1">
            <img src="/public/assets/Star.svg" />
            <img src="/public/assets/Star.svg" />
            <img src="/public/assets/Star.svg" />
            <img src="/public/assets/Star.svg" />
            <img src="/public/assets/Star.svg" />
            {' '}
            <small className="text-muted align-bottom">23</small>
          </div>
          <h3 className="h3 mt-3">About Rachel Barclay</h3>
          <p>
            Lorem ipsum dolor sit amet, ea cum maluisset splendide, ut autem
            atqui blandit est, cu omnis soluta dissentiet his.
          </p>
          <a href="#" className="text-primary font-weight-bold">Read More</a>
        </div>
        <div className="col-4" />
      </div>
    </div>
  </React.Fragment>
);

export default Practicioner;
