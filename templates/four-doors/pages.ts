import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'four-doors',
  pages: {
    buyers: {
      kicker: 'Four Doors / Buyers',
      title: 'Come on',
      emphasis: 'inside.',
      art: {
        src: buyers,
        alt: 'Craftsman-style front entrance with warm materials',
      },
    },
    sellers: {
      kicker: 'Four Doors / Sellers',
      title: 'One door closes.',
      emphasis: 'Another opens.',
      art: {
        src: sellers,
        alt: 'Warm living room arranged for a first impression',
      },
    },
    about: {
      kicker: 'Four Doors / About',
      title: 'A conversation',
      emphasis: 'comes first.',
      art: { src: about, alt: 'A warm sitting area with a place to talk' },
    },
    blog: {
      kicker: 'Four Doors / Journal',
      title: 'On the other side',
      emphasis: 'of the door.',
      art: { src: blog, alt: 'Detail of warm residential architecture' },
    },
  },
};
