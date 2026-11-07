import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';

export default {
  id: 'forma',
  pages: {
    buyers: {
      kicker: 'The buying guide',
      title: 'A place to',
      emphasis: 'begin.',
      art: {
        src: buyers,
        alt: 'Modern house illuminated at dusk beside a pool',
      },
    },
    sellers: {
      kicker: 'The selling guide',
      title: 'A thoughtful',
      emphasis: 'next chapter.',
      art: { src: sellers, alt: 'Bright living and dining room' },
    },
    about: {
      kicker: 'A little introduction',
      title: 'Real estate,',
      emphasis: 'with perspective.',
      art: { src: about, alt: 'Contemporary living room with mountain views' },
    },
    blog: {
      kicker: 'The journal',
      title: 'Ideas for',
      emphasis: 'your next move.',
      art: { src: blog, alt: 'Modern homes across a green lawn' },
    },
  },
};
