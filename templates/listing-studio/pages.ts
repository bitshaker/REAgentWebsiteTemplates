import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'listing-studio',
  pages: {
    buyers: {
      kicker: 'The Listing Studio / Buyer\u2019s edition',
      title: 'Look past',
      emphasis: 'the photograph.',
      art: {
        src: buyers,
        alt: 'Editorial view of a home entrance and front path',
      },
    },
    sellers: {
      kicker: 'The Listing Studio / Seller\u2019s edition',
      title: 'Give your home',
      emphasis: 'a proper introduction.',
      art: {
        src: sellers,
        alt: 'Polished living room arranged for property photography',
      },
    },
    about: {
      kicker: 'The Listing Studio / The agent',
      title: 'The person',
      emphasis: 'behind the plan.',
      art: {
        src: about,
        alt: 'A composed consultation space with seating and books',
      },
    },
    blog: {
      kicker: 'The Listing Studio / Studio notes',
      title: 'Notes from',
      emphasis: 'the studio.',
      art: {
        src: blog,
        alt: 'Editorial architectural detail with shadows and foliage',
      },
    },
  },
};
