import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';

export default {
  id: 'panorama',
  pages: {
    buyers: {
      kicker: 'Panorama / Buying',
      title: 'Find your',
      emphasis: 'place.',
      art: {
        src: buyers,
        alt: 'A modern house illuminated beside a pool at dusk',
      },
    },
    sellers: {
      kicker: 'Panorama / Selling',
      title: 'A thoughtful',
      emphasis: 'next move.',
      art: {
        src: sellers,
        alt: 'A bright living room with a curved sofa and staircase',
      },
    },
    about: {
      kicker: 'Panorama / About',
      title: 'A more personal',
      emphasis: 'perspective.',
      art: { src: about, alt: 'A bright kitchen with a large island' },
    },
    blog: {
      kicker: 'Panorama / Journal',
      title: 'Ideas for',
      emphasis: 'living well.',
      art: { src: blog, alt: 'A living room overlooking a coastal view' },
    },
  },
};
