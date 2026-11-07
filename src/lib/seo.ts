import type { CollectionEntry } from 'astro:content';
import { agent } from './agent';
import type { DesignPages, PageArt } from './design-pages';
import { sitePath, siteOrigin } from './site';

export type Article = CollectionEntry<'blog'>;
export interface Breadcrumb {
  name: string;
  path: string;
}

/** Public asset URLs may be local paths or absolute HTTP(S) URLs. */
export function absoluteUrl(path: string) {
  const url = new URL(sitePath(path), siteOrigin);
  if (!['http:', 'https:'].includes(url.protocol))
    throw new Error('SEO URLs must use HTTP(S).');
  return url.href;
}

export function pageSeo(path: string, design: DesignPages, post?: Article) {
  const pages = {
    '/': {
      title: `${agent.market} Real Estate`,
      description: agent.seoDescription,
      label: 'Home',
      type: 'WebPage',
      image: design.homeArt,
    },
    '/buyers/': {
      title: `Buy a Home in ${agent.market}`,
      description: `Plan your home purchase in ${agent.market} with ${agent.name}. Explore the buying process, organize your priorities, and prepare questions for your next move.`,
      label: 'Buying a home',
      type: 'WebPage',
      image: design.pages.buyers.art,
    },
    '/sellers/': {
      title: `Sell a Home in ${agent.market}`,
      description: `Prepare to sell your home in ${agent.market} with ${agent.name}. Explore preparation, timing, and the questions to discuss before choosing a list date.`,
      label: 'Selling a home',
      type: 'WebPage',
      image: design.pages.sellers.art,
    },
    '/about/': {
      title: `About ${agent.name}`,
      description: `Meet ${agent.name}, ${agent.role.toLowerCase()} serving ${agent.market}. Learn about the approach to buying and selling, service areas, and how to get in touch.`,
      label: 'About',
      type: 'AboutPage',
      image: design.pages.about.art,
    },
    '/contact/': {
      title: `Contact ${agent.name}`,
      description: `Contact ${agent.name} about buying or selling a home in ${agent.market}. Find the phone number, email, and office details to start a conversation.`,
      label: 'Contact',
      type: 'ContactPage',
      image: (design.pages.contact ?? design.pages.about).art,
    },
    '/blog/': {
      title: `${agent.market} Real Estate Journal`,
      description: `Read home buying and selling guides from ${agent.name} in ${agent.market}. Find practical ideas and questions to bring to your next real estate decision.`,
      label: 'Journal',
      type: 'CollectionPage',
      image: design.pages.blog.art,
    },
    '/privacy/': {
      title: 'Privacy',
      description: `Privacy information for ${agent.brand}, including website contact methods and how to reach ${agent.name} with questions about personal information.`,
      label: 'Privacy',
      type: 'WebPage',
      image: design.homeArt,
    },
    '/accessibility/': {
      title: 'Accessibility',
      description: `Read the accessibility statement for ${agent.brand} and learn how to contact ${agent.name} about a barrier while using this website.`,
      label: 'Accessibility',
      type: 'WebPage',
      image: design.homeArt,
    },
  };
  const page = post
    ? {
        title: post.data.title,
        description: post.data.description,
        label: post.data.title,
        type: 'WebPage',
        image: post.data.image ?? design.pages.blog.art,
      }
    : (pages[path as keyof typeof pages] ?? {
        title: 'Page not found',
        description: `Find your way back to ${agent.brand} to explore buying, selling, and ways to contact ${agent.name}.`,
        label: 'Page not found',
        type: 'WebPage',
        image: design.homeArt,
      });
  const breadcrumbs: Breadcrumb[] =
    path === '/'
      ? []
      : [
          { name: 'Home', path: '/' },
          ...(post ? [{ name: 'Journal', path: '/blog/' }] : []),
          { name: page.label, path },
        ];
  const image: PageArt =
    post?.data.image ??
    (agent.socialImage
      ? { src: agent.socialImage, alt: agent.socialImageAlt }
      : page.image);
  return { ...page, image, breadcrumbs };
}

export function structuredData({
  canonical,
  title,
  description,
  type,
  breadcrumbs,
  post,
  portraitUrl,
}: {
  canonical: string;
  title: string;
  description: string;
  type: string;
  breadcrumbs: Breadcrumb[];
  post?: Article;
  portraitUrl?: string;
}) {
  const home = absoluteUrl('/');
  const businessId = `${home}#business`;
  const personId = `${home}#agent`;
  const websiteId = `${home}#website`;
  const pageId = `${canonical}#webpage`;
  const ref = (id: string) => ({ '@id': id });
  const author =
    post?.data.author && post.data.author !== agent.name
      ? {
          '@type': 'Person',
          name: post.data.author,
          ...(post.data.authorUrl
            ? { url: absoluteUrl(post.data.authorUrl) }
            : {}),
        }
      : ref(personId);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'RealEstateAgent',
      '@id': businessId,
      name: agent.brand,
      url: home,
      telephone: agent.phone,
      email: agent.email,
      description: agent.seoDescription,
      areaServed: agent.serviceAreas,
      ...(agent.socialLinks.length ? { sameAs: agent.socialLinks } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: agent.address.street,
        addressLocality: agent.address.city,
        addressRegion: agent.address.region,
        postalCode: agent.address.postalCode,
        addressCountry: agent.address.country,
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: agent.name,
      jobTitle: agent.role,
      url: absoluteUrl('/about/'),
      description: agent.bio,
      worksFor: { '@type': 'Organization', name: agent.brokerage },
      ...(portraitUrl ? { image: absoluteUrl(portraitUrl) } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: home,
      name: agent.brand,
      inLanguage: 'en-US',
      publisher: ref(businessId),
    },
    {
      '@type': type,
      '@id': pageId,
      url: canonical,
      name: title,
      description,
      inLanguage: 'en-US',
      isPartOf: ref(websiteId),
      about: ref(type === 'AboutPage' ? personId : businessId),
      ...(type === 'AboutPage' || type === 'ContactPage'
        ? { mainEntity: ref(type === 'AboutPage' ? personId : businessId) }
        : {}),
      ...(breadcrumbs.length
        ? { breadcrumb: ref(`${canonical}#breadcrumb`) }
        : {}),
      ...(post ? { mainEntity: ref(`${canonical}#article`) } : {}),
    },
  ];
  if (breadcrumbs.length)
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  if (post)
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      url: canonical,
      headline: post.data.title,
      description: post.data.description,
      inLanguage: 'en-US',
      datePublished: post.data.date.toISOString(),
      dateModified: (post.data.updated ?? post.data.date).toISOString(),
      author,
      publisher: ref(businessId),
      mainEntityOfPage: ref(pageId),
      ...(post.data.image ? { image: absoluteUrl(post.data.image.src) } : {}),
    });
  return { '@context': 'https://schema.org', '@graph': graph };
}
