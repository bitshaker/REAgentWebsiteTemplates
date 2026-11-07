import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'open-house',
  pages: {
    buyers: {
      kicker: 'The Open House / The living room',
      title: 'Take a look',
      emphasis: 'around.',
      art: { src: buyers, alt: 'Illustrated lavender house entrance' },
    },
    sellers: {
      kicker: 'The Open House / The kitchen',
      title: 'Set the scene',
      emphasis: 'for a showing.',
      art: {
        src: sellers,
        alt: 'Illustrated living space with lavender and citron accents',
      },
    },
    about: {
      kicker: 'The Open House / The entry',
      title: 'Welcome.',
      emphasis: 'Make yourself at home.',
      art: {
        src: about,
        alt: 'Illustrated sitting area with chairs and a notebook',
      },
    },
    blog: {
      kicker: 'The Open House / The reading room',
      title: 'Pull up',
      emphasis: 'a chair.',
      art: { src: blog, alt: 'Illustrated architectural detail with foliage' },
    },
  },
};
