import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';

export default {
  id: 'monogram',
  pages: {
    buyers: {
      kicker: 'Monogram / Buying',
      title: 'Find your',
      emphasis: 'place.',
      art: {
        src: buyers,
        alt: 'A modern house illuminated beside a pool at dusk',
      },
    },
    sellers: {
      kicker: 'Monogram / Selling',
      title: 'A thoughtful',
      emphasis: 'next move.',
      art: {
        src: sellers,
        alt: 'A living room with a fireplace and teal curtains',
      },
    },
    about: {
      kicker: 'Monogram / About',
      title: 'A more personal',
      emphasis: 'perspective.',
      art: { src: about, alt: 'A dining room opening onto a modern kitchen' },
    },
    blog: {
      kicker: 'Monogram / Journal',
      title: 'Ideas for',
      emphasis: 'living well.',
      art: {
        src: blog,
        alt: 'A bright living room with a curved sofa and staircase',
      },
    },
  },
};
