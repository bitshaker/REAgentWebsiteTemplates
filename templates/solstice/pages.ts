import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/poster.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';
const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Solstice design',
  false,
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Solstice design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Solstice design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Solstice design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Solstice design',
);

export default {
  id: 'solstice',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Solstice design',
  },
  pages: {
    buyers: {
      kicker: 'A place to begin / Buying',
      title: 'Find a place',
      emphasis: 'to call your own.',
      art: { ...buyers, alt: 'Contemporary white home with balconies' },
    },
    sellers: {
      kicker: 'A new chapter / Selling',
      title: 'A thoughtful',
      emphasis: 'way forward.',
      art: {
        ...sellers,
        alt: 'Living room with warm wood ceiling and artwork',
      },
    },
    about: {
      kicker: 'The person behind the work',
      title: 'A little',
      emphasis: 'about me.',
      art: { ...about, alt: 'Bright living room beside a staircase' },
    },
    blog: {
      kicker: 'Notes on living / Journal',
      title: 'Something',
      emphasis: 'to think about.',
      art: { ...blog, alt: 'Living room with blue curtains and dark sofa' },
    },
  },
};
