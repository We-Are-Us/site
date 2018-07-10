import * as React from 'react';

const Navbar: React.SFC<{}> = () => (
  <nav className="navbar navbar-expand-md navbar-light text-white">
    <a className="navbar-brand text-white" href="#">We Are Us</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active pr-2">
          <a className="nav-link text-white" href="#">Find a Pracitioner <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item px-2">
          <a className="nav-link text-white" href="#">Register as a Practicioner</a>
        </li>
        <li className="nav-item px-2">
          <a className="nav-link text-white" href="#">Sign up</a>
        </li>
        <li className="nav-item pl-2">
          <a className="btn btn-outline-light" href="#">Login</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
