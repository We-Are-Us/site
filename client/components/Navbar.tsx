import * as React from 'react';
import classNames from 'classnames';

interface ComponentProps {
  white: boolean;
}

const Navbar: React.SFC<ComponentProps> = ({white}: ComponentProps) => {
  const textClassName = white ? 'text-white' : 'text-dark';
  const btnClassName = white ? 'btn-outline-light' : 'btn-outline-dark';
  const imgSrc = white ? '/public/assets/Logo_White.svg' : '/public/assets/Logo Footer.svg';

  return (
    <div className={classNames('position-absolute', 'w-100', textClassName)}>
      <nav className="navbar navbar-expand-md navbar-light ">
        <a className={classNames('navbar-brand', textClassName)} href="/">
          <img src={imgSrc} itemProp="logo" height="32" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto pt-1">
            <li className="nav-item active pr-2">
              <a
                className={classNames('nav-link', textClassName)}
                href="#"
              >
                Find a Practicioner <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item px-2">
              <a className={classNames('nav-link', textClassName)} href="#">Register as a Practicioner</a>
            </li>
            <li className="nav-item px-2">
              <a className={classNames('nav-link', textClassName)} href="#">Sign up</a>
            </li>
            <li className="nav-item pl-2">
              <a className={classNames('btn', btnClassName)} href="#">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
