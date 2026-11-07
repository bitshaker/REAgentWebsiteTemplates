import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/hero.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';
const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Still design',
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Still design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Still design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Still design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Still design',
);

export default {
  id: 'still',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Still design',
  },
  pages: {
    buyers: {
      kicker: 'A place to begin / Buying',
      title: 'Find a place',
      emphasis: 'to call your own.',
      art: { ...buyers, alt: 'Bright white kitchen with a long island' },
    },
    sellers: {
      kicker: 'A new chapter / Selling',
      title: 'A thoughtful',
      emphasis: 'way forward.',
      art: { ...sellers, alt: 'Dining table facing an open kitchen' },
    },
    about: {
      kicker: 'The person behind the work',
      title: 'A little',
      emphasis: 'about me.',
      art: { ...about, alt: 'Living room opening into a dining area' },
    },
    blog: {
      kicker: 'Notes on living / Journal',
      title: 'Something',
      emphasis: 'to think about.',
      art: { ...blog, alt: 'Bedroom with wooden floors and a low bed' },
    },
  },
};
