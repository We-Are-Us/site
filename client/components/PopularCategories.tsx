import * as React from 'react';
import Category from '../domain/Category';

interface Props {
  categories: Array<Category>;
}

const PopularCategories: React.SFC<Props> = ({categories}: Props) => (
  <div className="container mt-4">
    <div className="row">
      <div className="col-12">
        <h2 className="h2">Popular Categories</h2>
      </div>
    </div>
    <div className="row">
      {categories.filter((modality, index) => index <= 3).map(modality => (
        <div key={modality.name.toLowerCase()} className="col-12 col-sm-6 col-md-3 py-2">
          <a href="/category/{modality.name.toLowerCase()}" className="btn btn-secondary btn-block">
            {modality.name}
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default PopularCategories;
