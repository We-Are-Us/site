import { Request } from 'hapi';
import config from '../config';
import getHeaderLinks from '../features/header-links';
import { footerLinks } from '../features/footer-links';

const getViewContext = (request: Request) => ({
  gtmContainerId: config.get('gtm.containerId'),
  jsBundle:
    config.get('env') === 'production'
      ? '/public/app.js'
      : 'http://localhost:1234/app.js',
  navigationTextColor: request.url.pathname === '/' ? 'white' : 'primary',
  navigationOutlineColor: request.url.pathname === '/' ? 'light' : 'primary',
  headerLinks: getHeaderLinks(
    request,
    request.url.pathname === '/' ? 'white' : 'primary'
  ),
  footerLinks
});

export default getViewContext;
