import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { agent } from './agent';
import { sitePath } from './site';
import sample from '../assets/demo-agent-portrait.jpg';

const portraits = import.meta.glob<ImageMetadata>(
  '../assets/portraits/*.{jpg,jpeg,png,webp,avif}',
  { import: 'default' },
);

/** Native portraits are optimized; existing public/remote URLs remain supported. */
export async function agentPortrait() {
  const isSample = agent.demo && !agent.portraitUrl;
  if (!agent.portraitUrl && !isSample) return undefined;
  const alt = isSample ? 'AI-generated sample portrait' : agent.name;
  let source: ImageMetadata | undefined = isSample ? sample : undefined;
  if (agent.portraitUrl.startsWith('src/assets/portraits/')) {
    const key = agent.portraitUrl.replace('src/assets/', '../assets/');
    const load = portraits[key];
    if (!load) throw new Error(`Missing portrait asset: ${agent.portraitUrl}`);
    source = await load();
  }
  if (!source)
    return {
      src: sitePath(agent.portraitUrl),
      alt,
      isSample,
      width: 720,
      height: 900,
      srcset: undefined,
    };
  const width = Math.min(720, source.width);
  const image = await getImage({
    src: source,
    width,
    widths: [...new Set([180, 280, 560, width])].filter(
      (size) => size <= width,
    ),
    format: 'webp',
    quality: 80,
  });
  return {
    src: image.src,
    alt,
    isSample,
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
    srcset: image.srcSet.attribute,
  };
}
