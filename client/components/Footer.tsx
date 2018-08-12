import * as React from 'react';

const imgSrc = '/public/assets/Logo Footer.svg';

const links = [
  {
    href: '#',
    text: 'About We Are Us'
  },
  {
    href: '#',
    text: 'Contact'
  },
  {
    href: '#',
    text: 'Register as a Practicioner'
  },
  {
    href: '#',
    text: 'Privacy Policy'
  }
];

const Footer: React.SFC<{}> = () => (
  <footer className="container-fluid bg-white py-4">
    <div className="container">
      <img src={imgSrc} itemProp="logo" height="32" />
      {links.map(link => (
        <span key={link.text} className="px-2 px-md-3">
          <a href={link.href} className="text-muted">{link.text}</a>
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
