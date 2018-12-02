import { Request } from 'hapi';
import Link from './Link';
import isLoggedIn from '../routes/isLoggedIn';
import isRegistered from '../routes/isRegistered';
import classnames from 'classnames';

type Color = 'primary' | 'white';

const getHeaderLinks = (
  request: Request,
  color: Color = 'primary'
): ReadonlyArray<Link> => {
  const links = [
    { href: '/about', text: 'About', classname: `nav-link text-${color}` },
    {
      href: '/practitioners',
      text: 'Practitioners',
      classname: `nav-link text-${color}`
    },
    isLoggedIn(request)
      ? { href: '/lgoout', text: 'Logout', classname: `nav-link text-${color}` }
      : { href: '/login', text: 'Login', classname: `nav-link text-${color}` }
  ];

  if (!isRegistered(request)) {
    links.push({
      href: '/register',
      text: 'Register',
      classname: classnames(
        'btn',
        {
          'btn-outline-primary': color === 'primary'
        },
        {
          'btn-outline-light': color === 'white'
        }
      )
    });
  }

  return links;
};

export default getHeaderLinks;
