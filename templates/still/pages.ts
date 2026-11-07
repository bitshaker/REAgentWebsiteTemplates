import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';
export default {
  id: 'still',
  pages: {
    buyers: {
      kicker: 'A place to begin / Buying',
      title: 'Find a place',
      emphasis: 'to call your own.',
      art: { src: buyers, alt: 'Bright white kitchen with a long island' },
    },
    sellers: {
      kicker: 'A new chapter / Selling',
      title: 'A thoughtful',
      emphasis: 'way forward.',
      art: { src: sellers, alt: 'Dining table facing an open kitchen' },
    },
    about: {
      kicker: 'The person behind the work',
      title: 'A little',
      emphasis: 'about me.',
      art: { src: about, alt: 'Living room opening into a dining area' },
    },
    blog: {
      kicker: 'Notes on living / Journal',
      title: 'Something',
      emphasis: 'to think about.',
      art: { src: blog, alt: 'Bedroom with wooden floors and a low bed' },
    },
  },
};
