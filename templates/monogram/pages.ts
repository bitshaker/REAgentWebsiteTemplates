import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/poster.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';

const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Monogram design',
  false,
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Monogram design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Monogram design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Monogram design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Monogram design',
);

export default {
  id: 'monogram',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Monogram design',
  },
  pages: {
    buyers: {
      kicker: 'Monogram / Buying',
      title: 'Find your',
      emphasis: 'place.',
      art: {
        ...buyers,
        alt: 'A modern house illuminated beside a pool at dusk',
      },
    },
    sellers: {
      kicker: 'Monogram / Selling',
      title: 'A thoughtful',
      emphasis: 'next move.',
      art: {
        ...sellers,
        alt: 'A living room with a fireplace and teal curtains',
      },
    },
    about: {
      kicker: 'Monogram / About',
      title: 'A more personal',
      emphasis: 'perspective.',
      art: { ...about, alt: 'A dining room opening onto a modern kitchen' },
    },
    blog: {
      kicker: 'Monogram / Journal',
      title: 'Ideas for',
      emphasis: 'living well.',
      art: {
        ...blog,
        alt: 'A bright living room with a curved sofa and staircase',
      },
    },
  },
};
