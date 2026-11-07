import { sitePath } from './site';
export const pageKeys = [
  'buyers',
  'sellers',
  'about',
  'blog',
  'contact',
] as const;
export type PageKey = (typeof pageKeys)[number];

export interface PageArt {
  src: string;
  alt: string;
  srcset?: string;
  width?: number;
  height?: number;
}
export interface PageDirection {
  kicker: string;
  title: string;
  emphasis: string;
  art: PageArt;
}
export interface DesignPages {
  id: string;
  homeArt: PageArt;
  pages: Record<Exclude<PageKey, 'contact'>, PageDirection> & {
    contact?: PageDirection;
  };
}

/** Only catalog routes that actually have a preview get a theme prefix. */
export function designHref(href: string, previewBase = '') {
  return sitePath(
    /^\/(?:$|(?:buyers|sellers|about|blog|contact)\/)/.test(href)
      ? previewBase + href
      : href,
  );
}
