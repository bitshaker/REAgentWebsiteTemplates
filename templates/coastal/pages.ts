import buyers from './media/buyers.webp?url';
import sellers from './media/sellers.webp?url';
import about from './media/about.webp?url';
import blog from './media/blog.webp?url';

export default {
  id: 'coastal',
  pages: {
    buyers: {
      kicker: 'The buyer\u2019s shore guide',
      title: 'Find a place',
      emphasis: 'to exhale.',
      art: { src: buyers, alt: 'Sunlit coastal cottage and its entry walk' },
    },
    sellers: {
      kicker: 'A fresh start for sellers',
      title: 'Make room',
      emphasis: 'for what\u2019s next.',
      art: {
        src: sellers,
        alt: 'Light-filled coastal living room with soft textures',
      },
    },
    about: {
      kicker: 'A personal introduction',
      title: 'Good moves begin',
      emphasis: 'with listening.',
      art: { src: about, alt: 'Quiet coastal sitting area for a conversation' },
    },
    blog: {
      kicker: 'The coastal journal',
      title: 'Notes from',
      emphasis: 'the coast.',
      art: { src: blog, alt: 'Coastal architectural detail in soft light' },
    },
  },
};
