import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/hero.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';

const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Forma design',
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Forma design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Forma design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Forma design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Forma design',
);

export default {
  id: 'forma',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Forma design',
  },
  pages: {
    buyers: {
      kicker: 'The buying guide',
      title: 'A place to',
      emphasis: 'begin.',
      art: {
        ...buyers,
        alt: 'Modern house illuminated at dusk beside a pool',
      },
    },
    sellers: {
      kicker: 'The selling guide',
      title: 'A thoughtful',
      emphasis: 'next chapter.',
      art: { ...sellers, alt: 'Bright living and dining room' },
    },
    about: {
      kicker: 'A little introduction',
      title: 'Real estate,',
      emphasis: 'with perspective.',
      art: { ...about, alt: 'Contemporary living room with mountain views' },
    },
    blog: {
      kicker: 'The journal',
      title: 'Ideas for',
      emphasis: 'your next move.',
      art: { ...blog, alt: 'Modern homes across a green lawn' },
    },
  },
};
