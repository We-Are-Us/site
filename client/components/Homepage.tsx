import * as React from 'react';
import PopularCategories from './PopularCategories';
import FeaturedPracticioners from './FeaturedPracticioners';
import Category from '../domain/Category';

// TODO: this would come from contentful - matching modality to image
const style = {
  height: '80vh',
  backgroundPosition: 'center bottom',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

interface ComponentProps {
  lead: string;
  modality: string;
  categories: Array<Category>;
}

interface ComponentState {
}

class Homepage extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const {categories, lead, modality} = this.props;
    const image = categories.find(c => c.name === modality).image;
    const backgroundImage = `url(${image})`;

    const inlineStyle = Object.assign({}, style, {
      backgroundImage
    });

    return (
      <React.Fragment>
        <div style={inlineStyle}>
          <div className="jumbotron jumbotron-fluid text-white" style={({backgroundColor: 'transparent'})}>
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8 mt-5 pt-5">
                  <p className="lead">
                    Find a trusted{' '}
                    <a href="#" className="text-white">{modality}</a>{' '}
                    practicioner<br />
                    in Auckland.
                    </p>
                  <form method="post" action="search">
                    <div className="form-group">
                      <input
                        type="search"
                        name="query"
                        placeholder="Search practicioners"
                        className="form-control"
                      />
                      <small className="form-text">e.g. Yoga, Bowen Therapy, etc.</small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 lead container text-center">
          {lead}
        </div>
        <PopularCategories categories={categories} />
        <FeaturedPracticioners />
      </React.Fragment>
    );

  }
}

export default Homepage;
