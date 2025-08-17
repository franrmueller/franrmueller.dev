// src/types/rehype-plugins.d.ts
import type { Plugin } from 'unified';
import type { Root } from 'hast';

declare module 'rehype-slug' {
  const rehypeSlug: Plugin<[], Root>;
  export default rehypeSlug;
}

declare module 'rehype-autolink-headings' {
  export interface AutolinkOptions {
    behavior?: 'prepend' | 'append' | 'wrap';
    properties?: Record<string, unknown>;
  }

  const rehypeAutolinkHeadings: Plugin<[AutolinkOptions?], Root>;
  export default rehypeAutolinkHeadings;
}