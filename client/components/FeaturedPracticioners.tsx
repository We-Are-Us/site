import * as React from 'react';
import {Link} from 'react-router-dom';

const images = [
  'https://images.ctfassets.net/xu4zh386cjva/3xv3fuh0ggaQcWawCGu86k/8bdc230bd90f7097a517cf4e9e820b3f/placeholder_4.png',
  'https://images.ctfassets.net/xu4zh386cjva/6drQFGfttegCEY8aKe4Occ/16f6736fa8deb134e70ceef14153cdaf/placeholder_5.png',
  'https://images.ctfassets.net/xu4zh386cjva/3M7Na46NPiW04ukGOmcUiO/90df2c6edcc0c20650022dc8f689c18a/placeholder_6.png'
];

const FeaturedPracticioners: React.SFC<{}> = () => (
  <div className="container my-4">
    <div className="row">
      <div className="col-12">
        <h4 className="h4 text-uppercase">Practicioners In Your Area</h4>
      </div>
    </div>
    <div className="row">
      {images.map(image => (
        <div key={image} className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 rounded-0 p-4">
            <img src={image} className="card-img-top" />
            <div className="card-body px-0 pt-1">
              <div className="text-muted">
                <span className="pr-3">Yoga</span>
                <span className="pr-3">Modality 1</span>
                <span>Modality 2</span>
              </div>
              <h5 className="card-title mt-2">Equalibrium</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, ea cum maluisset splendide, ut autem
                atqui blandit est, cu omnis soluta dissentiet his.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedPracticioners;
