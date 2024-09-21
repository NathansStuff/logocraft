import { privateheaderLinks, publicheaderLinks } from '../data/headerLinks';
import { HeaderLink } from '../types/HeaderLink';

export function getHeaderLinks(isLoggedIn: boolean): HeaderLink[] {
  const links: HeaderLink[] = [];

  links.push(...publicheaderLinks);
  if (isLoggedIn) links.push(...privateheaderLinks);

  return links;
}
