import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'neighborhood-atlas',
  pages: {
    buyers: {
      kicker: 'The Atlas / Buyer field guide',
      title: 'Find your',
      emphasis: 'point on the map.',
      art: {
        src: buyers,
        alt: 'Sunny neighborhood entrance and residential walkway',
      },
    },
    sellers: {
      kicker: 'The Atlas / Seller field guide',
      title: 'Put your home',
      emphasis: 'in context.',
      art: {
        src: sellers,
        alt: 'A composed interior with warm, graphic details',
      },
    },
    about: {
      kicker: 'The Atlas / About',
      title: 'A local guide',
      emphasis: 'for your move.',
      art: {
        src: about,
        alt: 'Chairs and a notebook in a bright consultation setting',
      },
    },
    blog: {
      kicker: 'The Atlas / Dispatches',
      title: 'Dispatches from',
      emphasis: 'the field.',
      art: {
        src: blog,
        alt: 'Street-level architectural detail with colorful accents',
      },
    },
  },
};
