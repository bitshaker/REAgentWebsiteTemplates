import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/poster.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';

const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Panorama design',
  false,
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Panorama design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Panorama design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Panorama design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Panorama design',
);

export default {
  id: 'panorama',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Panorama design',
  },
  pages: {
    buyers: {
      kicker: 'Panorama / Buying',
      title: 'Find your',
      emphasis: 'place.',
      art: {
        ...buyers,
        alt: 'A modern house illuminated beside a pool at dusk',
      },
    },
    sellers: {
      kicker: 'Panorama / Selling',
      title: 'A thoughtful',
      emphasis: 'next move.',
      art: {
        ...sellers,
        alt: 'A bright living room with a curved sofa and staircase',
      },
    },
    about: {
      kicker: 'Panorama / About',
      title: 'A more personal',
      emphasis: 'perspective.',
      art: { ...about, alt: 'A bright kitchen with a large island' },
    },
    blog: {
      kicker: 'Panorama / Journal',
      title: 'Ideas for',
      emphasis: 'living well.',
      art: { ...blog, alt: 'A living room overlooking a coastal view' },
    },
  },
};
