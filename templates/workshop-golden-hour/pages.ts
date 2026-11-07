import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'workshop-golden-hour',
  pages: {
    buyers: {
      kicker: 'Workshop Golden Hour / Buying',
      title: 'See yourself',
      emphasis: 'living here.',
      art: { src: buyers, alt: 'Residential entrance in warm evening light' },
    },
    sellers: {
      kicker: 'Workshop Golden Hour / Selling',
      title: 'Show the home',
      emphasis: 'in its best light.',
      art: {
        src: sellers,
        alt: 'Warm staged living room in late-day sunshine',
      },
    },
    about: {
      kicker: 'Workshop Golden Hour / About',
      title: 'First,',
      emphasis: 'let\u2019s talk.',
      art: { src: about, alt: 'A quiet consultation space in golden light' },
    },
    blog: {
      kicker: 'Workshop Golden Hour / Journal',
      title: 'A moment',
      emphasis: 'to consider.',
      art: {
        src: blog,
        alt: 'Residential details in warm light and soft shadows',
      },
    },
  },
};
