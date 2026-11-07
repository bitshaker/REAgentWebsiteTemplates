import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';
export default {
  id: 'solstice',
  pages: {
    buyers: {
      kicker: 'A place to begin / Buying',
      title: 'Find a place',
      emphasis: 'to call your own.',
      art: { src: buyers, alt: 'Contemporary white home with balconies' },
    },
    sellers: {
      kicker: 'A new chapter / Selling',
      title: 'A thoughtful',
      emphasis: 'way forward.',
      art: {
        src: sellers,
        alt: 'Living room with warm wood ceiling and artwork',
      },
    },
    about: {
      kicker: 'The person behind the work',
      title: 'A little',
      emphasis: 'about me.',
      art: { src: about, alt: 'Bright living room beside a staircase' },
    },
    blog: {
      kicker: 'Notes on living / Journal',
      title: 'Something',
      emphasis: 'to think about.',
      art: { src: blog, alt: 'Living room with blue curtains and dark sofa' },
    },
  },
};
