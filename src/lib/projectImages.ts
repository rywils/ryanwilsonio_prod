import arpio from '../assets/projects/arpio.webp';
import bitprobe from '../assets/projects/bitprobe.webp';
import bitsentry from '../assets/projects/bitsentry.webp';
import fafind from '../assets/projects/fafind.webp';
import kitscan from '../assets/projects/kitscan.webp';
import spigot from '../assets/projects/spigot.webp';
import watchtower from '../assets/projects/watchtower.webp';
import type { ImageMetadata } from 'astro';

/** Maps legacy `/posts/*.webp` paths to build-optimized assets. */
export const projectImageByPath: Record<string, ImageMetadata> = {
  '/posts/arpio.webp': arpio,
  '/posts/bitprobe.webp': bitprobe,
  '/posts/Bitsentry.webp': bitsentry,
  '/posts/bitsentry.webp': bitsentry,
  '/posts/fafind.webp': fafind,
  '/posts/kitscan.webp': kitscan,
  '/posts/spigot.webp': spigot,
  '/posts/watchtower.webp': watchtower,
};

export function resolveProjectImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  return projectImageByPath[path];
}
