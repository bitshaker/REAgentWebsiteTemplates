import { optimizedArt } from '../../src/lib/media';
import homeSource from './media/poster.jpg';
import buyersSource from './media/detail-1.jpg';
import sellersSource from './media/detail-2.jpg';
import aboutSource from './media/detail-3.jpg';
import blogSource from './media/detail-4.jpg';

const home = await optimizedArt(
  homeSource,
  'Illustrative scene from the Neighborly design',
  false,
);
const buyers = await optimizedArt(
  buyersSource,
  'Illustrative scene from the Neighborly design',
);
const sellers = await optimizedArt(
  sellersSource,
  'Illustrative scene from the Neighborly design',
);
const about = await optimizedArt(
  aboutSource,
  'Illustrative scene from the Neighborly design',
);
const blog = await optimizedArt(
  blogSource,
  'Illustrative scene from the Neighborly design',
);

export default {
  id: 'neighborly',
  homeArt: {
    ...home,
    alt: 'Illustrative scene from the Neighborly design',
  },
  pages: {
    buyers: {
      kicker: 'The buying guide',
      title: 'A place to',
      emphasis: 'begin.',
      art: { ...buyers, alt: 'White gabled home beyond a lawn' },
    },
    sellers: {
      kicker: 'The selling guide',
      title: 'A thoughtful',
      emphasis: 'next chapter.',
      art: {
        ...sellers,
        alt: 'Kitchen with a wooden island and hanging plants',
      },
    },
    about: {
      kicker: 'A little introduction',
      title: 'Real estate,',
      emphasis: 'with perspective.',
      art: { ...about, alt: 'Light-filled bedroom with a wooden screen' },
    },
    blog: {
      kicker: 'The journal',
      title: 'Ideas for',
      emphasis: 'your next move.',
      art: { ...blog, alt: 'House with a path through the lawn' },
    },
  },
};
