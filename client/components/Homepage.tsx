import * as React from 'react';
import getCategories from '../content/get-categories';
import PopularCategories from './PopularCategories';
import FeaturedPracticioners from './FeaturedPracticioners';
import Category from '../domain/Category';

interface InitialState {
  modality?: {
    name: string;
    image: string;
  }
}

// TODO: this would come from contentful - matching modality to image
const style = {
  height: '80vh',
  backgroundPosition: 'center bottom',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

interface ComponentState {
  categories: Array<Category>;
  category: string;
  backgroundImage: string;
}

class Homepage extends React.Component<{}, ComponentState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      categories: [],
      category: '',
      // tslint:disable-next-line
      backgroundImage: 'url(https://images.ctfassets.net/xu4zh386cjva/18PdxBV4K62USMKKUU4EcW/950b298c66a5fb754b8fed10b7c63dae/Screen_Shot_2018-05-16_at_1.16.10_PM.png)'
    };
  }

  async componentDidMount() {
    const modality = (window.__INITIAL_STATE__ as InitialState).modality || {};

    if (modality.name && modality.image) {
      this.setState({
        category: modality.name,
        backgroundImage: `url(${modality.image})`;
      });
    }

    const categories = await getCategories();

    this.setState({
      categories
    }

    const numCategories = categories.length;

    if (numCategories > 0 && (this.state.category == null || this.state.backgroundImage == null)) {
      const index = Math.floor(Math.random() * Math.floor(numCategories));

      const category = categories[index];
      const backgroundImage = `url("${category.image}?w=${window.innerWidth}")`;

      this.setState({
        categories,
        category: category.name,
        backgroundImage
      });
    }
  }

  render() {
    const {backgroundImage, categories, category} = this.state;

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
                    <a href="#" className="text-white">{category}</a>{' '}
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
        <PopularCategories categories={categories} />
        <FeaturedPracticioners />
      </React.Fragment>
    );

  }
}

export default Homepage;
