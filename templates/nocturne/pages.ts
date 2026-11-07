import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/poster.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';

const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Nocturne design',
  false,
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Nocturne design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Nocturne design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Nocturne design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Nocturne design',
);

export default {
  id: 'nocturne',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Nocturne design',
  },
  pages: {
    buyers: {
      kicker: 'Nocturne / Buying',
      title: 'Find your',
      emphasis: 'place.',
      art: {
        ...buyers,
        alt: 'An infinity pool overlooking a city at sunset',
      },
    },
    sellers: {
      kicker: 'Nocturne / Selling',
      title: 'A thoughtful',
      emphasis: 'next move.',
      art: { ...sellers, alt: 'A dining room opening onto a modern kitchen' },
    },
    about: {
      kicker: 'Nocturne / About',
      title: 'A more personal',
      emphasis: 'perspective.',
      art: {
        ...about,
        alt: 'A living room with wood floors and window blinds',
      },
    },
    blog: {
      kicker: 'Nocturne / Journal',
      title: 'Ideas for',
      emphasis: 'living well.',
      art: { ...blog, alt: 'A modern multistory house with balconies' },
    },
  },
};
