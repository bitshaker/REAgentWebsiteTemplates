import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'workshop-editorial',
  pages: {
    buyers: {
      kicker: 'Field notes / Buying',
      title: 'How to look',
      emphasis: 'at a home.',
      art: {
        src: buyers,
        alt: 'Brick townhouse entry and architectural lines',
      },
    },
    sellers: {
      kicker: 'Field notes / Selling',
      title: 'A study in',
      emphasis: 'good preparation.',
      art: { src: sellers, alt: 'Carefully arranged modern living space' },
    },
    about: {
      kicker: 'Profile / The agent',
      title: 'A considered',
      emphasis: 'approach.',
      art: {
        src: about,
        alt: 'Quiet interior with seating and reading materials',
      },
    },
    blog: {
      kicker: 'The property notebook',
      title: 'The real estate',
      emphasis: 'notebook.',
      art: {
        src: blog,
        alt: 'Architecture detail with deliberate lines and shadows',
      },
    },
  },
};
