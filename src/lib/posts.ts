import { getCollection } from 'astro:content';
export async function publishedPosts() {
  return (
    await getCollection(
      'blog',
      ({ data }) => !data.draft && data.date <= new Date(),
    )
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
