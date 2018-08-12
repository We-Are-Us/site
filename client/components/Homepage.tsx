import * as React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import FeaturedPracticioners from './FeaturedPracticioners';
import Category from '../domain/Category';
import TitledText from '../domain/TitledText';

// TODO: this would come from contentful - matching modality to image
const style = {
  height: '80vh',
  backgroundPosition: 'center bottom',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

interface ComponentProps {
  benefits: Array<TitledText>;
  lead: string;
  modality: string;
  categories: Array<Category>;
}

class Homepage extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const {benefits, categories, lead, modality} = this.props;
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
        <div className="pt-5 pb-3 lead container text-center">
          <MarkdownRenderer markdown={lead} />
        </div>
        <hr />
        <div className="container">
          <div className="row pb-5">
            {benefits.map(benefit => (
              <div key={benefit.title} className="col-12 col-md-6">
                <div className="card border-0">
                  <div className="card-body">
                    <h3 className="card-title">{benefit.title}</h3>
                    <p className="card-text">{benefit.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container-fluid bg-secondary py-2">
          <div className="container">
            <FeaturedPracticioners />
          </div>
        </div>
        {/*
        <PopularCategories categories={categories} />
        */}
      </React.Fragment>
    );

  }
}

export default Homepage;
