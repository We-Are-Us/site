import Link from './Link';

const getHeaderLinks = (isLoggedIn: boolean): ReadonlyArray<Link> => [
  { href: '/about', text: 'About' },
  { href: '/practitioners', text: 'Practitioners' },
  isLoggedIn
    ? { href: '/lgoout', text: 'Logout' }
    : { href: '/login', text: 'Login' }
];

export default getHeaderLinks;
