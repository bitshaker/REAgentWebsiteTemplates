import buyers from './media/detail-1.jpg?url';
import sellers from './media/detail-2.jpg?url';
import about from './media/detail-3.jpg?url';
import blog from './media/detail-4.jpg?url';

export default {
  id: 'neighborly',
  pages: {
    buyers: {
      kicker: 'The buying guide',
      title: 'A place to',
      emphasis: 'begin.',
      art: { src: buyers, alt: 'White gabled home beyond a lawn' },
    },
    sellers: {
      kicker: 'The selling guide',
      title: 'A thoughtful',
      emphasis: 'next chapter.',
      art: {
        src: sellers,
        alt: 'Kitchen with a wooden island and hanging plants',
      },
    },
    about: {
      kicker: 'A little introduction',
      title: 'Real estate,',
      emphasis: 'with perspective.',
      art: { src: about, alt: 'Light-filled bedroom with a wooden screen' },
    },
    blog: {
      kicker: 'The journal',
      title: 'Ideas for',
      emphasis: 'your next move.',
      art: { src: blog, alt: 'House with a path through the lawn' },
    },
  },
};
