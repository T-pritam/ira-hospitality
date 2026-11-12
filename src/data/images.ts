import type { ImageMetadata } from 'astro';

// Every image from the source site, keyed by file name (e.g. "nest-wall.jpg").
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,jpeg,png}', {
  eager: true,
});

export const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export function img(name: string): ImageMetadata {
  const found = images[name];
  if (!found) throw new Error(`Missing image: ${name}`);
  return found;
}
