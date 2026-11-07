import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';

export default {
  id: 'nocturne',
  pages: {
    buyers: {
      kicker: 'Nocturne / Buying',
      title: 'Find your',
      emphasis: 'place.',
      art: {
        src: buyers,
        alt: 'An infinity pool overlooking a city at sunset',
      },
    },
    sellers: {
      kicker: 'Nocturne / Selling',
      title: 'A thoughtful',
      emphasis: 'next move.',
      art: { src: sellers, alt: 'A dining room opening onto a modern kitchen' },
    },
    about: {
      kicker: 'Nocturne / About',
      title: 'A more personal',
      emphasis: 'perspective.',
      art: {
        src: about,
        alt: 'A living room with wood floors and window blinds',
      },
    },
    blog: {
      kicker: 'Nocturne / Journal',
      title: 'Ideas for',
      emphasis: 'living well.',
      art: { src: blog, alt: 'A modern multistory house with balconies' },
    },
  },
};
