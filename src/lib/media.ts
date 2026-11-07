import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { PageArt } from './design-pages';

/** One build-time transform shared by page art, social metadata and home images. */
export async function optimizedArt(
  image: ImageMetadata,
  alt: string,
  responsive = true,
): Promise<PageArt> {
  const result = await getImage({
    src: image,
    format: 'webp',
    quality: 80,
    widths: responsive
      ? [...new Set([480, 960, 1440, image.width])].filter(
          (width) => width <= image.width,
        )
      : undefined,
  });
  return {
    src: result.src,
    srcset: result.srcSet.attribute,
    alt,
    width: image.width,
    height: image.height,
  };
}
