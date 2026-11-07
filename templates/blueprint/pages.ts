import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'blueprint',
  pages: {
    buyers: {
      kicker: 'Buyer briefing / 01',
      title: 'Find the fit.',
      emphasis: 'Make the move.',
      art: { src: buyers, alt: 'Contemporary cedar and concrete home entry' },
    },
    sellers: {
      kicker: 'Seller briefing / 02',
      title: 'Prepare well.',
      emphasis: 'Sell with a plan.',
      art: {
        src: sellers,
        alt: 'Contemporary interior staged with simple furnishings',
      },
    },
    about: {
      kicker: 'Meet your agent / 03',
      title: 'Clear advice.',
      emphasis: 'Personal attention.',
      art: { src: about, alt: 'Contemporary seating and consultation space' },
    },
    blog: {
      kicker: 'Real estate briefing / 04',
      title: 'Ideas for',
      emphasis: 'what\u2019s next.',
      art: { src: blog, alt: 'Geometric contemporary architecture and shadow' },
    },
  },
};
